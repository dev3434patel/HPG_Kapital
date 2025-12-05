import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center bg-background pt-16">
      <div className="text-center max-w-md mx-auto px-6">
        <h1 className="mb-4 text-6xl font-bold text-navy">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-foreground">Page Not Found</h2>
        <p className="mb-8 text-lg text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild size="lg" className="bg-luxury-red hover:bg-luxury-red/90 text-white">
          <Link to="/">
            <Home className="w-4 h-4 mr-2" aria-hidden="true" />
            Return to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
