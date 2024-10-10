import { useEffect, useState } from 'react';
import './App.css';
import logo from './assets/GreenLife-logo-black-theme.png';

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-black w-full h-32 flex justify-around items-center shadow-[0_4px_10px_rgba(255,255,255,0.4)]">
                {/* item 1 - logo */}
                <div className="w-32 h-32">
                    <img className="w-full h-full object-cover" src={logo} alt="Logo" />
                </div>

                {/* item 2 - navigation */}
                <div className="text-white flex justify-around w-80 font-bold text-xl">
                    <a href="#">Produtos</a>
                    <a href="#">Servicos</a>
                    <a href="#">Contato</a>
                </div>

                {/* item 3 - buttons */}
                <nav className="flex justify-around w-60">
                    <button className="bg-black text-white font-bold py-2 px-4 border border-white rounded hover:bg-gray-800">
                        Login
                    </button>
                    <button className="bg-green-theme hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Registrar
                    </button>
                </nav>
            </header>

            {/* Main Section */}
            <div className="w-full flex justify-around bg-black items-center py-44 flex-grow">
                <div className="w-4/5">
                    <div className="flex py-12 md:py-24 items-center justify-between w-full">
                        <div className="font-bold text-white text-6xl md:text-8xl">
                            <p>Otimize a gestao de</p>
                            <p>pessoas com</p>
                            <p>eficiencia e precisao</p>
                        </div>

                        <div className="font-bold text-neutral-500 text-xl md:text-2xl mr-12">
                            <p>Gestao de folha de pagamento,</p>
                            <p>controle de ferias e beneficios e</p>
                            <p>automacao de recrutamento</p>

                            <div className="flex justify-around mt-8">
                                <button className="bg-green-theme hover:bg-green-700 text-white btn-reflexo font-bold py-2 px-4 rounded">
                                    Comece agora
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-neutral-950 text-neutral-400 py-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-4 md:mb-0">
                            <p>&copy; 2024 Nome da Empresa. Todos os direitos reservados.</p>
                            <p>Endereco: Rua Marilia, 15, Sao Paulo, Brasil</p>
                            <p>Contato: greenlife@gmail.com | +55 (XX) XXXXX-XXXX</p>
                        </div>

                        <div className="mb-4 md:mb-0">
                            <ul>
                                <li><a href="/about" className="hover:underline">Sobre Nos</a></li>
                                <li><a href="/terms" className="hover:underline">Termos de Servico</a></li>
                                <li><a href="/privacy" className="hover:underline">Politica de Privacidade</a></li>
                                <li><a href="/contact" className="hover:underline">Contato</a></li>
                            </ul>
                        </div>

                        <div className="flex space-x-4">
                            <a href="https://facebook.com" className="hover:text-gray-400" aria-label="Facebook">
                                <i className="fab fa-facebook fa-2x"></i>
                            </a>
                            <a href="https://instagram.com" className="hover:text-gray-400" aria-label="Instagram">
                                <i className="fab fa-instagram fa-2x"></i>
                            </a>
                            <a href="https://twitter.com" className="hover:text-gray-400" aria-label="Twitter">
                                <i className="fab fa-twitter fa-2x"></i>
                            </a>
                            <a href="https://linkedin.com" className="hover:text-gray-400" aria-label="LinkedIn">
                                <i className="fab fa-linkedin fa-2x"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>



     
    );  
}

export default App;