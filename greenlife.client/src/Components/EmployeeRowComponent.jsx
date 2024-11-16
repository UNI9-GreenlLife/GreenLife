import { useState } from "react";
import { Pencil, Trash2 } from 'lucide-react';
import EmployeeDeleteModal from './EmployeeDeleteModal';
import UpdateEmployeeModal from './UpdateEmployeeModal';  // Importe o modal de update

function EmployeeRowComponent({ employee, handleRowClick, setEmployees }) {
    const [isActive, setIsActive] = useState(employee.isActive);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const deleteEmployee = async (employeeId) => {
        try {
            const response = await fetch(`https://localhost:7100/api/Employee?Id=${employeeId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error("Erro ao excluir funcionário");
            }

            const result = await response.json().catch(() => null);

            if (result && result.success) {
                console.log("Funcionário removido com sucesso");
                return true;
            } else {
                console.error("Erro ao remover funcionário:", result.errors);
                return false;
            }
        } catch (error) {
            console.error("Erro ao excluir funcionário:", error);
            return false;
        }
    };

    const handleUpdateEmployee = async (updatedEmployee) => {
        try {
            const response = await fetch(`https://localhost:7100/api/Employee`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEmployee),
            });

            const data = await response.json();

            if (data.success) {
                // Atualize o estado global (setEmployees) com os dados atualizados
                setEmployees(prevEmployees =>
                    prevEmployees.map(emp =>
                        emp.id === data.data.id ? data.data : emp
                    )
                );

                console.log("Funcionário atualizado com sucesso!");
            } else {
                console.error("Erro ao atualizar funcionário:", data.errors);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };


    const toggleStatus = (e) => {
        e.stopPropagation();
        setIsActive(!isActive);
    };

    const openUpdateModal = (e) => {
        e.stopPropagation();
        setIsUpdateModalOpen(true);
    };

    const closeUpdateModal = () => setIsUpdateModalOpen(false);
    const openModal = (e) => {
        e.stopPropagation();
        setIsModalOpen(true);
        fetchEmployees(); // Recarrega os dados após atualizar

    };

    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <tr
                onClick={() => handleRowClick(employee.id)}
                className="bg-neutral-800 border-b border-neutral-800 border-neutral-600 transition duration-300 ease-in-out hover:bg-neutral-700 cursor-pointer"
            >
                <td className="py-4 px-4">{employee.name}</td>
                <td className="py-4 px-4">{employee.email}</td>
                <td className="py-4 px-4">{employee.phoneNumber}</td>
                <td className="py-4 px-4">{employee.position}</td>
                <td className="py-4 px-4">{employee.salary}</td>
                <td><button className="bg-blue-400 p-2 text-neutral-800 rounded hover:bg-blue-500" onClick={openUpdateModal}><Pencil /></button></td>
                <td>
                    <button
                        className="bg-red-400 p-2 text-neutral-800 rounded hover:bg-red-500"
                        onClick={openModal}
                    >
                        <Trash2 />
                    </button>
                </td>
            </tr>

            <UpdateEmployeeModal
                isOpen={isUpdateModalOpen}
                onClose={closeUpdateModal}
                employee={employee}
            />

            <EmployeeDeleteModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={async (employeeId) => {
                    const success = await deleteEmployee(employeeId);
                    closeModal();
                    if (success) {
                        window.location.reload();
                    }
                }}
                employeeName={employee.name}
                employeeId={employee.id}
            />
        </>
    );
}

export default EmployeeRowComponent;
