import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import EmployeeTable from '../Components/EmployeeList.jsx';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Necessário para acessibilidade

function EmployeesPage() {
    const [empresa, setEmpresa] = useState("Logitech");
    const [employees, setEmployees] = useState([]); // Inicializado como uma lista vazia
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Função para buscar dados do endpoint
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
                    setEmployees(result.data); // Define os dados da API no estado
                } else {
                    console.error("Erro ao buscar funcionários:", result);
                }
            } catch (error) {
                console.error("Erro na requisição:", error);
            } finally {
                setLoading(false); // Define carregamento como falso após a conclusão
            }
        };

        fetchEmployees();
    }, []); // O array vazio [] garante que a busca seja feita apenas uma vez, ao carregar a página.

    const handleRowClick = (id) => {
        const employee = employees.find(emp => emp.id === id);
        setSelectedEmployee(employee);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    // Defina a animação de entrada e saída para o modal
    const animation = useSpring({
        opacity: modalIsOpen ? 1 : 0,
        transform: modalIsOpen ? `translateY(0%)` : `translateY(-50%)`,
        config: { tension: 200, friction: 20 },
    });

    return (
        <div>
            <h1 className="font-bold text-3xl mb-8">{empresa} - Lista de Funcionarios</h1>
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                        
                    </div>
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
        </div>
    );
}

export default EmployeesPage;
