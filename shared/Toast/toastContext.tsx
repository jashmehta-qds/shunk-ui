// components/ToastContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import Toast from ".";

type ToastType = "info" | "success" | "warning" | "error";

interface ToastMessage {
  id: number;
  title: string;
  description: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (title: string, description: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, description: string, type: ToastType) => {
    let newToastId = toasts.length;
    setToasts((prev) => {
      newToastId = prev.length;
      return [...prev, { id: prev.length, title, description, type }];
    });

    setTimeout(() => {
      removeToast(newToastId);
    }, 5000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      <div className="fixed bottom-5 right-5 space-y-3 z-50">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            title={toast.title}
            description={toast.description}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
