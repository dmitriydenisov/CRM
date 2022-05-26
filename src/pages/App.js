import Store from "../core/Store.js";
import OrdersTable from "../core/OrdersTable.js";
import Paginator from "../core/Paginator.js";
import Navigator from "../core/Navigator.js";
import FilterBar from "../core/filterBar.js";

class App {
  $store = new Store();
  $paginator = new Paginator(
    document.querySelector('[data-mount="pagination"]'),
    Math.ceil(this.$store.orders.length / 5),
    2
  );
  $ordersTable = new OrdersTable(
    document.querySelector('[data-mount="ordersTable"]'),
    this.$store.orders.slice(0, 5) //отобразить первые 5 заказов
  );
  $filterBar = new FilterBar({
    orderTypes:
      "Сковородка Ручка Тетрадка Веревка Мыло Кресло Шина Ноутбук Нож".split(
        " "
      ),
  });
  $navigator = new Navigator();

  constructor() {
    this.$store.download();

    this.$ordersTable.on(
      "edit",
      (orderId) => (location = `editor.html?orderId=${orderId}`)
    );

    this.$paginator.on("move", (nextPage) => {
      this.$navigator.set("page", nextPage);
    });

    this.$navigator.subscribe(this.navigatorHandler);
    this.$navigator.dispatch(this.$navigator);
    this.$filterBar.subscribe(this.filterbarHandler);

    const actionElements = document.querySelectorAll("[data-action]");
    for (const actionElement of actionElements) {
      actionElement.addEventListener("click", (e) => {
        e.preventDefault();

        let { action, field, value } = actionElement.dataset;

        if (action === "filter") {
          field = `f${field[0].toUpperCase()}${field.slice(1)}`;
          this.$navigator.set(field, value);
        }
      });
    }
  }

  filterbarHandler = (filterData) => {
    for (const [key, value] of Object.entries(filterData)) {
      if (value) {
        this.$navigator.set(key, value);
      } else {
        this.$navigator.remove(key);
      }
    }
  };

  navigatorHandler = (navigator) => {
    const page = parseInt(navigator.get("page", 1), 10);

    let orders = this.$store.orders;

    if (navigator.has("fName")) {
      const fName = navigator.get("fName");
      orders = orders.filter(
        (order) =>
          order.user.name.toLowerCase().includes(fName.toLowerCase()) ||
          order.user.surname.toLowerCase().includes(fName.toLowerCase())
      );

      this.$filterBar.$nameInput.value = fName;
    }

    if (navigator.has("fStatus")) {
      const fStatus = navigator.get("fStatus");
      orders = orders.filter((order) => order.status === fStatus);

      this.$filterBar.$statusSelect.value = fStatus;
    }

    if (navigator.has("fOrderType")) {
      const fOrderType = navigator.get("fOrderType");
      orders = orders.filter((order) => order.orderType === fOrderType);

      this.$filterBar.$orderTypeSelect.value = fOrderType;
    }

    if (navigator.has("fMinPrice")) {
      const fMinPrice = Number(navigator.get("fMinPrice"));
      orders = orders.filter((order) => order.price >= fMinPrice);
      this.$filterBar.$minPrice.value = fMinPrice;
    }
    if (navigator.has("fMaxPrice")) {
      const fMaxPrice = Number(navigator.get("fMaxPrice"));
      orders = orders.filter((order) => order.price <= fMaxPrice);
      this.$filterBar.$maxPrice.value = fMaxPrice;
    }

    this.$paginator.pages = Math.ceil(orders.length / 5);
    this.$paginator.page = Math.min(page, this.$paginator.pages);
    this.$ordersTable.orders = orders.slice(
      (this.$paginator.page - 1) * 5,
      this.$paginator.page * 5
    );
  };
}

export default App;
