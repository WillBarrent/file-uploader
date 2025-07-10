const addFileButton = document.querySelector(".main__actions--add-file");
const fileUploadForm = document.querySelector(".file-upload--wrapper");
const fileUploadCloseButton = document.querySelector(
  ".file-upload__close-button"
);

addFileButton.addEventListener("click", () => {
  fileUploadForm.style.display = "block";
});

fileUploadCloseButton.addEventListener("click", () => {
  fileUploadForm.style.display = "none";
});

