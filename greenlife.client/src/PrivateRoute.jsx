import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem('jwt'); // Obt�m o token armazenado no localStorage

    if (token == null) {
        // Caso o token n�o exista, redireciona para a p�gina de login
        return <Navigate to="/login" replace />;
    }

    // Token existe; renderiza o elemento protegido
    return element;
};

export default PrivateRoute;
