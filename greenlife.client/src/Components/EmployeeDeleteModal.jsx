import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import Modal from "react-modal";

function EmployeeDeleteModal({ isOpen, onClose, onConfirm, employeeName, employeeId, updateEmployeeList }) {
    const [statusMessage, setStatusMessage] = useState(""); // Estado para armazenar a mensagem de status
    const [isProcessing, setIsProcessing] = useState(false); // Estado para controle de processamento

    if (!employeeName) return null;

    const animation = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(0%)" : "translateY(-100%)",
        config: { tension: 200, friction: 30 },
    });

    const handleConfirmDelete = async () => {
        setIsProcessing(true); // Inicia o processamento
        setStatusMessage("");  // Limpa a mensagem de status antes de tentar excluir

        const success = await onConfirm(employeeId);  // Chama a função de exclusão

        if (success) {
            setStatusMessage("Funcionário excluído com sucesso!"); // Mensagem de sucesso
            updateEmployeeList();  // Atualiza a lista se a exclusão for bem-sucedida
        } else {
            setStatusMessage("Erro ao excluir funcionário. Tente novamente."); // Mensagem de erro
        }

        setIsProcessing(false);  // Finaliza o processamento
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="fixed inset-0 flex items-center justify-center"
            overlayClassName="fixed inset-0 bg-neutral-800 bg-opacity-50"
        >
            <animated.div style={animation} className="bg-neutral-900 p-6 rounded-lg text-white w-2/5">
                <h2 className="font-bold mb-4 text-lg">Confirmacao de Exclusao</h2>
                <div className="bg-zinc-400 h-0.5 w-full mb-4 my-2"></div>

                {/* Mensagem de status (sucesso ou erro) */}
                {statusMessage ? (
                    <p className={`mb-2 text-lg ${statusMessage.includes("sucesso") ? "text-green-400" : "text-red-400"}`}>
                        {statusMessage}
                    </p>
                ) : (
                    <p className="mb-2 text-zinc-300">
                        Tem certeza que deseja excluir o funcionario <strong>{employeeName}</strong>?
                    </p>
                )}

                <div className="flex justify-end space-x-4">
                    <button
                        className="px-6 py-2 bg-gray-500 text-white rounded mt-4"
                        onClick={onClose}
                        disabled={isProcessing} // Desabilita o botão enquanto processa a exclusão
                    >
                        Cancelar
                    </button>
                    <button
                        className="px-6 py-2 bg-red-700 text-white rounded mt-4"
                        onClick={handleConfirmDelete}  // Confirma a exclusão
                        disabled={isProcessing} // Desabilita o botão enquanto processa a exclusão
                    >
                        {isProcessing ? "Excluindo..." : "Confirmar Exclusao"}
                    </button>
                </div>
            </animated.div>
        </Modal>
    );
}

export default EmployeeDeleteModal;
