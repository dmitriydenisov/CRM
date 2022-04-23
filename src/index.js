import Store from "./core/Store.js";
import OrdersTable from "./core/OrdersTable.js";

const store = new Store();
store.download();

console.log(store);

const ot = new OrdersTable(
  document.querySelector('[data-mount="ordersTable"]'),
  store.orders.slice(0, 5) //отобразить первые 5 заказов
);

ot.on("edit", (orderId) => console.log({ orderId }));
