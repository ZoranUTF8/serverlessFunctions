const result = document.querySelector(".result");

const fetchData = async () => {
  try {
    const { data } = await axios.get("/api/2-basic-api");

    const products = data
      .map((item) => {
        const {
          image: { url: imageUrl },
          id,
          price,
          name,
        } = item;

        return `<article class="product">
            <img src=${imageUrl} alt=${name}/>
            <div class="info">
            <h5>${name}</h5>
            <h5 class="price">${price}$</h5>
            </div>
            </article>`;
      })
      .join("");

    result.innerHTML = products;
  } catch (error) {
    result.innerHTML = `THERE WAS AN ERROR`;

    console.log(error.response.status);
  }
};

window.addEventListener("load", () => {
  fetchData();
});
