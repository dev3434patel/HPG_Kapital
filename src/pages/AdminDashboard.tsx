import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { LogOut, Mail, Phone, User, Calendar, MessageSquare, CheckCircle2, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  timezone?: string;
  read: boolean;
}

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const hasFetched = useRef(false);
  const isRedirecting = useRef(false);

  useEffect(() => {
    // Only fetch once, prevent multiple calls
    if (!hasFetched.current && !isRedirecting.current) {
      hasFetched.current = true;
      checkAuthAndFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps - only run once on mount

  const checkAuthAndFetch = async () => {
    // Prevent multiple redirects or fetches
    if (isRedirecting.current) return;
    
    try {
      const response = await fetch("/api/admin/submissions", {
        credentials: "include",
      });

      // Handle 401 - should not happen if ProtectedRoute works, but handle gracefully
      if (response.status === 401) {
        isRedirecting.current = true;
        navigate("/admin/login", { replace: true });
        setLoading(false);
        return;
      }

      // If response is not ok, handle error
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setSubmissions(data.submissions);
      } else {
        toast.error("Failed to load submissions");
      }
    } catch (error) {
      // Handle network errors
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        toast.error("Server unavailable. Please try again later.");
      } else {
        const errorMessage = error instanceof Error ? error.message : String(error);
        // Only show error if not auth-related (ProtectedRoute should handle auth)
        if (!errorMessage.includes('401') && !errorMessage.includes('Unauthorized')) {
          toast.error("Failed to load submissions");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/submissions/${id}/read`, {
        method: "PUT",
        credentials: "include", // Important for cookies
      });

      const data = await response.json();

      if (data.success) {
        setSubmissions((prev) =>
          prev.map((s) => (s.id === id ? { ...s, read: true } : s))
        );
        toast.success("Marked as read");
      } else {
        toast.error(data.message || "Failed to update submission");
        if (data.message?.includes("Unauthorized") || response.status === 401) {
          navigate("/admin");
        }
      }
    } catch (error) {
      toast.error("Failed to update submission");
      console.error('Mark as read error:', error);
    }
  };

  const handleReply = (submission: Submission) => {
    const subject = encodeURIComponent(`Re: Contact Form Inquiry from ${submission.name}`);
    const body = encodeURIComponent(
      `Hello ${submission.name},\n\nThank you for contacting HPG Kapital.\n\nYour message:\n${submission.message}\n\nBest regards,\nHPG Kapital Team`
    );
    window.open(`mailto:${submission.email}?subject=${subject}&body=${body}`);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/admin");
      toast.success("Logged out successfully");
    } catch (error) {
      // Even if logout fails, navigate away
      navigate("/admin");
      toast.success("Logged out");
    }
  };

  const unreadCount = submissions.filter((s) => !s.read).length;
  
  // Pagination
  const totalPages = Math.ceil(submissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSubmissions = submissions.slice(startIndex, endIndex);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-blue mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-navy mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage contact form submissions</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Submissions</p>
              <p className="text-2xl font-bold text-navy">{submissions.length}</p>
            </div>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-lg px-4 py-2">
                {unreadCount} New
              </Badge>
            )}
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-luxury-red text-luxury-red hover:bg-luxury-red hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Submissions List */}
        {submissions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
              <p className="text-xl text-muted-foreground">No submissions yet</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="space-y-4">
              {paginatedSubmissions.map((submission) => (
              <Card
                key={submission.id}
                className={`border-2 ${
                  !submission.read ? "border-luxury-red bg-red-50/50" : "border-border"
                }`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-2xl text-navy">{submission.name}</CardTitle>
                        {!submission.read && (
                          <Badge variant="destructive">New</Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <a
                            href={`mailto:${submission.email}`}
                            className="hover:text-accent transition-colors"
                          >
                            {submission.email}
                          </a>
                        </div>
                        {submission.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <a
                              href={`tel:${submission.phone}`}
                              className="hover:text-accent transition-colors"
                            >
                              {submission.phone}
                            </a>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatInTimeZone(
                            new Date(submission.date),
                            "America/New_York",
                            "MMM dd, yyyy 'at' h:mm a"
                          )} (ET)
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-semibold text-navy">Message</span>
                      </div>
                      <p className="text-muted-foreground whitespace-pre-wrap bg-muted/50 p-4 rounded-lg">
                        {submission.message}
                      </p>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-border">
                      {!submission.read && (
                        <Button
                          onClick={() => markAsRead(submission.id)}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Mark as Read
                        </Button>
                      )}
                      <Button
                        onClick={() => handleReply(submission)}
                        className="flex-1 bg-luxury-red hover:bg-luxury-red/90 text-white"
                        size="sm"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Reply via Outlook
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  Previous
                </Button>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => handlePageChange(page)}
                      className="min-w-[44px] min-h-[44px]"
                      aria-label={`Go to page ${page}`}
                      aria-current={currentPage === page ? "page" : undefined}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  Next
                </Button>
              </div>
            )}
            
            <p className="text-sm text-muted-foreground text-center mt-4">
              Showing {startIndex + 1}-{Math.min(endIndex, submissions.length)} of {submissions.length} submissions
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

