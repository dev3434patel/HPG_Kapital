import { Navigate } from "react-router-dom";

const Admin = () => {
  // Simply redirect to login - let AdminDashboard handle auth check
  // This prevents unnecessary API calls and console errors
  return <Navigate to="/admin/login" replace />;
};

export default Admin;

