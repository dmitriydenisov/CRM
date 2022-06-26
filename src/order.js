import Store from "./core/Store.js";

class Order {
  order = {
    fullname: null,
    good: null,
    price: null,
  };

  add() {
    document.querySelector("[data-save]").addEventListener("click", () => {
      console.log("test");
      order = {
        fullname: document.querySelector("[data-name]".value),
        good: document.querySelector("[data-order-good]".value),
        price: Number(document.querySelector("[data-order-price]".value)),
      };
      const orderId = Store.save(order);
      location.href = "index.html";
    });
  }

  save(order) {}
}
Order.add;
export default Order;
