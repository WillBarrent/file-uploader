const addFolderButton = document.querySelector(".main__actions--add-folder");
const addFolderForm = document.querySelector(".create-folder--wrapper");
const addFolderCloseButton = document.querySelector(
  ".create-folder__close-button"
);

addFolderButton.addEventListener("click", () => {
  addFolderForm.style.display = "block";
});

addFolderCloseButton.addEventListener("click", () => {
  addFolderForm.style.display = "none";
});
