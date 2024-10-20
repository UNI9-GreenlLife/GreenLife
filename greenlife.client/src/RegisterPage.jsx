import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import logo from './assets/GreenLife-logo-white-theme.png';
import backIcon from './assets/left-arrow.svg';
import './RegisterPage.css';

function RegisterPage() {
    return (
        <div className="flex w-screen h-screen justify-around">
            <div className="bg-white flex flex-col w-64 h-screen pt-20 pb-24 items-center justify-between">
                <div className="w-32 h-32 ml-32">
                    <img className="w-full h-full object-cover" src={logo} alt="Logo" />
                </div>
                <div className="flex items-center ml-32">
                    <img src={backIcon} alt="Voltar" className="w-6 h-6 mr-2" />
                    <p className="font-bold text-xl mb-1"> voltar</p>
                </div>
            </div>

            <div className="flex items-center">
                <div className="flex flex-col items-center">
                    <motion.h1
                        className="font-bold text-7xl"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Registre sua empresa
                    </motion.h1>

                    <motion.p
                        className="font-bold text-xl text-neutral-400 mt-4"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Ja tem uma conta? <a className="underline text-green-theme">acesse aqui.</a>
                    </motion.p>

                    {/* Campo email */}
                    <motion.div
                        className="w-4/6 mt-16"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-3 mt-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                            placeholder="Digite seu email"
                            required
                        />
                    </motion.div>

                    {/* Campo senha */}
                    <motion.div
                        className="w-4/6 mt-8"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Senha</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full p-3 mt-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                            placeholder="Digite sua senha"
                            required
                        />
                    </motion.div>

                    {/* Campo confirmar senha */}
                    <motion.div
                        className="w-4/6 mt-8"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirmar Senha</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-full p-3 mt-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                            placeholder="Confirme sua senha"
                            required
                        />
                    </motion.div>

                    <motion.button
                        className="bg-black w-4/6 text-white font-bold hover:bg-neutral-700 py-3 px-4 rounded-lg mt-12"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                    >
                        Registrar
                    </motion.button>
                </div>
            </div>

            <div className="bg-white flex flex-col w-64"></div>
        </div>
    );
}

export default RegisterPage;
