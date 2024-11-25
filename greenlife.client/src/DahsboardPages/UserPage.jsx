import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function UserPage() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null); // Estado para armazenar os dados do usuário
    const [loading, setLoading] = useState(true); // Estado para gerenciar o carregamento
    const [error, setError] = useState(null); // Estado para tratar erros

    const handleLogout = async () =>
    {
        localStorage.clear()

        navigate("/login")
    }

    useEffect(() => {
        // Função para buscar os dados do usuário
        const fetchUserData = async () => {
            try {
                const response = await fetch("https://localhost:7100/api/account/user", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`, // JWT do usuário armazenado no localStorage
                    },
                });

                console.log('Response:', response); // Log da resposta

                if (!response.ok) {
                    throw new Error("Erro ao buscar os dados do usuario");
                }

                const data = await response.json();
                console.log('Data:', data); // Log dos dados
                setUserData(data); // Atualiza os dados do usuário
            } catch (err) {
                console.error('Error:', err); // Log do erro
                setError(err.message); // Define o erro
            } finally {
                setLoading(false); // Finaliza o carregamento
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <p>Carregando...</p>; // Mensagem de carregamento
    }

    if (error) {
        return <p>Erro: {error}</p>; // Mensagem de erro
    }

    return (
        <div>
            <h1 className="text-3xl font-bold">Informacoes do Usuario</h1>
            <hr className="my-4"></hr>
            {userData ? (
                <>
                <ul>
                    <li><strong>ID:</strong> {userData.id}</li> {/* Verifique a capitalização de 'id' */}
                    <li><strong>Nome de Usuario:</strong> {userData.userName}</li> {/* Verifique a capitalização de 'userName' */}
                    <li><strong>Email:</strong> {userData.email}</li> {/* Verifique a capitalização de 'email' */}
                </ul>

                    <button className="px-4 py-2 mt-6 rounded bg-red-500 text-white hover:bg-red-600" onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <p>Dados nao encontrados.</p> 
            )}
        </div>
    );
}

export default UserPage;
