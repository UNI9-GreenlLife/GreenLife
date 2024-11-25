import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from './assets/GreenLife-logo-white-theme.png';
import backIcon from './assets/left-arrow.svg';


function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');

    const validateField = (name, value) => {
        let error = '';

        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) error = 'O campo Email e obrigatorio.';
            else if (!emailRegex.test(value)) error = 'Formato de email invalido.';
        }

        if (name === 'password') {
            if (!value) error = 'O campo Senha e obrigatorio.';
            else if (value.length < 6) error = 'A Senha deve ter no minimo 6 caracteres.';
        }

        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) validationErrors[key] = error;
        });

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await fetch('https://localhost:7100/api/account/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log('Response:', response);
            console.log('Response Data:', data); // Adicionando logs para verificar a resposta do servidor

            if (response.ok && data.success) {
                console.log('Token Received:', data.data); // Verificando se o token está presente na resposta
                localStorage.setItem('jwt', data.data);
                console.log('Token Stored in localStorage:', localStorage.getItem('jwt'));
                navigate('/dashboard');
            } else if (data.errors) {
                setSubmitError('Erro ao fazer login. Verifique as credenciais.');
            } else {
                setSubmitError('Erro ao conectar com o servidor.');
            }
        } catch (err) {
            setSubmitError('Erro ao conectar com o servidor.');
        }
    };


    return (
        <div className="flex w-screen h-screen justify-around">
            <div className="bg-white flex flex-col w-64 h-screen pt-20 pb-24 items-center justify-between">
                <div className="w-32 h-32 ml-32">
                    <img className="w-full h-full object-cover" src={logo} alt="Logo" />
                </div>
                <div className="flex items-center ml-32">
                    <Link to="/" className="flex">
                        <img src={backIcon} alt="Voltar" className="w-6 h-6 mr-2" />
                        <p className="font-bold text-xl mb-1">Voltar</p>
                    </Link>
                </div>
            </div>

            <div className="flex items-center">
                <form className="flex flex-col w-full items-center" onSubmit={handleSubmit}>
                    <motion.h1
                        className="font-bold text-5xl"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Faca seu login
                    </motion.h1>

                    {submitError && <p className="text-red-500 mt-4">{submitError}</p>}

                    {['email', 'password'].map((field, index) => (
                        <motion.div
                            key={field}
                            className="w-full mt-8"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 * index }}
                        >
                            <label
                                htmlFor={field}
                                className="block text-sm font-medium text-gray-600"
                            >
                                {field === 'password' ? 'Senha' : 'Email'}
                            </label>
                            <input
                                type={field === 'password' ? 'password' : 'text'}
                                id={field}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                className={`w-full p-3 mt-2 text-gray-700 bg-gray-50 border ${errors[field] ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg focus:outline-none focus:ring-2 ${errors[field] ? 'focus:ring-red-500' : 'focus:ring-green-700'
                                    }`}
                                placeholder={`Digite seu ${field === 'password' ? 'senha' : 'email'}`}
                                required
                            />
                            {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                        </motion.div>
                    ))}

                    <motion.button
                        type="submit"
                        className="bg-black w-full text-white font-bold hover:bg-neutral-700 py-3 px-4 rounded-lg mt-12"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                    >
                        Entrar
                    </motion.button>
                </form>
            </div>

            <div className="bg-white flex flex-col w-64"></div>
        </div>
    );
}

export default LoginPage;
