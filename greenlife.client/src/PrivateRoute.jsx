import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem('jwt');

    if (token == null) {
        return <Navigate to="/login" replace />;
    }
    return element;
};

export default PrivateRoute;
