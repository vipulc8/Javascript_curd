// selection all elements
const cardArea = document.getElementById("card-area");
//selecting form input
const productIdInput = document.getElementById("productId");
const productNameInput = document.getElementById("productName");
const productImgInput = document.getElementById("productImg");
const productPriceInput = document.getElementById("productPrice");
const productDescInput = document.getElementById("productDesc");
// Filtering elements
const filterValue = document.getElementById("filter-info");
const sortValue = document.getElementById("sort-info");
const searchInput = document.getElementById("search-product");

// All variable Created
let objLength,
  curCardId,
  searchStat = false;

//get data from localstorage
let productObj = JSON.parse(localStorage.getItem("productObj"));

//Checking Data present or not in localstorage
if (productObj != null) {
  objLength = Object.keys(productObj).length;
}
//Display Data on main page
if (productObj == null || objLength == 0) {
  cardArea.classList.add("justify-content-center");
  emptyProduct();
} else {
  cardArea.classList.add("justify-content-start");
  cardArea.classList.remove("justify-content-center");
  addNewCard(productObj);
}

//Get data Function
function getData(id) {
  productIdInput.value = productObj[id]["id"];
  productNameInput.value = productObj[id]["name"];
  productImgInput.value = productObj[id]["img"];
  productPriceInput.value = productObj[id]["price"];
  productDescInput.value = productObj[id]["desc"];
  console.log(productObj[id], productObj[id]["name"]);
}

//Update Data Function
function updateData() {
  let newId = productIdInput.value;
  productObj[newId]["name"] = productNameInput.value;
  productObj[newId]["img"] = productImgInput.value;
  productObj[newId]["price"] = productPriceInput.value;
  productObj[newId]["desc"] = productDescInput.value;
  console.log("before update data:", productObj);
  console.log("after update data:", productObj);
  localStorage.setItem("productObj", JSON.stringify(productObj));
  location.reload();
}

//delete Data Function
function deleteData(id) {
  let ans = prompt(
    `Are you sure to Delete ${id}? Note: type Y for Yes and N for No`
  );
  console.log(ans);

  if (ans == "Y") {
    delete productObj[id];
    localStorage.setItem("productObj", JSON.stringify(productObj));
    location.reload();
  } else {
    return;
  }
}

// EmptyProduct Svg
function emptyProduct() {
  cardArea.innerHTML = `<div class="Empty-area">
  <div class="row">
    <div class="col text-center">
    <p class="fw-bold" >There is no Product in Inventory !</p>
      <img src="./Images/empty.png" alt="" class="img-fluid" />
    </div>
  </div>
</div>`;
}

//Data new data in Main screen
function addNewCard(productObj) {
  for (let i in productObj) {
    const newCard = `<div class="card m-3" id="${productObj[i]["id"]}">
    <p class="mx-2">#${productObj[i]["id"]}</p>
    <img
      src="${productObj[i]["img"]}"
      class="card-img-top"
      alt="${productObj[i]["name"]}"
      height="200px"
    />
    <div class="card-body">
      <h5 class="card-title fs-4">${productObj[i]["name"]}</h5>
      <hr/>
      <p class="card-text">
      <b>Description:</b>
      ${productObj[i]["desc"]}
      </p>
      <hr/>
      <p class="card-text">
      <b>Price (₹):</b>
      ${productObj[i]["price"]}
    </p>
      <div class="card-btn">
        <button onclick="getData(${productObj[i]["id"]})";
          href="#"
          id="edit-btn"
          class="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#editmodal"
          >Edit</button
        >
        <button href="#" id="del-btn" class="btn btn-danger" onclick="deleteData(${productObj[i]["id"]})">Delete</button>
      </div>
    </div>
  </div>`;
    cardArea.insertAdjacentHTML("beforeend", newCard);
  }
}

//Eventlistener for Filter elements

filterValue.addEventListener("change", () => {
  filterData(filterValue.value, sortValue.value, productArray);
  if (searchInput.value) {
    return;
  } else if (searchInput.value == "") {
    console.log("black");
    productArray = [];
    resetProduct();
    filterData(filterValue.value, sortValue.value, productArray);
  }
});
sortValue.addEventListener("change", () => {
  filterData(filterValue.value, sortValue.value, productArray);
  if (searchInput.value) {
    return;
  } else if (searchInput.value == "") {
    console.log("black");
    productArray = [];
    resetProduct();
    filterData(filterValue.value, sortValue.value, productArray);
  }
});

//All keys in Product Object
let keys = Object.keys(productObj);

let productArray = [];
resetProduct();

//Filtering data based on Condition.
function filterData(filterValue, sortValue, productIn) {
  if (filterValue == "id" && sortValue == "asc") {
    console.log("output");
    if (productObj == null || objLength == 0) {
      cardArea.classList.add("justify-content-center");
      emptyProduct();
    } else {
      cardArea.classList.add("justify-content-start");
      cardArea.classList.remove("justify-content-center");
      let curlist = sortData(filterValue, productIn);
      console.log("in asc", curlist);
      cardArea.innerHTML = "";
      addNewCard(curlist);
    }
  } else if (filterValue == "id" && sortValue == "des") {
    console.log("output 2");
    if (productObj == null || objLength == 0) {
      cardArea.classList.add("justify-content-center");
      emptyProduct();
    } else {
      cardArea.classList.add("justify-content-start");
      cardArea.classList.remove("justify-content-center");
      let curlist = sortData(filterValue, productIn);
      console.log("in des", curlist);
      cardArea.innerHTML = "";
      addNewCard(curlist.reverse());
    }
  } else if (filterValue == "name" && sortValue == "asc") {
    if (productObj == null || objLength == 0) {
      cardArea.classList.add("justify-content-center");
      emptyProduct();
    } else {
      cardArea.classList.add("justify-content-start");
      cardArea.classList.remove("justify-content-center");
      let curlist = sortData(filterValue, productIn);
      cardArea.innerHTML = "";
      addNewCard(curlist);
    }
  } else if (filterValue == "name" && sortValue == "des") {
    if (productObj == null || objLength == 0) {
      cardArea.classList.add("justify-content-center");
      emptyProduct();
    } else {
      cardArea.classList.add("justify-content-start");
      cardArea.classList.remove("justify-content-center");
      let curlist = sortData(filterValue, productIn);
      cardArea.innerHTML = "";
      addNewCard(curlist.reverse());
    }
  } else if (filterValue == "price" && sortValue == "asc") {
    if (productObj == null || objLength == 0) {
      cardArea.classList.add("justify-content-center");
      emptyProduct();
    } else {
      cardArea.classList.add("justify-content-start");
      cardArea.classList.remove("justify-content-center");
      let curlist = sortData(filterValue, productIn);
      cardArea.innerHTML = "";
      addNewCard(curlist);
    }
  } else if (filterValue == "price" && sortValue == "des") {
    if (productObj == null || objLength == 0) {
      cardArea.classList.add("justify-content-center");
      emptyProduct();
    } else {
      cardArea.classList.add("justify-content-start");
      cardArea.classList.remove("justify-content-center");
      let curlist = sortData(filterValue, productIn);
      cardArea.innerHTML = "";
      addNewCard(curlist.reverse());
    }
  }
}
//To reset Product array
function resetProduct() {
  for (i in productObj) {
    productArray.push(productObj[i]);
  }
}

//Sorting function
function sortData(sortBy, productIn = productArray) {
  if (sortBy == "price" || sortBy == "id") {
    let ans = productArray.sort((a, b) => {
      if (parseFloat(a[sortBy]) < parseFloat(b[sortBy])) {
        return -1;
      }
      if (parseFloat(a[sortBy]) > parseFloat(b[sortBy])) {
        return 1;
      }
      return 0;
    });
    return ans;
  } else {
    let ans = productIn.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }
      if (a[sortBy] > b[sortBy]) {
        return 1;
      }
      return 0;
    });
    return ans;
  }
}

let count1 = 0,
  count2 = 0;

//Search Function
function searchValue() {
  console.log("count2:", ++count2);
  let toSearch = searchInput.value,
    searchArray = [];
  console.log("search value:");
  for (i in productArray) {
    if (productArray[i]["name"].includes(toSearch)) {
      searchArray.push(productArray[i]);
    }
  }
  let l = Object.keys(searchArray).length;
  if (searchInput.value == "") {
    productArray = [];
    resetProduct();
    cardArea.innerHTML = "";
    addNewCard(productArray);
  }
  if (l == 0) {
    cardArea.innerHTML = `<div class="Empty-area">
  <div class="row">
    <div class="col text-center">
    <p class="fw-bold" >Product Not Found !</p>
      <img src="./Images/notfound.png" alt="" class="img-fluid" />
    </div>
  </div>
</div>`;

    cardArea.classList.add("justify-content-center");
  } else {
    cardArea.classList.add("justify-content-start");
    cardArea.classList.remove("justify-content-center");
    productArray = searchArray;
    filterData(filterValue.value, sortValue.value, productArray);
    productArray = [];
    resetProduct();
  }
}

let timer;
//Debounce for Search operation.
let goSearch = function (fn, d) {
  console.log("count1:", ++count1);
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, d);
  };
};

searchInput.addEventListener("keyup", () => {
  if (searchInput.value == "") {
    productArray = [];
    resetProduct();
    cardArea.innerHTML = "";
    addNewCard(productArray);
  } else {
    let optimizedSearch = goSearch(searchValue, 300);
    optimizedSearch();
  }
});

function deleteProductAll() {
  let ans = prompt(
    "Do you Want to Delete All Product? Enter Y for Yes and N for No."
  );
  if (ans == "Y") {
    localStorage.setItem("productObj", JSON.stringify({}));
    location.reload();
  }
}
