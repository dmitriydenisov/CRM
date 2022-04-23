import EventEmitter from "./EventEmitter.js";

const ordersTableTemplate = document.querySelector(
  '[data-template="orderTable"]'
);

const ordersRowTemplate = document.querySelector('[data-template="orderRow"]');
//форматор валюты
const priceFormater = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
});

const dateFormater = new Intl.DateTimeFormat("ru-RU", {
  hour12: false,
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

class OrdersTable extends EventEmitter {
  //заказы для отображения
  $orders = [];
  //точка монтирования
  $root = null;

  constructor(root, orders) {
    super();

    this.$root = root;
    this.$orders = orders;

    this.update();
  }

  get orders() {
    return this.orders;
  }

  set orders(orders) {
    this.$orders = orders;
    this.update();
  }

  update() {
    this.$root.textContent = ""; // очищаем точку монтирования
    const ordersTable = ordersTableTemplate.content.cloneNode(true); //создаем копию шаблона
    const tbody = ordersTable.querySelector("tbody");

    //для создание строки для каждого заказа
    for (const order of this.$orders) {
      const { id, user, orderType, price, status, createAt } = order;
      const { name, surname } = user;

      const orderRow = ordersRowTemplate.content.cloneNode(true);
      orderRow.querySelector('[data-field="id"]').textContent = id;
      orderRow.querySelector(
        '[data-field="name"]'
      ).textContent = `${name} ${surname}`;
      orderRow.querySelector('[data-field="orderType"]').textContent =
        orderType;
      orderRow.querySelector('[data-field="price"]').textContent =
        priceFormater.format(price);
      orderRow
        .querySelector(`[data-badge="${status}"]`)
        .classList.remove("hidden");
      orderRow.querySelector('[data-field="createAt"]').textContent =
        dateFormater.format(new Date(createAt));

      orderRow
        .querySelector("button")
        .addEventListener("click", () => this.emit("edit", id));

      tbody.append(orderRow); //вставляем хаказы
    }
    this.$root.append(ordersTable); // монтирование в DOM-структуру
  }
}

export default OrdersTable;
