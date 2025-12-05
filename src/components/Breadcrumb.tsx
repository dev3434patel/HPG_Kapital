import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path: string;
}

const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/about': 'About Us',
  '/capital-markets': 'Capital Markets',
  '/eb5-advisory': 'EB-5 Advisory',
  '/loan-products': 'Loan Products',
  '/hospitality-financing': 'Hospitality Financing',
  '/gc-referral': 'GC Referral Program',
  '/contact': 'Contact Us',
  '/admin': 'Admin',
  '/admin/login': 'Admin Login',
  '/admin/dashboard': 'Admin Dashboard',
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show breadcrumb on home page
  if (location.pathname === '/') {
    return null;
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
  ];

  let currentPath = '';
  pathnames.forEach((pathname) => {
    currentPath += `/${pathname}`;
    const label = routeLabels[currentPath] || pathname.charAt(0).toUpperCase() + pathname.slice(1).replace(/-/g, ' ');
    breadcrumbs.push({ label, path: currentPath });
  });

  return (
    <nav aria-label="Breadcrumb" className="container mx-auto px-6 py-4">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <li key={crumb.path} className="flex items-center">
              {index === 0 ? (
                <Link
                  to={crumb.path}
                  className="flex items-center hover:text-accent transition-colors"
                  aria-label="Home"
                >
                  <Home className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" aria-hidden="true" />
                  {isLast ? (
                    <span className="text-foreground font-medium" aria-current="page">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      to={crumb.path}
                      className="hover:text-accent transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

