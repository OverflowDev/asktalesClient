
import { useContext } from 'react';
import { Navigate} from 'react-router-dom';
import  AuthContext  from '../context/AuthContext';

function AuthRoute({children}) {
  const { user } = useContext(AuthContext);

  return !user ? children : <Navigate to='/' />
}

export default AuthRoute
