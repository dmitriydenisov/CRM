import Store from "./core/Store.js";
import OrdersTable from "./core/OrdersTable.js";
import Paginator from "./core/Paginator.js";
import Navigator from "./core/Navigator.js";

const store = new Store();
store.download();

console.log(store);

const ordersTable = new OrdersTable(
  document.querySelector('[data-mount="ordersTable"]'),
  store.orders.slice(0, 5) //отобразить первые 5 заказов
);

ordersTable.on("edit", (orderId) => console.log({ orderId }));

const paginator = new Paginator(
  document.querySelector('[data-mount="pagination"]'),
  Math.ceil(store.orders.length / 5),
  5
);

paginator.on("move", (nextPage) => {
  // paginator.page = nextPage;
  // ot.orders = store.orders.slice((nextPage - 1) * 5, nextPage * 5);
  navigator.set("page", nextPage);
});

const navigator = new Navigator((navigator) => {
  const page = parseInt(navigator.get("page", 1), 10);
  paginator.page = page;
  ordersTable.orders = store.orders.slice((page - 1) * 5, page * 5);
});
