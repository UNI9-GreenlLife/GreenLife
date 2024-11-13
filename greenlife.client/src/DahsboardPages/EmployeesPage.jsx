import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import EmployeeTable from '../Components/EmployeeList.jsx';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Necessário para acessibilidade

function EmployeesPage() {
    const [empresa, setEmpresa] = useState("Logitech");
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

    // Defina a animação de entrada e saída para o modal
    const animation = useSpring({
        opacity: modalIsOpen ? 1 : 0,
        transform: modalIsOpen ? `translateY(0%)` : `translateY(-50%)`,
        config: { tension: 200, friction: 20 },
    });

    return (
        <div>
            <h1 className="font-bold text-3xl mb-8">{empresa} - Lista de funcionarios</h1>
            <EmployeeTable employeeList={employees} handleRowClick={handleRowClick} />

            {selectedEmployee && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className="fixed inset-0 flex items-center justify-center"
                    overlayClassName="fixed inset-0 bg-neutral-800 bg-opacity-50"
                    style={{ overlay: { zIndex: 1000 } }}
                >
                    {/* Use o componente `animated.div` para aplicar a animação */}
                    <animated.div style={animation} className="bg-neutral-900 p-6 rounded-lg text-white w-2/5">
                        <h2 className="font-bold mb-4 text-lg">Detalhes do Funcionario</h2>
                        <div className="bg-zinc-400 h-0.5 w-full mb-4 my-2"></div>
                        <p className="mb-2 text-zinc-300">
                            <strong className="text-white">Nome:</strong> {selectedEmployee.name}
                        </p>
                        <p className="mb-2 text-zinc-300">
                            <strong className="text-white">Posicao:</strong> {selectedEmployee.position}
                        </p>
                        <p className="mb-2 text-zinc-300">
                            <strong className="text-white">Departamento:</strong> {selectedEmployee.department}
                        </p>
                        <p className={`mb-4 ${selectedEmployee.isActive ? 'text-green-500' : 'text-red-500'}`}>
                            <strong className="text-white">Status:</strong>{' '}
                            {selectedEmployee.isActive ? 'Ativo' : 'Inativo'}
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
