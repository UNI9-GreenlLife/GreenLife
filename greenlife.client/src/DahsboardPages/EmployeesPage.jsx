import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import EmployeeTable from '../Components/EmployeeList.jsx';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function EmployeesPage() {
    const [empresa, setEmpresa] = useState("Logitech");
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
    const [formErrors, setFormErrors] = useState([]); // Estado para erros do formulário

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');


    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('https://localhost:7100/api/Employee?companyId=1', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Erro: ${response.status} ${response.statusText}`);
                }

                const result = await response.json();
                if (result.success) {
                    setEmployees(result.data);
                } else {
                    console.error("Erro ao buscar funcionários:", result);
                }
            } catch (error) {
                console.error("Erro na requisição:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleRowClick = (id) => {
        const employee = employees.find(emp => emp.id === id);
        setSelectedEmployee(employee);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const openRegisterModal = () => {
        setRegisterModalIsOpen(true);
    };

    const closeRegisterModal = () => {
        setRegisterModalIsOpen(false);
        setFormErrors([]); // Limpa os erros ao fechar o modal
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        const employeeData = {
            name,
            email,
            phoneNumber,
            position,
            salary,
            companyId: 1,
        };

        try {
            const response = await fetch('https://localhost:7100/api/Employee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employeeData),
            });

            const data = await response.json();

            // Verifica o "success" do payload retornado
            if (!data.success) {
                if (data.errors && data.errors.length > 0) {
                    setFormErrors(data.errors); // Exibe os erros para o usuário
                }
                throw new Error("Erro de validação no backend.");
            }

            // Se bem-sucedido, feche o modal e limpe os erros
            setRegisterModalIsOpen(false);
            setEmployees(prevEmployees => [...prevEmployees, employeeData]);
            setFormErrors([]); // Limpa os erros
            alert("Funcionário cadastrado com sucesso!");
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };



    // Animação para os modais
    const animation = useSpring({
        opacity: registerModalIsOpen || modalIsOpen ? 1 : 0,
        transform: registerModalIsOpen || modalIsOpen ? `translateY(0%)` : `translateY(-50%)`,
        config: { tension: 200, friction: 20 },
    });

    return (
        <div>
            <div className="flex justify-between mt-6 mb-12">
                <h1 className="font-bold text-3xl mb-8">{empresa} - Lista de Funcionarios</h1>
                <button
                    onClick={openRegisterModal}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 rounded text-xl"
                >
                    Cadastrar funcionario
                </button>
            </div>
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status"></div>
                </div>
            ) : (
                <EmployeeTable employeeList={employees} handleRowClick={handleRowClick} />
            )}

            {selectedEmployee && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className="fixed inset-0 flex items-center justify-center"
                    overlayClassName="fixed inset-0 bg-neutral-800 bg-opacity-50"
                    style={{ overlay: { zIndex: 1000 } }}
                >
                    <animated.div style={animation} className="bg-neutral-900 p-6 rounded-lg text-white w-2/5">
                        <h2 className="font-bold mb-4 text-lg">Detalhes do Funcionario</h2>
                        <div className="bg-zinc-400 h-0.5 w-full mb-4 my-2"></div>
                        <p className="mb-2 text-zinc-300">
                            <strong className="text-white">Nome:</strong> {selectedEmployee.name}
                        </p>
                        <p className="mb-2 text-zinc-300">
                            <strong className="text-white">Email:</strong> {selectedEmployee.email}
                        </p>
                        <p className="mb-2 text-zinc-300">
                            <strong className="text-white">Telefone:</strong> {selectedEmployee.phoneNumber}
                        </p>
                        <p className="mb-2 text-zinc-300">
                            <strong className="text-white">Cargo:</strong> {selectedEmployee.position}
                        </p>
                        <p className="mb-2 text-zinc-300">
                            <strong className="text-white">Salario:</strong> {selectedEmployee.salary}
                        </p>

                        <div className="flex justify-between">
                            <button className="px-6 py-2 bg-blue-700 text-white rounded mt-4" onClick={closeModal}>
                                Editar
                            </button>
                            <button className="px-6 py-2 bg-red-700 text-white rounded mt-4" onClick={closeModal}>
                                Fechar
                            </button>
                        </div>
                    </animated.div>
                </Modal>
            )}

            {/* Modal para cadastrar funcionário */}
            <Modal
                isOpen={registerModalIsOpen}
                onRequestClose={closeRegisterModal}
                className="fixed inset-0 flex items-center justify-center"
                overlayClassName="fixed inset-0 bg-neutral-800 bg-opacity-50"
                style={{ overlay: { zIndex: 1000 } }}
            >
                <animated.div style={animation} className="bg-neutral-900 p-6 rounded-lg text-white w-2/5">
                    <h2 className="font-bold mb-4 text-lg">Cadastrar Funcionario</h2>
                    <div className="bg-zinc-400 h-0.5 w-full mb-4 my-2"></div>
                    <form onSubmit={handleRegisterSubmit}>
                        <label className="block mb-2">
                            Nome:
                            <input
                                type="text"
                                name="name"
                                className="border text-white bg-neutral-500 border-gray-400 p-2 w-full rounded"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </label>
                        <label className="block mb-2">
                            Email:
                            <input
                                type="email"
                                name="email"
                                className="border text-white bg-neutral-500 border-gray-400 p-2 w-full rounded"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <label className="block mb-2">
                            Telefone:
                            <input
                                type="tel"
                                name="phoneNumber"
                                className="border text-white bg-neutral-500 border-gray-400 p-2 w-full rounded"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </label>
                        <label className="block mb-2">
                            Cargo:
                            <input
                                type="text"
                                name="position"
                                className="border text-white bg-neutral-500 border-gray-400 p-2 w-full rounded"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                required
                            />
                        </label>
                        <label className="block mb-2">
                            Salario:
                            <input
                                type="number"
                                name="salary"
                                className="border text-white bg-neutral-500 border-gray-400 p-2 w-full rounded"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                required
                            />
                        </label>
                        {formErrors.length > 0 && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                                <ul>
                                    {formErrors.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="flex justify-between">
                            <button type="submit" className="px-6 py-2 bg-green-700 text-white rounded mt-4">
                                Cadastrar
                            </button>
                            <button
                                className="px-6 py-2 bg-red-700 text-white rounded mt-4"
                                onClick={closeRegisterModal}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>

                </animated.div>
            </Modal>
        </div>
    );
}

export default EmployeesPage;