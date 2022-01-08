const result = document.querySelector(".result");

const fetchData = async () => {
  try {
    const { data } = await axios.get("/api/3-complete-airtable");

    const allProducts = data
      .map((product) => {
        const { id, name, price, url: imageUrl } = product;

    
        return`<a href="product.html?id=${id}" class="product">
        <img src=${imageUrl} alt=${name}/>
        <div class="info">
        <h5>${name}</h5>
        <h5>${price} $</h5>
        </div>
      </a>`;
      })
      .join("");
    result.innerHTML = allProducts;
  } catch (error) {
    result.innerHTML = "<h4>Error getting data ( 3-airtable.app.js) </h4>";
  }
};

window.addEventListener("load", () => {
  fetchData();
});