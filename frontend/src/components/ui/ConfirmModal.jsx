import Modal from "./Modal";
import { PrimaryButton, SecondaryButton } from "./Button";

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Confirmar acción",
  message = "¿Estás seguro?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmVariant = "danger",
}) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">{title}</h3>
          <button
            type="button"
            className="border border-white/20 bg-white/[0.06] text-[#e8eefc] rounded-lg px-2.5 py-1.5 cursor-pointer hover:bg-white/[0.1]"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <p className="text-sm opacity-80">{message}</p>

        <div className="flex justify-end gap-2.5 pt-2">
          <SecondaryButton onClick={onClose}>{cancelText}</SecondaryButton>
          {confirmVariant === "danger" ? (
            <PrimaryButton
              onClick={handleConfirm}
              className="bg-red-600 hover:bg-red-700 border-red-600"
            >
              {confirmText}
            </PrimaryButton>
          ) : (
            <PrimaryButton onClick={handleConfirm}>{confirmText}</PrimaryButton>
          )}
        </div>
      </div>
    </Modal>
  );
}
