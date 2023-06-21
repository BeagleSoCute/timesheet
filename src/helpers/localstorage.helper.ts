export const setObjectToLocalStorage = (key: string, object: object): void => {
  const stringifiedObject = JSON.stringify(object);
  localStorage.setItem(key, stringifiedObject);
};

export const getObjectFromLocalStorage = (key: string): any => {
  const stringifiedObject = localStorage.getItem(key);
  if (stringifiedObject) {
    return JSON.parse(stringifiedObject);
  }
  return null;
};
