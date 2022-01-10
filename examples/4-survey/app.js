const title = document.querySelector(".title h2");
const result = document.querySelector(".result");

const fetchSurveyData = async () => {
  try {
    const {
      data
    } = await axios.get("/api/4-survey");
    const response = data
      .map((vote) => {
        const {
          id,
          room,
          votes
        } = vote;

        return `
        <li>
        <div class="key">
        ${room.toUpperCase().substring(0, 2)}
        </div>
        <div>
        <h4>${room}</h4>
        <p class="vote-${id}" data-votes="${votes}">${votes} votes</p>
        </div>
        <button ><i data-id="${id}" class="fas fa-thumbs-up"></i></button>
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

//? if click on button grab the parent id
result.addEventListener("click", async function (e) {

  if (e.target.classList.contains("fa-thumbs-up")) {
    const id = e.target.dataset.id

    //* get the number of votes from specific vote paragraph
    const voteNode = result.querySelector(`.vote-${id}`);
    const votes = voteNode.dataset.votes;

    //* Change vote count
    const newVotes = await modifyData(id, votes);

    title.textContent = "Survey"
    if (newVotes) {
      //* update vote
      voteNode.textContent = `${newVotes} votes`;
      voteNode.dataset.votes = newVotes;
    }

  }
});

async function modifyData(id, votes) {
  title.textContent = "Updating vote count..."
  try {
    const {
      data
    } = await axios.put(`/api/4-survey`, {
      id,
      votes
    })
    const newVotes = data.fields.votes;
    return newVotes;
  } catch (error) {
    console.log(error.response);
    return null;
  }
}