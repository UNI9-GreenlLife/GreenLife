import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import Modal from "react-modal";
import EmployeeTable from "../Components/EmployeeList";
import EmployeeDetailsModal from "../Components/EmployeeDetailsModal";
import RegisterEmployeeModal from "../Components/RegisterEmployeeModal";

Modal.setAppElement("#root");

function EmployeesPage() {
    const [empresa, setEmpresa] = useState("Logitech");
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch("https://localhost:7100/api/Employee?companyId=1");
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
        const employee = employees.find((emp) => emp.id === id);
        setSelectedEmployee(employee);
        setModalIsOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between mt-6 mb-12">
                <h1 className="font-bold text-3xl mb-8">{empresa} - Lista de Funcionarios</h1>
                <button
                    onClick={() => setRegisterModalIsOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 rounded text-xl"
                >
                    Cadastrar Funcionario
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status"></div>
                </div>
            ) : (
                <EmployeeTable employeeList={employees} handleRowClick={handleRowClick} />
            )}

            <EmployeeDetailsModal
                isOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                employee={selectedEmployee}
            />

            <RegisterEmployeeModal
                isOpen={registerModalIsOpen}
                onClose={() => setRegisterModalIsOpen(false)}
                setEmployees={setEmployees}
            />
        </div>
    );
}

export default EmployeesPage;
