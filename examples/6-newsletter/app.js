const form = document.querySelector(".form");
const emailInput = document.querySelector(".email-input");
const alert = document.querySelector(".alert");
alert.style.display = "none";

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  form.classList.add("loading");
  alert.style.display = "none";
  const email = emailInput.value;

  if (email) {
    subscription(email);
  } else {
    window.alert("Enter your email address.");
    form.classList.remove("loading");
  }
});

async function subscription(email) {
  try {
    await axios.post("/api/6-newsletter", { email });
    form.classList.remove("loading");
    form.innerHTML = `<h4 class="success">Success! Please check your email</h4>`;
  } catch (error) {
    form.classList.remove("loading");
    alert.style.display = "block";
    alert.textContent = "Something went wrong...";
  }
}
