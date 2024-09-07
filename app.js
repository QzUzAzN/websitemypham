// add
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  let name = document.querySelector("#name").value;
  let price = document.querySelector("#price").value;
  let amount = document.querySelector("#amount").value;
  let describe = document.querySelector("#describe").value;

  let item = {
    id: new Date().toISOString(),
    name: name.trim(),
    price: price.trim(),
    amount: amount.trim(),
    describe: describe,
  };

  //   add item UI
  addItemToUI(item);

  // reset field
  document.querySelector("#name").value = "";
  document.querySelector("#price").value = "";
  document.querySelector("#amount").value = "";
  document.querySelector("#describe").value = "";

  // add item to LS
  addItemToLS(item);

  updateSelectedItem(item.id);
});

//   add item UI
const addItemToUI = (item) => {
  // tạo dom ảo
  let newCard = document.createElement("div");
  newCard.classList.add("card__block");
  newCard.setAttribute("data-id", item.id);
  newCard.innerHTML = `<div class="card__block--img">
                          <img src="" alt="" />
                        </div>
                      <div class="card__block--bottom">
                          <div class="card__block--info">
                            <p class = "name">${item.name}</p>
                            <span>${item.amount}</span>
                      </div>
                      <div class="card__block--price d-flex justify-content-between">
                        <p>${item.price}</p>
                        <p>${item.price * 2}</p>
                      </div>         
                    </div>`;

  if (item.describe) {
    let imgElement = newCard.querySelector("img");
    imgElement.src = item.describe;
  }

  document.querySelector(".card-carousel").appendChild(newCard);
};

let getList = () => {
  return JSON.parse(localStorage.getItem("list")) || [];
};

// add item to LS
const addItemToLS = (item) => {
  let list = getList();

  list.push(item);

  localStorage.setItem("list", JSON.stringify(list));
};

const init = () => {
  let list = getList();

  list.forEach((item) => {
    addItemToUI(item);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  init();
});

const updateSelectedItem = (id) => {
  let list = getList();
  selectedItem = list.find((item) => item.id === id);
};

//hiện thông tin sản phẩm
document.querySelector(".card-carousel").addEventListener("click", (event) => {
  let cardElement = event.target.closest(".card__block");
  if (cardElement) {
    let id = cardElement.dataset.id;
    updateSelectedItem(id);

    if (selectedItem) {
      document.querySelector("#name").value = selectedItem.name;
      document.querySelector("#price").value = selectedItem.price;
      document.querySelector("#amount").value = selectedItem.amount;
      document.querySelector("#describe").value = selectedItem.describe;

      localStorage.setItem("selectedCard", JSON.stringify(selectedItem));
    }
  }
});

document.querySelector(".btn-remove").addEventListener("click", (event) => {
  let cardElement = document.querySelector(".card__block");
  let id = cardElement.dataset.id;
  updateSelectedItem(id);

  let isConfirmed = confirm(`Bạn có chắc là xoá: ${selectedItem.name} không?`);
  if (isConfirmed) {
    cardElement.remove();

    let idRemove = cardElement.dataset.id;

    removeItemFromLS(idRemove);
  }
});

// reset trang nhưng vẫn giữ lại info
// document.addEventListener("DOMContentLoaded", () => {
//   const storedCard = localStorage.getItem("selectedCard");
//   if (storedCard) {
//     selectedCard = JSON.parse(storedCard);

//     if (selectedCard) {
//       document.querySelector("#name").value = selectedCard.name;
//       document.querySelector("#price").value = selectedCard.price;
//       document.querySelector("#amount").value = selectedCard.amount;
//       document.querySelector("#describe").value = selectedCard.describe;
//     }
//   }
// });

const removeItemFromLS = (idRemove) => {
  let list = getList();

  list = list.filter((item) => item.id != idRemove);

  localStorage.setItem("list", JSON.stringify(list));
};
