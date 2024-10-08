import React, { useEffect, useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function Modal({
  isOpen,
  onClose,
  children,
  className,
}: ModalProps) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClickOutside = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (
      e.target instanceof HTMLElement &&
      !e.target.closest(".modal") &&
      !e.target.closest(".modal-overlay")
    ) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        showModal ? "block" : "hidden"
      } `}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        handleClickOutside(event)
      }
    >
      <div
        className="modal-overlay fixed inset-0 bg-black bg-opacity-50"
        role="presentation"
        onClick={onClose}
      />
      <div
        className={`modal bg-white rounded-xl max-w-lg z-50 ${className}`}
        tabIndex={-1}
      >
        <div id="modal-description" className="py-2">
          {children}
        </div>
      </div>
    </div>
  );
}
