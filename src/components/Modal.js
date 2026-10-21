import { useEffect, useRef } from "react";
import { X } from "lucide-react";
export default function Modal({
  open,
  onClose,
  title,
  children,
  className = "",
}) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!open) return;
    const previous = document.activeElement;
    dialog.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [open]);
  return (
    <dialog
      ref={ref}
      className={`ymg-dialog ${className}`}
      aria-label={title}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      <div className="dialog-content">
        <div className="dialog-heading">
          <h2>{title}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="닫기">
            <X size={24} />
          </button>
        </div>
        {open && children}
      </div>
    </dialog>
  );
}
