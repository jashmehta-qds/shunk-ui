import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { ModalProps } from "./typings";

export const Modal: React.FC<ModalProps> = ({
  heading,
  children,
  openModal,
  setOpenModal,
  onClickPrimaryButton,
  onClickSecondaryButton,
  modalContent,
  primaryButton,
  secondaryButton,
}) => {
  // Close modal when 'Escape' key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenModal(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setOpenModal]);

  return (
    <div className="relative">
      {children}
      {openModal && (
        <div
          id="pd-slide-down-modal"
          className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-md bg-overlay"
          onClick={() => setOpenModal(false)}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className={clsx(
              "relative bg-white rounded-2xl p-6 w-full max-w-lg md:min-w-[80%] lg:min-w-[60%] mx-4 sm:mx-auto",
              openModal ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: openModal ? 1 : 0,
              scale: openModal ? 1 : 0.95,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <h4 className="font-silkscreen text-base font-medium text-gray-900">
                {heading}
              </h4>
              <button
                onClick={() => setOpenModal(false)}
                aria-label="Close Modal"
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.75732 7.75739L16.2426 16.2427M16.2426 7.75739L7.75732 16.2427"
                    stroke="black"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto py-2 lg:py-4 max-h-[60vh]">
              {modalContent}
            </div>
            <div className="flex items-center justify-end pt-4 border-t border-gray-200 space-x-4">
              {onClickSecondaryButton &&
                (secondaryButton ?? (
                  <button
                    type="button"
                    className="py-2.5 px-5 text-xs bg-indigo-50 text-indigo-500 rounded-full font-semibold shadow-xs transition duration-300 hover:bg-indigo-100"
                    onClick={onClickSecondaryButton}
                  >
                    Go Back
                  </button>
                ))}
              {onClickPrimaryButton &&
                (primaryButton ?? (
                  <button
                    type="button"
                    className="py-2.5 px-5 text-xs bg-indigo-500 text-white rounded-full font-semibold shadow-xs transition duration-300 hover:bg-indigo-700"
                    onClick={onClickPrimaryButton}
                  >
                    Create
                  </button>
                ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
