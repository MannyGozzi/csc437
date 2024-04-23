function toggleDarkMode(page, checked) {
  page.classList.toggle("dark-mode", checked);
}

document.body.addEventListener("dark-mode", (event) => {
  console.log("toggling");
  toggleDarkMode(event.currentTarget, event.detail.checked);
});
