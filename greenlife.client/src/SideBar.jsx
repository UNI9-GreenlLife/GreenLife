import { motion } from 'framer-motion';
import { FaUser, FaUsers, FaQuestionCircle } from 'react-icons/fa';
import logo from './assets/GreenLife-logo-black-theme.png';

function Sidebar() {
    return (
        <div className="flex h-screen">
            {/* Menu lateral */}
            <div className="w-64 bg-black text-white h-full flex flex-col justify-start items-center py-8">
                {/* Logo */}
                <div className="mb-10 w-28 h-28">
                    <img className="w-full h-full object-cover" src={logo} alt="Logo" />
                </div>

                {/* Menu items */}
                <motion.div
                    className="w-full flex flex-col items-center gap-8"
                >
                    {/* Usuário */}
                    <motion.div
                        className="flex items-center justify-center w-48 py-4 rounded-lg cursor-pointer transition-all hover:bg-neutral-700 hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <FaUser className="mr-3 text-2xl" />
                        <span className="text-lg">Usuario</span>
                    </motion.div>

                    {/* Funcionários */}
                    <motion.div
                        className="flex items-center justify-center w-48 py-4 rounded-lg cursor-pointer transition-all hover:bg-neutral-700 hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <FaUsers className="mr-3 text-2xl" />
                        <span className="text-lg">Funcionarios</span>
                    </motion.div>

                    {/* Help */}
                    <motion.div
                        className="flex items-center justify-center w-48 py-4 rounded-lg cursor-pointer transition-all hover:bg-neutral-700 hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <FaQuestionCircle className="mr-3 text-2xl" />
                        <span className="text-lg">Help</span>
                    </motion.div>
                </motion.div>
            </div>

            {/* Conteúdo principal */}
            <div className="flex-1 p-10 bg-neutral-700">
                <h1 className="text-4xl font-bold text-white">Bem-vindo ao Dashboard</h1>
            </div>
        </div>
    );
}

export default Sidebar;
