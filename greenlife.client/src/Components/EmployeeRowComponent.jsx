import { useState } from "react";
import { Pencil, Trash2 } from 'lucide-react'

function EmployeeRowComponent({ employee, handleRowClick }) {
    const [isActive, setIsActive] = useState(employee.isActive);

    const toggleStatus = (e) => {
        e.stopPropagation(); // Evita que o clique altere também o status ao clicar na linha
        setIsActive(!isActive);
    };

    return (
        <tr
            onClick={() => handleRowClick(employee.id)}
            className="bg-neutral-800 border-b border-neutral-800 border-neutral-600 transition duration-300 ease-in-out hover:bg-neutral-700 cursor-pointer"
        >
            <td className="py-4 px-4">{employee.name}</td>
            <td className="py-4 px-4">{employee.email}</td>
            <td className="py-4 px-4">{employee.phoneNumber}</td>

            <td className="py-4 px-4">{employee.position}</td>
            <td className="py-4 px-4">{employee.salary}</td>
            <td><button className="bg-blue-400 p-2 text-neutral-800 rounded hover:bg-blue-500"><Pencil /></button></td>
            <td><button className="bg-red-400 p-2 mx-4 text-neutral-800 rounded hover:bg-red-500"><Trash2 /></button></td>
            

        </tr>
    );
}

export default EmployeeRowComponent;
