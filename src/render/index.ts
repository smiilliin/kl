const form = document.getElementById("container") as HTMLFormElement;

form.onsubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const code = formData.get("code");

  window.api.runProgram(code as string);
};
