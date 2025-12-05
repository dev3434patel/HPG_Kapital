import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, Mail, Loader2 } from "lucide-react";
import { useCsrfToken } from "@/hooks/useCsrfToken";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();
  const csrfToken = useCsrfToken();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Invalid email format';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // In development, allow form submission even without CSRF token
    if (!csrfToken && import.meta.env.PROD) {
      toast.error("Security token not loaded. Please refresh the page.");
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      if (!navigator.onLine) {
        toast.error("You are offline. Please check your connection.");
        setLoading(false);
        return;
      }

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      
      // Only add CSRF token if available
      if (csrfToken && csrfToken !== 'dev-bypass') {
        headers['X-CSRF-Token'] = csrfToken;
      } else if (csrfToken === 'dev-bypass') {
        headers['X-CSRF-Token'] = 'dev-bypass';
      }

      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers,
        credentials: "include", // Important for cookies
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();

      if (data.success) {
        // Token is now in httpOnly cookie, no need for localStorage
        toast.success("Login successful!");
        navigate("/admin/dashboard");
      } else {
        toast.error(data.message || "Invalid credentials");
        if (data.message?.includes('email')) {
          setErrors({ email: data.message });
        }
      }
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        toast.error("Server unavailable. Please try again later.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy via-royal-blue to-accent p-6">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-2xl p-8 border border-border/50">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-navy mb-2">Admin Login</h1>
            <p className="text-muted-foreground">HPG Kapital Admin Panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-navy font-semibold">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  required
                  placeholder="admin@example.com"
                  className={`pl-10 border-border ${errors.email ? 'border-destructive' : ''}`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p id="email-error" className="text-sm text-destructive mt-1" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-navy font-semibold">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: undefined });
                  }}
                  required
                  placeholder="Enter your password"
                  className={`pl-10 border-border ${errors.password ? 'border-destructive' : ''}`}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  autoComplete="current-password"
                />
              </div>
              {errors.password && (
                <p id="password-error" className="text-sm text-destructive mt-1" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-luxury-red hover:bg-luxury-red/90 text-white font-semibold min-h-[44px] touch-target"
              disabled={loading}
              aria-label="Login to admin panel"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

