const title = document.querySelector(".title h2");
const result = document.querySelector(".result");

const fetchSurveyData = async () => {
  try {
    const { data } = await axios.get("/api/4-survey");
    const response = data
      .map((vote) => {
        const { id, room, votes } = vote;

        return `
        <li>
        <div class="key">
        ${room.toUpperCase().substring(0, 2)}
        </div>
        <div>
        <h4>${room}</h4>
        <p class="vote-${id}" data-votes="${votes}">${votes} votes</p>
        </div>
        <button data-id="${id}"><i class="fas fa-thumbs-up"></i></button>
        </li>
        `;
      })
      .join("");

    result.innerHTML = response;
  } catch (error) {
    console.log("====================================");
    console.log("ERROR IN APP.JS SURVEY");
    console.log("====================================");
    result.innerHTML = `<h4>There was an error...</h4>`;
  }
};

//? when page loads invoke the method
window.addEventListener("load", () => {
  fetchSurveyData();
});
