export const saveToStorage = (key, value) => {
  window.localStorage.setItem(key, value);
  console.info("Save key="+key+" value="+value)
};

export const getFromStorage = (key) => {
  const value = window.localStorage.getItem(key)
  console.info("get key="+key+" value="+value)
  return window.localStorage.getItem(key);
};
