import { Navigate, Outlet, redirect } from 'react-router-dom';

export default function PrivateRoute({ redirectPage = '/' }){
  const loggedInUser = localStorage.getItem("usuarioLogado") === "true"

  if (!loggedInUser) {
    return <Navigate to={redirectPage} replace />;
  }

  return <Outlet />;
};
