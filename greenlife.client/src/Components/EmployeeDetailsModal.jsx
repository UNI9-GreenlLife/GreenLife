import { useSpring, animated } from "@react-spring/web";
import Modal from "react-modal";

function EmployeeDetailsModal({ isOpen, onClose, employee }) {
    if (!employee) return null;

    const animation = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(0%)" : "translateY(-100%)",
        config: { tension: 200, friction: 30 },
    });

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="fixed inset-0 flex items-center justify-center"
            overlayClassName="fixed inset-0 bg-neutral-800 bg-opacity-50"
        >
            <animated.div style={animation} className="bg-neutral-900 p-6 rounded-lg text-white w-2/5">
                <h2 className="font-bold mb-4 text-xl">Detalhes do Funcionario</h2>
                <div className="bg-zinc-400 h-0.5 w-full mb-4 my-2"></div>
                <p className="mb-2 text-zinc-300"><strong>Nome:</strong> {employee.name}</p>
                <p className="mb-2 text-zinc-300"><strong>Email:</strong> {employee.email}</p>
                <p className="mb-2 text-zinc-300"><strong>Telefone:</strong> {employee.phoneNumber}</p>
                <p className="mb-2 text-zinc-300"><strong>Cargo:</strong> {employee.position}</p>
                <p className="mb-2 text-zinc-300"><strong>Salario:</strong> {employee.salary}</p>
                <div className="flex justify-end">
                    <button className="px-6 py-2 bg-red-700 text-white rounded mt-4" onClick={onClose}>
                        Fechar
                    </button>
                </div>
            </animated.div>
        </Modal>
    );
}

export default EmployeeDetailsModal;
