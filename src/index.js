import Store from "./core/Store.js";
import OrdersTable from "./core/OrdersTable.js";
import Paginator from "./core/Paginator.js";

const store = new Store();
store.download();

console.log(store);

const ot = new OrdersTable(
  document.querySelector('[data-mount="ordersTable"]'),
  store.orders.slice(0, 5) //отобразить первые 5 заказов
);

ot.on("edit", (orderId) => console.log({ orderId }));

const paginator = new Paginator(
  document.querySelector('[data-mount="pagination"]'),
  Math.ceil(store.orders.length / 5),
  5
);

paginator.on("move", (nextPage) => {
  paginator.page = nextPage;
  ot.orders = store.orders.slice((nextPage - 1) * 5, nextPage * 5);
});
