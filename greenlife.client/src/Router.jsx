import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import RegisterPage from './RegisterPage';

const RouterConfig = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </Router>
    );
};

export default RouterConfig;
