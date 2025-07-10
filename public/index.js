const addFolderButton = document.querySelector(".main__actions--add-folder");
const addFolderForm = document.querySelector(".create-folder--wrapper");
const addFolderCloseButton = document.querySelector(
  ".create-folder__close-button"
);

const editFolderButtons = document.querySelectorAll(
  ".storage__folder--actions-edit"
);
const editFolderForm = document.querySelector(".edit-folder--wrapper");
const editFolderCloseButton = document.querySelector(
  ".edit-folder__close-button"
);

addFolderButton.addEventListener("click", () => {
  addFolderForm.style.display = "block";
});

addFolderCloseButton.addEventListener("click", () => {
  addFolderForm.style.display = "none";
});

editFolderButtons.forEach((editFolderButton) => {
  editFolderButton.addEventListener("click", (e) => {
    editFolderForm.style.display = "block";

    const editFolderButtonElement = e.target;
    const storageFolderActions = editFolderButtonElement.closest(
      ".storage__folder--actions"
    );
    const folderId = storageFolderActions.querySelector(
      ".storage__folder--actions-edit--input"
    );
    const editFormFolderIdField = document.querySelector(
      ".edit-folder__folder-id"
    );

    editFormFolderIdField.value = folderId.value;
  });
});

editFolderCloseButton.addEventListener("click", () => {
  editFolderForm.style.display = "none";
});
