import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useSpring, animated } from "@react-spring/web";

function UpdateEmployeeModal({ isOpen, onClose, employee }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [position, setPosition] = useState("");
    const [salary, setSalary] = useState("");
    const [formErrors, setFormErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");

    const animation = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(0%)" : "translateY(-100%)",
        config: { tension: 200, friction: 30 },
    });

    useEffect(() => {
        if (employee) {
            setName(employee.name);
            setEmail(employee.email);
            setPhoneNumber(employee.phoneNumber);
            setPosition(employee.position);
            setSalary(employee.salary);
        }
    }, [employee]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedEmployee = { id: employee.id, name, email, phoneNumber, position, salary, companyId: 1 };

        try {
            const response = await fetch("https://localhost:7100/api/Employee", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedEmployee),
            });

            const data = await response.json();

            if (!data.success) {
                setFormErrors(data.errors || ["Erro ao atualizar funcionario."]);
                return;
            }
 
            setSuccessMessage("Funcionario atualizado com sucesso!");
            setTimeout(() => {
                setSuccessMessage("");
                
                onClose();
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="fixed inset-0 flex items-center justify-center"
            overlayClassName="fixed inset-0 bg-neutral-800 bg-opacity-50"
        >
            <animated.div style={animation} className="bg-neutral-900 p-6 rounded-lg text-white w-2/5">
                <h2 className="font-bold mb-4 text-xl">Atualizar Funcionario</h2>
                <div className="bg-zinc-400 h-0.5 w-full mb-4 my-2"></div>

                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                        {successMessage}
                    </div>
                )}
                {formErrors.length > 0 && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        <ul>
                            {formErrors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">Nome:
                        <input
                            type="text"
                            name="name"
                            className="border text-white bg-neutral-500 border-gray-400 p-2 w-full rounded"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <label className="block mb-2">Email:
                        <input
                            type="email"
                            name="email"
                            className="border text-white bg-neutral-500 border-gray-400 p-2 w-full rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label className="block mb-2">Telefone:
                        <input
                            type="tel"
                            name="phoneNumber"
                            className="border text-white bg-neutral-500 border-gray-400 p-2 w-full rounded"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </label>
                    <label className="block mb-2">Cargo:
                        <input
                            type="text"
                            name="position"
                            className="border text-white bg-neutral-500 border-gray-400 p-2 w-full rounded"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            required
                        />
                    </label>
                    <label className="block mb-2">Salario:
                        <input
                            type="number"
                            name="salary"
                            className="border text-white bg-neutral-500 border-gray-400 p-2 w-full rounded"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            required
                        />
                    </label>

                    <div className="flex justify-between">
                        <button type="submit" className="px-6 py-2 bg-green-700 text-white rounded mt-4">
                            Atualizar
                        </button>
                        <button className="px-6 py-2 bg-red-700 text-white rounded mt-4" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </animated.div>
        </Modal>
    );
}

export default UpdateEmployeeModal;
