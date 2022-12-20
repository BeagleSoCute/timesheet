export const getItem = (key) => {
  const item = localStorage.getItem(key);
  try {
    return JSON.parse(item);
  } catch (e) {
    return item;
  }
};

export const setItem = (key, rawData) => {
  const data =
    Array.isArray(rawData) || typeof rawData === "object"
      ? JSON.stringify(rawData)
      : rawData;
  localStorage.setItem(key, data);
};
