// const nameInput = document.querySelector("#name");
// const emailInput = document.querySelector("#email");
// const subjectInput = document.querySelector("#subject");
// const messageInput = document.querySelector("#message");

const form = document.querySelector(".form");
const btn = document.querySelector(".submit-btn");
const alert = document.querySelector(".alert");
const title = document.querySelector(".title");
alert.style.display = "none";

form.addEventListener("submit", (evt) => {
  // prevent the form from submitting
  evt.preventDefault();
  alert.style.display = "none";
  btn.disabled = true;
  btn.innerHTML = `<span class="sending"></span>`;
  // get the form values

  const formData = new FormData(form);
  const fd = convertToJSON(formData);

  sendEmail(fd);
});

async function sendEmail(data) {
  try {
    await axios.post("/api/7-email", data);

    title.textContent = "Message Sent";

    setTimeout(() => {
      title.textContent = "Send message again";
    });
    
  } catch (error) {
    alert.style.display = "block";
    alert.textContent = error.response.data;
  }
  btn.disabled = false;
  btn.innerHTML = "Send";
}

function convertToJSON(fd) {
  const obj = {};
  for (let key of fd.keys()) {
    obj[key] = fd.get(key);
  }
  return obj;
}
