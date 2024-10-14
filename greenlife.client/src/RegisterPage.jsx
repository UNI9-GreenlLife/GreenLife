import { useEffect, useState } from 'react';
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
                    <h1 className="font-bold text-7xl">Registre sua empresa</h1>
                    <p className="font-bold text-xl text-neutral-400">Ja tem uma conta? <a className="underline text-green-theme">acesse aqui.</a></p>

                    { /* Campo email */ }
                    <div className="w-4/6 mt-16">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full p-3 mt-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                            placeholder="Digite seu email"
                            required
                        />
                    </div>

                    { /* Campo senha */}
                    <div className="w-4/6 mt-8">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">Senha</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full p-3 mt-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                            placeholder="Digite sua senha"
                            required
                        />
                    </div>

                    { /* Campo senha */}
                    <div className="w-4/6 mt-8">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">Confirmar Senha</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full p-3 mt-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                            placeholder="Confirme sua senha"
                            required
                        />
                    </div>
                    <button className="bg-black w-4/6 text-white font-bold py-2 px-4 rounded mt-8">
                        Registrar
                    </button>

                </div>
            </div>



            <div className="bg-white flex flex-col w-64"></div>
      </div>
  );
}

export default RegisterPage;