type StorageAction = "add" | "remove";

const storageEmailLocalStorage = (email: string, type: StorageAction) => {
  if (type === "add") {
    localStorage.setItem("rememberedEmail", email);
  } else if (type === "remove") {
    localStorage.removeItem("rememberedEmail");
  }
};
export default storageEmailLocalStorage;
