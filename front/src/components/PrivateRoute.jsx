import { Navigate, Outlet} from 'react-router-dom';

/**
 * Creates a private route
 * @module Components:PrivateRoute
 * @param {string} [redirectPage = "/"] - The page to redirect user
 * @param {boolean} isUserLoggedIn - Indicates if user is logged in
 * @returns {JSX.Element}
 */
export default function PrivateRoute({ redirectPage = '/', isUserLoggedIn}){
  return !isUserLoggedIn? <Navigate to={redirectPage} replace/>: <Outlet/>
};
