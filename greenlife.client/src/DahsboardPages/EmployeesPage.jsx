import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import EmployeeTable from '../Components/EmployeeList.jsx';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Necessário para acessibilidade

function EmployeesPage() {
    const [empresa] = useState("Logitech");
    const [employees] = useState([
        { id: 1, name: "Joao", position: "Backend Developer 1", department: "TI", isActive: true },
        { id: 2, name: "Maria", position: "Designer", department: "Marketing", isActive: false },
        { id: 3, name: "Ronaldo", position: "Designer", department: "Marketing", isActive: false },
        { id: 4, name: "Regina", position: "Backend Developer 1", department: "TI", isActive: false },
        { id: 5, name: "Marcos", position: "Backend Developer 2", department: "TI", isActive: true },
        { id: 6, name: "Lorenzo", position: "Frontend Developer 2", department: "TI", isActive: true },
        { id: 7, name: "Henrique", position: "Frontend Developer 2", department: "TI", isActive: true },
        { id: 8, name: "Marcio", position: "Engenheiro", department: "TI", isActive: true },
        { id: 9, name: "Sophia", position: "PO", department: "Produtos", isActive: true },
    ]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleRowClick = (id) => {
        const employee = employees.find(emp => emp.id === id);
        setSelectedEmployee(employee);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    // Configuração da animação de entrada e saída do modal
    const animation = useSpring({
        opacity: modalIsOpen ? 1 : 0,
        transform: modalIsOpen ? 'translateY(0)' : 'translateY(-50px)',
        config: { tension: 300, friction: 25 },
    });

    return (
        <div>
            <h1 className="font-bold text-3xl mb-8">{empresa} - Lista de funcionários</h1>
            <EmployeeTable employeeList={employees} handleRowClick={handleRowClick} />

            {selectedEmployee && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className="fixed inset-0 flex items-center justify-center"
                    overlayClassName="fixed inset-0 bg-neutral-700 bg-opacity-50"
                    style={{ overlay: { zIndex: 1000 } }}
                >
                    {/* Componente `animated.div` para aplicar a animação */}
                    <animated.div style={animation} className="bg-neutral-900 p-6 rounded-lg shadow-lg text-white w-2/5">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-bold text-lg">Detalhes do Funcionário</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-200">✖</button>
                        </div>
                        <div className="bg-zinc-400 h-0.5 w-full mb-4 my-2"></div>
                        <p className="mb-4 text-zinc-300 flex items-center">
                            <span className="mr-2">👤</span><p><strong className="text-white font-bold">Nome: </strong> {selectedEmployee.name}</p>
                        </p>
                        <p className="mb-4 text-zinc-300 flex items-center">
                            <span className="mr-2">💼</span><p><strong className="text-white font-bold">Posição: </strong> {selectedEmployee.position}</p>
                        </p>
                        <p className="mb-4 text-zinc-300 flex items-center">
                            <span className="mr-2">🏢</span><p><strong className="text-white font-bold">Departamento: </strong> {selectedEmployee.department}</p>
                        </p>
                        <p className={`mb-4 flex items-center ${selectedEmployee.isActive ? 'text-green-500' : 'text-red-500'}`}>
                            <span className="mr-2">{selectedEmployee.isActive ? '✔️' : '❌'}</span>
                            <p><strong className="text-white font-bold">Status: </strong> {selectedEmployee.isActive ? "Ativo" : "Inativo"}</p>
                        </p>

                        <div className="flex justify-center gap-4">
                            <button className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors">Editar</button>
                            <button className="px-6 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors" onClick={closeModal}>Fechar</button>
                        </div>
                    </animated.div>
                </Modal>
            )}
        </div>
    );
}

export default EmployeesPage;
