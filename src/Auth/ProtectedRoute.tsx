import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  children: ReactNode;
  isAllow: boolean;
  path: string;
}

function ProtectedRoute({ children, isAllow, path }: IProps) {
  if (!isAllow) return <Navigate to={path} />;
  return children;
}

export default ProtectedRoute;
