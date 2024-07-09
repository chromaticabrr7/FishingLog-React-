import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../components/Toast/Toast';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'default') => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prevToasts) => [...prevToasts, { id, message, type}]);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={addToast}>
            {children}
            {toasts.map((toast) => (
                <Toast key={toast.id} {...toast} removeToast={removeToast} />
            ))}
        </ToastContext.Provider>
    );
};