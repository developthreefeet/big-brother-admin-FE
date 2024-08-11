import { StorageEnumType } from '#/enum';

export const getItem = <T>(key: StorageEnumType): T | null => {
  let value = null;
  try {
    const result = window.localStorage.getItem(key);
    if (result) {
      value = JSON.parse(result);
    }
  } catch (error) {
    console.error(error);
  }
  return value;
};

export const getStringItem = (key: StorageEnumType): string | null => {
  return localStorage.getItem(key);
};

export const setItem = <T>(key: StorageEnumType, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const removeItem = (key: StorageEnumType): void => {
  localStorage.removeItem(key);
};
export const clearItems = () => {
  localStorage.clear();
};
