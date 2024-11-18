import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem('jwt'); // Obtém o token armazenado no localStorage

    if (token == null) {
        // Caso o token não exista, redireciona para a página de login
        return <Navigate to="/login" replace />;
    }

    // Token existe; renderiza o elemento protegido
    return element;
};

export default PrivateRoute;
