import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync, existsSync, mkdirSync, promises as fs } from 'fs';
import winston from 'winston';
import dotenv from 'dotenv';
import Csrf from 'csrf';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ============================================
// LOGGING CONFIGURATION
// ============================================
const logDir = join(__dirname, 'logs');
if (!existsSync(logDir)) {
  mkdirSync(logDir, { recursive: true });
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: join(logDir, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: join(logDir, 'combined.log') }),
  ],
});

if (NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// ============================================
// SECURITY MIDDLEWARE
// ============================================

// Helmet for security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// CORS configuration - restrict to allowed origins
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:8080').split(',');
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
}));

// Cookie parser
app.use(cookieParser(process.env.JWT_SECRET || 'default-secret'));

// Body parser with size limits
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

// ============================================
// RATE LIMITING
// ============================================
const rateLimitWindow = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10); // 15 minutes
const rateLimitMax = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5', 10);

const contactLimiter = rateLimit({
  windowMs: rateLimitWindow,
  max: rateLimitMax,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 login attempts
  message: {
    success: false,
    message: 'Too many login attempts, please try again later.',
  },
  skipSuccessfulRequests: true,
});

// ============================================
// CSRF PROTECTION
// ============================================
const csrf = new Csrf();
let csrfSecret = '';

// Initialize CSRF secret (in production, store in session/redis)
app.get('/api/csrf-token', (req, res) => {
  if (!csrfSecret) {
    csrfSecret = csrf.secretSync();
    // Store in cookie (in production, use session)
    res.cookie('csrf-secret', csrfSecret, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });
  }
  const token = csrf.create(csrfSecret);
  res.json({ csrfToken: token });
});

// CSRF verification middleware
const verifyCsrf = (req, res, next) => {
  // Skip CSRF for GET requests
  if (req.method === 'GET') return next();
  
  // In development, allow bypass for testing
  if (NODE_ENV === 'development' && req.headers['x-csrf-token'] === 'dev-bypass') {
    return next();
  }
  
  const token = req.headers['x-csrf-token'] || req.body.csrfToken;
  const secret = req.cookies['csrf-secret'] || csrfSecret;
  
  if (!token || !secret) {
    return res.status(403).json({
      success: false,
      message: 'CSRF token missing',
    });
  }
  
  if (!csrf.verify(secret, token)) {
    return res.status(403).json({
      success: false,
      message: 'Invalid CSRF token',
    });
  }
  
  next();
};

// ============================================
// ENVIRONMENT VARIABLES
// ============================================
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// Email configuration (optional)
const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const ADMIN_EMAIL_RECIPIENT = process.env.ADMIN_EMAIL_RECIPIENT || ADMIN_EMAIL;

// Initialize email transporter (only if SMTP is configured)
let emailTransporter = null;
if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
  emailTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
  
  // Verify connection
  emailTransporter.verify((error) => {
    if (error) {
      logger.warn('SMTP connection failed:', error);
      emailTransporter = null;
    } else {
      logger.info('SMTP connection verified successfully');
    }
  });
} else {
  logger.info('Email notifications disabled - SMTP not configured');
}

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  logger.error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment variables');
  process.exit(1);
}

// Hash admin password on startup (in production, store hashed password)
let hashedPassword = '';
bcrypt.hash(ADMIN_PASSWORD, 10).then(hash => {
  hashedPassword = hash;
  logger.info('Admin password hashed successfully');
}).catch(err => {
  logger.error('Error hashing admin password:', err);
});

// ============================================
// DATA STORAGE
// ============================================
const dataDir = join(__dirname, 'data');
const submissionsFile = join(dataDir, 'submissions.json');

// Ensure data directory exists
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

// Initialize submissions file if it doesn't exist
if (!existsSync(submissionsFile)) {
  writeFileSync(submissionsFile, JSON.stringify([], null, 2));
}

// File locking for concurrent writes
const lockFile = async (filePath) => {
  const lockPath = filePath + '.lock';
  let attempts = 0;
  const maxAttempts = 10;
  
  while (attempts < maxAttempts) {
    try {
      await fs.writeFile(lockPath, process.pid.toString(), { flag: 'wx' });
      return lockPath;
    } catch (error) {
      if (error.code === 'EEXIST') {
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 100));
      } else {
        throw error;
      }
    }
  }
  throw new Error('Could not acquire lock');
};

const unlockFile = async (lockPath) => {
  try {
    await fs.unlink(lockPath);
  } catch (error) {
    logger.error('Error unlocking file:', error);
  }
};

// Helper function to read submissions with error handling
const readSubmissions = () => {
  try {
    const data = readFileSync(submissionsFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    logger.error('Error reading submissions:', error);
    return [];
  }
};

// Helper function to write submissions with locking
const writeSubmissions = async (submissions) => {
  let lockPath;
  try {
    lockPath = await lockFile(submissionsFile);
    writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2), 'utf8');
  } catch (error) {
    logger.error('Error writing submissions:', error);
    throw error;
  } finally {
    if (lockPath) {
      await unlockFile(lockPath);
    }
  }
};

// ============================================
// INPUT VALIDATION CONSTANTS
// ============================================
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 255;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_PHONE_LENGTH = 20;

// Input validation helper
const validateContactInput = (name, email, phone, message) => {
  const errors = [];

  // Name validation
  if (!name || typeof name !== 'string') {
    errors.push('Name is required');
  } else {
    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
      errors.push('Name cannot be empty');
    } else if (trimmedName.length > MAX_NAME_LENGTH) {
      errors.push(`Name must be less than ${MAX_NAME_LENGTH} characters`);
    } else if (!/^[a-zA-Z\s\-'\.]+$/.test(trimmedName)) {
      errors.push('Name contains invalid characters');
    }
  }

  // Email validation
  if (!email || typeof email !== 'string') {
    errors.push('Email is required');
  } else {
    const trimmedEmail = email.trim();
    if (trimmedEmail.length === 0) {
      errors.push('Email cannot be empty');
    } else if (trimmedEmail.length > MAX_EMAIL_LENGTH) {
      errors.push(`Email must be less than ${MAX_EMAIL_LENGTH} characters`);
    } else if (!validator.isEmail(trimmedEmail)) {
      errors.push('Invalid email format');
    }
  }

  // Phone validation (optional)
  if (phone && typeof phone === 'string') {
    const trimmedPhone = phone.trim();
    if (trimmedPhone.length > MAX_PHONE_LENGTH) {
      errors.push(`Phone must be less than ${MAX_PHONE_LENGTH} characters`);
    } else if (trimmedPhone.length > 0 && !/^[\d\s\-\(\)\+\.]+$/.test(trimmedPhone)) {
      errors.push('Invalid phone number format');
    }
  }

  // Message validation
  if (!message || typeof message !== 'string') {
    errors.push('Message is required');
  } else {
    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) {
      errors.push('Message cannot be empty');
    } else if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      errors.push(`Message must be less than ${MAX_MESSAGE_LENGTH} characters`);
    }
  }

  return errors;
};

// Input sanitization helper
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  // Remove potential XSS attempts
  return validator.escape(input.trim());
};

// ============================================
// JWT AUTHENTICATION
// ============================================

// Generate JWT token
const generateToken = (email) => {
  return jwt.sign(
    { email, userId: Date.now() },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

// Verify JWT token middleware
const verifyAdmin = async (req, res, next) => {
  try {
    // Check for token in cookie first (preferred), then header
    const token = req.cookies.adminToken || req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - No token provided',
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Verify email matches admin email
    if (decoded.email !== ADMIN_EMAIL) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - Invalid token',
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired',
      });
    }
    logger.error('Token verification error:', error);
    return res.status(401).json({
      success: false,
      message: 'Unauthorized - Invalid token',
    });
  }
};

// ============================================
// API ROUTES
// ============================================

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'ok', timestamp: new Date().toISOString() });
});

// Contact form submission endpoint
app.post('/api/contact', contactLimiter, verifyCsrf, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate input
    const validationErrors = validateContactInput(name, email, phone, message);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: validationErrors.join(', '),
        errors: validationErrors,
      });
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = validator.normalizeEmail(sanitizeInput(email));
    const sanitizedPhone = phone ? sanitizeInput(phone) : '';
    const sanitizedMessage = sanitizeInput(message);

    // Create submission
    const now = new Date();
    const submission = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      message: sanitizedMessage,
      date: now.toISOString(),
      timezone: 'America/New_York',
      read: false,
    };

    // Save to file with locking
    const submissions = readSubmissions();
    submissions.push(submission);
    await writeSubmissions(submissions);

    logger.info('New contact form submission', { email: sanitizedEmail, id: submission.id });

    // Send email notification (if configured)
    if (emailTransporter) {
      try {
        const emailHtml = `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${sanitizedName}</p>
          <p><strong>Email:</strong> ${sanitizedEmail}</p>
          ${sanitizedPhone ? `<p><strong>Phone:</strong> ${sanitizedPhone}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Submitted: ${new Date(now).toLocaleString('en-US', { timeZone: 'America/New_York' })} ET</small></p>
        `;

        await emailTransporter.sendMail({
          from: `"HPG Kapital Website" <${SMTP_USER}>`,
          to: ADMIN_EMAIL_RECIPIENT,
          subject: `New Contact Form Submission from ${sanitizedName}`,
          html: emailHtml,
          text: `
New Contact Form Submission

Name: ${sanitizedName}
Email: ${sanitizedEmail}
${sanitizedPhone ? `Phone: ${sanitizedPhone}` : ''}

Message:
${sanitizedMessage}

Submitted: ${new Date(now).toLocaleString('en-US', { timeZone: 'America/New_York' })} ET
          `.trim(),
        });
        
        logger.info('Email notification sent successfully', { to: ADMIN_EMAIL_RECIPIENT });
      } catch (emailError) {
        // Don't fail the request if email fails
        logger.error('Failed to send email notification:', emailError);
      }
    }

    res.json({
      success: true,
      message: "Thank you! We'll be in touch soon.",
    });
  } catch (error) {
    logger.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please try again later.',
    });
  }
});

// Admin login endpoint
app.post('/api/admin/login', loginLimiter, verifyCsrf, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    // Wait for password hash if not ready
    if (!hashedPassword) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Verify credentials
    const emailMatch = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (emailMatch && passwordMatch) {
      const token = generateToken(email);

      // Set httpOnly cookie
      res.cookie('adminToken', token, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        path: '/',
      });

      logger.info('Admin login successful', { email });

      res.json({
        success: true,
        message: 'Login successful',
      });
    } else {
      logger.warn('Admin login failed', { email });
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
  } catch (error) {
    logger.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during login. Please try again later.',
    });
  }
});

// Admin logout endpoint
app.post('/api/admin/logout', (req, res) => {
  res.clearCookie('adminToken', {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });
  res.json({
    success: true,
    message: 'Logged out successfully',
  });
});

// Get all submissions (protected)
app.get('/api/admin/submissions', verifyAdmin, (req, res) => {
  try {
    const submissions = readSubmissions();
    // Sort by date, newest first
    submissions.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json({
      success: true,
      submissions,
    });
  } catch (error) {
    logger.error('Error fetching submissions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching submissions',
    });
  }
});

// Mark submission as read (protected)
app.put('/api/admin/submissions/:id/read', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const submissions = readSubmissions();
    const submission = submissions.find((s) => s.id === id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found',
      });
    }

    submission.read = true;
    await writeSubmissions(submissions);

    res.json({
      success: true,
      submission,
    });
  } catch (error) {
    logger.error('Error updating submission:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating submission',
    });
  }
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: NODE_ENV === 'production' 
      ? 'An error occurred' 
      : err.message,
  });
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
  logger.info(`📁 Data directory: ${dataDir}`);
  logger.info(`🌍 Environment: ${NODE_ENV}`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Data directory: ${dataDir}`);
  console.log(`🌍 Environment: ${NODE_ENV}`);
});
