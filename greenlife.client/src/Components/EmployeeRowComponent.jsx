import { useState } from "react";

function EmployeeRowComponent({ employee, handleRowClick }) {
    const [isActive, setIsActive] = useState(employee.isActive);

    const toggleStatus = (e) => {
        e.stopPropagation(); // Evita que o clique altere tamb�m o status ao clicar na linha
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

        </tr>
    );
}

export default EmployeeRowComponent;
