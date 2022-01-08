const result = document.querySelector(".result");

const fetchSingleProduct = async () => {
  result.innerHTML = "<h2>Loading...</h2>";

  try {
    const productId = window.location.search;

    const {
      data: { fields },
    } = await axios.get(`/api/3-complete-airtable${productId}`);

    const { name, description, price, image } = fields;

    result.innerHTML = `
        <h1 class="title">${name}</h1>
  <article class="product">
    <img class="product-img"
    src=${image[0].url}
    alt=${name}
    />
    <div class="product-info">
      <h5 class="title">${name}</h5>
      <h5 class="price">${price} $</h5>
      <p class="desc">${description}</p>
    </div>
  </article>`;
  } catch (error) {
    result.innerHTML = `<h2>${error.response}</h2>`;
  }
};

window.addEventListener("load", () => {
  fetchSingleProduct();
});
