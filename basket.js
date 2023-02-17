"use strict";

const basketCounterEl = document.querySelector(".cartIconWrap span");
const basketTotalValueEl = document.querySelector(".basketTotalValue");
const basketTotalEl = document.querySelector(".basketTotal");
const basketEl = document.querySelector(".basket");

document.querySelector(".cartIconWrap").addEventListener("click", () => {
  basketEl.classList.toggle("hidden");
});

const basket = {};

// Как будут выглядеть товары в корзине
// const basket = {
//   1: {
//     id: 1,
//     name: 'name',
//     price: 10,
//     count: 1
//   }
// }

document.querySelector(".featuredItems").addEventListener("click", (e) => {
  // проверяет, подходит ли элемент или его родитель под условие
  if (!e.target.closest(".addToCart")) {
    return;
  }
  const featuredItem = e.target.closest(".featuredItem");
  const id = +featuredItem.dataset.id;
  const name = featuredItem.dataset.name;
  const price = +featuredItem.dataset.price;
  // console.log(id, name, price);
  addToCart(id, name, price);
});

function addToCart(id, name, price) {
  if (!(id in basket)) {
    basket[id] = {
      id: id,
      name: name,
      price: price,
      count: 0,
    };
  }
  basket[id].count++;
  // кружок с общим кол-вом товаров
  basketCounterEl.textContent = getTotalBasketCount().toString();
  // внутри корзины общая стоимость товаров
  basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
  renderProductInBasket(id);
}

function getTotalBasketCount() {
  return Object.values(basket).reduce((acc, prod) => acc + prod.count, 0);
  // const productsArr = Object.values(basket);
  // let count = 0;
  // for (const product of productsArr) {
  //   count += product.count;
  // }
  // return count;
}
function getTotalBasketPrice() {
  return Object.values(basket).reduce(
    (acc, prod) => acc + prod.count * prod.price,
    0
  );
}

function renderProductInBasket(id) {
  const basketRowEl = basketEl.querySelector(
    `.basketRow[data-productId="${id}"]`
  );
  if (!basketRowEl) {
    renderNewProductInBasket(id);
    return;
  }
  basketRowEl.querySelector(".productCount").textContent = basket[id].count;
  basketRowEl.querySelector(".productTotalRow").textContent =
    basket[id].count * basket[id].price;
}

function renderNewProductInBasket(productId) {
  const productRow = `
    <div class='basketRow' data-productId='${productId}'>
      <div>${basket[productId].name}</div>
      <div>
        <span class='productCount'>${basket[productId].count}</span> шт.
      </div>
      <div> $${basket[productId].price}</div>
      <div>
        $<span class='productTotalRow'>${
          basket[productId].price * basket[productId].count
        }</span>
      </div>
    </div>`;
  basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}
