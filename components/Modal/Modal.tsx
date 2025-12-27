import React, { useEffect } from "react";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";

interface ModalProps {
	children: React.ReactNode;
	closeModal: () => void;
}

const Modal = ({ children, closeModal }: ModalProps) => {
	const closeModalBack = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) closeModal();
	};

	useEffect(() => {
		const handleKeydown = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeModal();
		};

		window.addEventListener("keydown", handleKeydown);
		document.body.style.overflow = "hidden";

		return () => {
			window.removeEventListener("keydown", handleKeydown);
			document.body.style.overflow = "";
		};
	});

	return createPortal(
		<div>
			<div
				onClick={closeModalBack}
				className={css.backdrop}
				role="dialog"
				aria-modal="true"
			>
				<div className={css.modal}>{children}</div>
			</div>
		</div>,
		document.body
	);
};

export default Modal;
