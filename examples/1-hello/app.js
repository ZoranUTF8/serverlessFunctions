const resultHeading = document.querySelector(".result");

const fetchData = async () => {
  try {
    //const { data } = await axios.get("/.netlify/functions/1-hello");
    // when we add redirects to netlify toml file we specify the path there
    const { data } = await axios.get("/api/1-hello");

    resultHeading.textContent = data;
  } catch (error) {
    resultHeading.textContent = error.response.data + error.response.status;

    console.log(error.response.status);
  }
};
window.addEventListener("load", () => {
  fetchData();
});
