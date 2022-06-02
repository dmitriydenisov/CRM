import Store from "./core/Store.js";

class Order {
  orders = {
    fullname: null,
    good: null,
    price: null,
  };

  add() {
    document.querySelector("[data-save]").addEventListener("click", () => {
      orders = {
        fullname: document.querySelector("[data-name]".value),
        good: document.querySelector("[data-order-good]".value),
        price: Number(document.querySelector("[data-order-price]".value)),
      };
      console.log(orders);
    });

    const orderId = Store.createOrder(order);
    location.href = "index.html";
  }
}

export default Order;
