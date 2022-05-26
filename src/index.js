import Store from "./core/Store.js";
import OrdersTable from "./core/OrdersTable.js";
import Paginator from "./core/Paginator.js";
import Navigator from "./core/Navigator.js";
import FilterBar from "./core/filterBar.js";

const store = new Store();
store.download();

const ordersTable = new OrdersTable(
  document.querySelector('[data-mount="ordersTable"]'),
  store.orders.slice(0, 5) //отобразить первые 5 заказов
);

ordersTable.on("edit", (orderId) => console.log({ orderId }));

const paginator = new Paginator(
  document.querySelector('[data-mount="pagination"]'),
  Math.ceil(store.orders.length / 5),
  2
);

paginator.on("move", (nextPage) => {
  navigator.set("page", nextPage);
});

const filterBar = new FilterBar({
  orderTypes:
    "Сковородка Ручка Тетрадка Веревка Мыло Кресло Шина Ноутбук Нож".split(" "),
});

const navigator = new Navigator((navigator) => {
  const page = parseInt(navigator.get("page", 1), 10);

  let orders = store.orders;

  if (navigator.has("fName")) {
    const fName = navigator.get("fName");
    orders = orders.filter(
      (order) =>
        order.user.name.toLowerCase().includes(fName.toLowerCase()) ||
        order.user.surname.toLowerCase().includes(fName.toLowerCase())
    );

    filterBar.$nameInput.value = fName;
  }

  if (navigator.has("fStatus")) {
    const fStatus = navigator.get("fStatus");
    orders = orders.filter((order) => order.status === fStatus);

    filterBar.$statusSelect.value = fStatus;
  }

  if (navigator.has("fOrderType")) {
    const fOrderType = navigator.get("fOrderType");
    orders = orders.filter((order) => order.orderType === fOrderType);

    filterBar.$orderTypeSelect.value = fOrderType;
  }
  if (navigator.has("fMinPrice")) {
    const fMinPrice = Number(navigator.get("fMinPrice"));
    orders = orders.filter((order) => order.price >= fMinPrice);
    filterBar.$minPrice.value = fMinPrice;
  }
  if (navigator.has("fMaxPrice")) {
    const fMaxPrice = Number(navigator.get("fMaxPrice"));
    orders = orders.filter((order) => order.price <= fMaxPrice);
    filterBar.$maxPrice.value = fMaxPrice;
  }

  paginator.pages = Math.ceil(orders.length / 5);
  paginator.page = Math.min(page, paginator.pages);
  ordersTable.orders = orders.slice(
    (paginator.page - 1) * 5,
    paginator.page * 5
  );
});

filterBar.subscribe((filterData) => {
  for (const [key, value] of Object.entries(filterData)) {
    if (value) {
      navigator.set(key, value);
    } else {
      navigator.remove(key, value);
    }
  }
});
