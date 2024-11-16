import EmployeeRowComponent from "./EmployeeRowComponent";

function EmployeeTable({ employeeList, handleRowClick }) {
    return (

            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className="bg-neutral-900 text-neutral-300">
                    <tr>
                        <th className="w-1/5 py-3 px-4 text-left border-gray-200 font-bold text-sm">Nome</th>
                        <th className="w-1/5 py-3 px-4 text-left border-gray-200 font-bold text-sm">Email</th>
                        <th className="w-1/5 py-3 px-4 text-left border-gray-200 font-bold text-sm">Telefone</th>
                    
                    <th className="w-1/5 py-3 px-4 text-left font-bold text-sm">Posicao</th>
                    <th className="w-1/5 py-3 px-4 text-left font-bold text-sm">Salario</th>

                    </tr>
                </thead>
                <tbody className="text-neutral-300">
                    {employeeList.length > 0 &&
                        employeeList.map((employee) => (
                            <EmployeeRowComponent
                                key={employee.id}
                                employee={employee}
                                handleRowClick={handleRowClick}
                            />
                        ))}
                </tbody>
            </table>

    );
}

export default EmployeeTable;
