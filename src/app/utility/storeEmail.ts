type StorageAction = "add" | "remove";

const storageEmailLocalStorage = (email: string, type: StorageAction) => {
  if (type === "add") {
    localStorage.setItem("resetEmail", email);
  } else if (type === "remove") {
    localStorage.removeItem("resetEmail");
  }
};
export default storageEmailLocalStorage;
