import { writable } from 'svelte/store';

export type ToastType = {
  id: string;
  message: string;
  type?: 'success' | 'error';
  duration?: number;
};

export type ToastOptions = Partial<Omit<ToastType, 'message'>>;

const { subscribe, update } = writable<ToastType[]>([]);

const toast = (message: string, options: ToastOptions = {}) => {
  const id = options.id || Math.random().toString(36).slice(2);
  const duration = options.duration || 3000;

  const toast: ToastType = {
    id,
    message,
    duration,
    ...options,
  };

  update((toasts) => [...toasts, toast]);

  const timeoutId = setTimeout(() => {
    update((toasts) => toasts.filter((t) => t.id !== id));
    clearTimeout(timeoutId);
  }, toast.duration);
};

toast.success = (message: string, options: ToastOptions = {}) => {
  toast(message, { type: 'success', ...options });
};

toast.error = (message: string, options: ToastOptions = {}) => {
  toast(message, { type: 'error', ...options });
};

toast.remove = (id: string) => {
  update((toasts) => toasts.filter((t) => t.id !== id));
};

export default toast;

export const toasts = { subscribe, remove: toast.remove };
