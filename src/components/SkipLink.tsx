import { Link } from "react-router-dom";

const SkipLink = () => {
  return (
    <Link
      to="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-luxury-red focus:text-white focus:rounded-md focus:font-semibold focus:shadow-lg"
    >
      Skip to main content
    </Link>
  );
};

export default SkipLink;

