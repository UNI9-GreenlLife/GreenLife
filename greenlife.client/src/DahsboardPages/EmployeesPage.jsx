import { useState } from 'react';
import EmployeeTable from '../Components/EmployeeList.jsx'
function EmployeesPage() {

    const [empresa, setEmpresa] = useState("Logitech")

    // moq
    const employees = [
        { id: 1, name: "Joao", position: "Backend Developer 1", department: "TI", isActive: true },
        { id: 2, name: "Maria", position: "Designer", department: "Marketing", isActive: false },
        { id: 2, name: "Ronaldo", position: "Designer", department: "Marketing", isActive: false },
        { id: 2, name: "Regina", position: "Backend Developer 1", department: "TI", isActive: false },
        { id: 2, name: "Marcos", position: "Backend Developer 2", department: "TI", isActive: true },
        { id: 2, name: "Lorenzo", position: "Frontend Developer 2", department: "TI", isActive: true },

    ];

    const handleRowClick = (id) => {
        console.log("Employee ID:", id);
    };

    return (


        <div className="">
            <h1 className="font-bold text-3xl mb-8">{empresa} - Lista de funcionarios</h1>
            <EmployeeTable employeeList={employees} handleRowClick={handleRowClick} />
        </div>
    );
}

export default EmployeesPage;