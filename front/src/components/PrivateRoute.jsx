import { Navigate, Outlet} from 'react-router-dom';

export default function PrivateRoute({ redirectPage = '/' }){
  const loggedInUser = localStorage.getItem("isUserLogged") === "true"

  if (!loggedInUser) {
    return <Navigate to={redirectPage} replace />;
  }

  return <Outlet />;
};
