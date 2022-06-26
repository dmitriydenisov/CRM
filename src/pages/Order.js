import Store from "../core/Store.js";

class Order {
  constructor() {
    const order = {
      fullname: null,
      good: null,
      price: null,
    };

    add();
    save(order);

    function add() {
      document.querySelector("[data-save]").addEventListener("click", () => {
        console.log("done");
        order = {
          fullname: document.querySelector("[data-name]".value),
          good: document.querySelector("[data-order-good]".value),
          price: Number(document.querySelector("[data-order-price]".value)),
        };
      });

      const orderId = Store.createOrder(order);
      location.href = "index.html";
    }
  }
}

export default Order;
