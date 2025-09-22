import { useNavigate } from "react-router-dom";

const useSessionStorage = () => {
  const setSessionStorageItem = (key: string, value: any) => {
    localStorage.setItem(key, value);
  };

  const getSessionStorageItem = (key: string) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? storedValue : null;
  };

  const removeSessionStorageItem = (key: string) => {
    localStorage.removeItem(key);
  };
  const clearSessionStorage = () => {
    localStorage.clear();
  };
  const navigate = useNavigate();

  return {
    setSessionStorageItem,
    getSessionStorageItem,
    removeSessionStorageItem,
    clearSessionStorage,
    navigate,
  };
};

export default useSessionStorage;
