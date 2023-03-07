import { writable, get } from 'svelte/store';

type AuthStore = {
  token: string | null;
  user?: {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
};

export const authStore = writable<AuthStore>({
  token: null,
  user: undefined,
});

const storageKey = 'qapeAuthorization';

const hydrate = () => {
  const storedValue = localStorage.getItem(storageKey);
  if (storedValue) {
    authStore.set(JSON.parse(storedValue));
  }
};

export const localStoragefy = () => {
  hydrate();
  authStore.subscribe((value) => {
    if (value.token === null) {
      localStorage.removeItem(storageKey);
      return;
    }
    localStorage.setItem(storageKey, JSON.stringify(value));
  });
};

export const getAuthStoreToken = () => get(authStore).token;

export const clearAuthStoreToken = () => authStore.set({ token: null });
