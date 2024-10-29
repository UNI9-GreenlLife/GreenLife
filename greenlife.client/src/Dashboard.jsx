import { Home, Users, CircleHelp } from 'lucide-react'
import { useState } from 'react';
import HomePage from './DahsBoardPages/HomePage.jsx'
import EmployeesPage from './DahsBoardPages/EmployeesPage.jsx'
import HelpPage from './DahsBoardPages/HelpPage.jsx'

// Componentes para cada página do dashboard


function Dashboard() {
    // State para controlar a página atual
    const [currentPage, setCurrentPage] = useState('home');

    // Função que renderiza o componente com base no estado
    const renderContent = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage />;
            case 'employees':
                return <EmployeesPage />;
            case 'help':
                return <HelpPage />;
            default:
                return <HomePage />;
        }
    };

    return (
        <div className="flex bg-zinc-950 min-h-screen bg-gradient-to-b from-green-800/20 to-transparent h-screen text-zinc-200">
            <div className="flex flex-col justify-between bg-zinc-950 p-6 py-8">
                <aside className="w-72">
                    <nav className="space-y-8">
                        <a
                            href="#"
                            className="flex items-center gap-4 font-bold text-zinc-200 hover:text-zinc-300"
                            onClick={() => setCurrentPage('home')}
                        >
                            <Home /> Home
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-4 font-bold text-zinc-200 hover:text-zinc-300"
                            onClick={() => setCurrentPage('employees')}
                        >
                            <Users /> Funcionarios
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-4 font-bold text-zinc-200 hover:text-zinc-300"
                            onClick={() => setCurrentPage('help')}
                        >
                            <CircleHelp /> Ajuda
                        </a>
                    </nav>
                </aside>
                <p className="text-zinc-600 text-lg"> &copy; Greenlife Co.</p>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-6">
                {renderContent()}
            </main>
        </div>
    );
}

export default Dashboard;
