import { Home, Users, User, CircleHelp } from 'lucide-react'
import { useState } from 'react';
import HomePage from './DahsBoardPages/HomePage.jsx'
import EmployeesPage from './DahsBoardPages/EmployeesPage.jsx'
import HelpPage from './DahsBoardPages/HelpPage.jsx'
import UserPage from './DahsBoardPages/UserPage.jsx'



function Dashboard() {

    const [currentPage, setCurrentPage] = useState('home');

    const renderContent = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage />;
            case 'user':
                return <UserPage />;
            case 'employees':
                return <EmployeesPage />;
            case 'help':
                return <HelpPage />;
            default:
                return <HomePage />;
        }
    };

    return (
        <div className="flex bg-zinc-950 min-h-screen bg-gradient-to-b from-neutral-300/10 to-transparent h-screen text-zinc-200">
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
                            onClick={() => setCurrentPage('user')}
                        >
                            <User /> User
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

            <main className="flex-1 p-10">
                {renderContent()}
            </main>
        </div>
    );
}

export default Dashboard;
