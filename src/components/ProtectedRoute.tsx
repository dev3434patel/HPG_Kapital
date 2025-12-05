import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        // Make a lightweight request to check auth
        // Use GET but we'll only check status, not parse response
        const response = await fetch("/api/admin/submissions", {
          method: "GET",
          credentials: "include",
        });

        if (isMounted) {
          // 200 = authenticated, 401 = not authenticated
          setIsAuthenticated(response.status === 200);
          setIsLoading(false);
        }
      } catch (error) {
        // Network error or other issue - assume not authenticated
        if (isMounted) {
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-blue mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login, preserving the attempted location
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

