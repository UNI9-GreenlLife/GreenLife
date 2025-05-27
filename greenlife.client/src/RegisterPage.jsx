import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from './assets/GreenLife-logo-white-theme.png';
import backIcon from './assets/left-arrow.svg';
import './RegisterPage.css';

function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        companyId: 1,
    });
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');

    const validateField = (name, value) => {
        let error = '';

        if (name === 'name') {
            if (!value) error = 'O campo Nome e obrigatorio.';
            else if (value.length < 5 || value.length > 50)
                error = 'O Nome deve ter entre 5 e 50 caracteres.';
        }

        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) error = 'O campo Email e obrigatorio.';
            else if (!emailRegex.test(value)) error = 'Formato de email invalido.';
        }

        if (name === 'password') {
            if (!value) error = 'O campo Senha e obrigatorio.';
            else if (value.length < 6) error = 'A Senha deve ter no minimo 6 caracteres.';
            else if (!/[^a-zA-Z0-9]/.test(formData.password)) error = 'A senha deve conter pelo menos um caractere especial.';
            else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password)) error = 'A senha deve conter letras maiusculas e minusculas.';
            else if (!/\d/.test(formData.password)) error = 'A senha deve conter pelo menos um numero.';

        }

        if (name === 'confirmPassword') {
            if (!value) error = 'O campo Confirmar Senha e obrigatorio.';

            else if (value !== formData.password) error = 'As senhas nao coincidem.';
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

        // Validação antes do envio
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
            const response = await fetch('https://localhost:7100/api/account/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                localStorage.setItem('jwt', data.data); 
                navigate('/dashboard'); 
            } else if (data.errors) {
                const apiErrors = {};
                for (const key in data.errors) {
                    apiErrors[key] = data.errors[key][0];
                }
                setErrors(apiErrors); 
            } else {
                setSubmitError('Erro ao registrar. Tente novamente.');
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
            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <motion.h1
                    className="font-bold text-5xl"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Registre sua empresa
                </motion.h1>

                {submitError && <p className="text-red-500 mt-4">{submitError}</p>}

                {['name', 'email', 'password', 'confirmPassword'].map((field, index) => (
                    <motion.div
                        key={field}
                        className="w-4/6 mt-8"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 * index }}
                    >
                        <label
                            htmlFor={field}
                            className="block text-sm font-medium text-gray-600"
                        >
                            {field === 'confirmPassword' ? 'Confirmar Senha' : field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                            type={field.includes('password', 'confirmPassword') ? 'password' : 'text'}
                            id={field}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className={`w-full p-3 mt-2 text-gray-700 bg-gray-50 border ${errors[field] ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 ${errors[field] ? 'focus:ring-red-500' : 'focus:ring-green-700'
                                }`}
                            placeholder={`Digite seu ${field}`}
                            required
                        />
                        {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                    </motion.div>
                ))}

                <motion.button
                    type="submit"
                    className="bg-black w-4/6 text-white font-bold hover:bg-neutral-700 py-3 px-4 rounded-lg mt-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                >
                    Registrar
                </motion.button>
                </form>
            </div>

            <div className="bg-white flex flex-col w-64"></div>
        </div>
    );
}

export default RegisterPage;
