import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // must include `role`

  if (!token || user?.role !== 'ADMIN') {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedAdminRoute;
