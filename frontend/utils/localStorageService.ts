// remove items from localstorage
const localStorageClear = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
};

// save items to localstorage
const localStorageSave = (token: string, name: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("name", name);
};

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export { localStorageClear, localStorageSave, getTokenFromLocalStorage };
