"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";

const customTooltip = ({ point }) => {
  return (
    <div
      style={{
        background: "white",
        padding: "5px",
        border: "1px solid #ccc",
      }}
    >
      {point.data.yFormatted}
    </div>
  );
};

export interface ModalState {
  modalContent: React.ReactNode | null;
  uniqueId: string;
  isOpen: boolean;
}

export interface AnimatedCardProps {
  modalState: ModalState;
  setModalState: Dispatch<SetStateAction<ModalState>>;
  onclick?: () => void;
  className?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  onclick,
  modalState,
  setModalState,
}) => {
  return (
    <AnimatePresence>
      {modalState.isOpen && (
        <div
          className="absolute top-0 left-0 right-0 bottom-0 z-5 backdrop-blur-sm"
          onClick={() =>
            setModalState({
              isOpen: false,
              uniqueId: "",
              modalContent: null,
            })
          }
        ></div>
      )}
      {modalState.isOpen && (
        <motion.div
          className="absolute rounded-lg shadow-md translateX(50%) top-[40%] bg-white z-50"
          layoutId={modalState.uniqueId}
          onClick={() => onclick()}
        >
          {modalState.modalContent}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedCard;
