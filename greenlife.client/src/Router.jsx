import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import RegisterPage from './RegisterPage';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';
import LoginPage from './LoginPage';


const RouterConfig = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage /> } />
                <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
            </Routes>
        </Router>
    );
};

export default RouterConfig;
