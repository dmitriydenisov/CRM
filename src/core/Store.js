const APPLICATION_KEY = "__crm_app__";

class Store {
  $orders = [];

  get orders() {
    return JSON.parse(JSON.stringify(this.$orders));
  }

  upload() {
    const json = JSON.stringify(this.$orders);
    localStorage.setItem(APPLICATION_KEY, json);
  }

  download() {
    this.$orders.slice(0);

    const json = localStorage.getItem(APPLICATION_KEY);

    if (json) {
      const nextOrders = JSON.parse(json);
      this.$orders.push(...nextOrders);
    } else {
      this.reinit();
      this.upload();
    }
  }

  save(order) {
    order.status = "nev";
    order.date = Date.now();
    order.id = Math.max(0, ...this.$orders.orders.map((x) => x.id)) + 1;
    this.$orders.orders.push(order);
    upload();
    return order.id;
  }

  reinit() {
    this.$orders.splice(0);
    this.$orders.push(
      ...[
        {
          id: 1,
          user: { name: "Алексей", surname: "Соловье" },
          orderType: "Ручка",
          price: 2408,
          status: "back",
          createdAt: "2022-04-10T17:59:00.523Z",
        },
        {
          id: 2,
          user: { name: "Василий", surname: "Вихта" },
          orderType: "Веревка",
          price: 2880,
          status: "back",
          createdAt: "2022-04-10T18:30:23.219Z",
        },
        {
          id: 3,
          user: { name: "Сергей", surname: "Соловье" },
          orderType: "Кресло",
          price: 2662,
          status: "new",
          createdAt: "2022-04-11T02:12:25.414Z",
        },
        {
          id: 4,
          user: { name: "Сергей", surname: "Соколов" },
          orderType: "Веревка",
          price: 3879,
          status: "process",
          createdAt: "2022-04-11T05:37:06.735Z",
        },
        {
          id: 5,
          user: { name: "Василий", surname: "Раков" },
          orderType: "Мыло",
          price: 2275,
          status: "back",
          createdAt: "2022-04-11T06:07:04.493Z",
        },
        {
          id: 6,
          user: { name: "Олег", surname: "Вихта" },
          orderType: "Нож",
          price: 2906,
          status: "process",
          createdAt: "2022-04-11T10:43:53.021Z",
        },
        {
          id: 7,
          user: { name: "Сергей", surname: "Саван" },
          orderType: "Тетрадка",
          price: 3688,
          status: "back",
          createdAt: "2022-04-12T05:20:20.434Z",
        },
        {
          id: 8,
          user: { name: "Олег", surname: "Раков" },
          orderType: "Нож",
          price: 4690,
          status: "new",
          createdAt: "2022-04-12T05:45:56.033Z",
        },
        {
          id: 9,
          user: { name: "Петр", surname: "Лепко" },
          orderType: "Тетрадка",
          price: 2321,
          status: "back",
          createdAt: "2022-04-12T18:02:54.742Z",
        },
        {
          id: 10,
          user: { name: "Алексей", surname: "Соловье" },
          orderType: "Тетрадка",
          price: 2326,
          status: "process",
          createdAt: "2022-04-12T19:46:49.955Z",
        },
        {
          id: 11,
          user: { name: "Сергей", surname: "Соколов" },
          orderType: "Шина",
          price: 1726,
          status: "process",
          createdAt: "2022-04-12T20:05:12.447Z",
        },
        {
          id: 12,
          user: { name: "Алексей", surname: "Раков" },
          orderType: "Сковородка",
          price: 1500,
          status: "process",
          createdAt: "2022-04-14T04:45:55.311Z",
        },
        {
          id: 13,
          user: { name: "Сергей", surname: "Лепко" },
          orderType: "Веревка",
          price: 2026,
          status: "back",
          createdAt: "2022-04-14T15:02:39.248Z",
        },
        {
          id: 14,
          user: { name: "Олег", surname: "Саван" },
          orderType: "Тетрадка",
          price: 4683,
          status: "back",
          createdAt: "2022-04-15T00:09:32.927Z",
        },
        {
          id: 15,
          user: { name: "Виктор", surname: "Лепко" },
          orderType: "Кресло",
          price: 3259,
          status: "process",
          createdAt: "2022-04-15T01:53:24.741Z",
        },
        {
          id: 16,
          user: { name: "Петр", surname: "Вихта" },
          orderType: "Веревка",
          price: 3363,
          status: "back",
          createdAt: "2022-04-15T11:44:51.000Z",
        },
        {
          id: 17,
          user: { name: "Константин", surname: "Вихта" },
          orderType: "Ноутбук",
          price: 2716,
          status: "process",
          createdAt: "2022-04-15T12:25:53.925Z",
        },
        {
          id: 18,
          user: { name: "Виктор", surname: "Мельник" },
          orderType: "Кресло",
          price: 2856,
          status: "new",
          createdAt: "2022-04-15T12:50:38.092Z",
        },
        {
          id: 19,
          user: { name: "Сергей", surname: "Мельник" },
          orderType: "Ручка",
          price: 2891,
          status: "back",
          createdAt: "2022-04-15T13:07:13.360Z",
        },
        {
          id: 20,
          user: { name: "Сергей", surname: "Лепко" },
          orderType: "Ноутбук",
          price: 2820,
          status: "back",
          createdAt: "2022-04-15T23:28:49.440Z",
        },
        {
          id: 21,
          user: { name: "Василий", surname: "Вихта" },
          orderType: "Ручка",
          price: 1026,
          status: "new",
          createdAt: "2022-04-16T05:06:05.391Z",
        },
        {
          id: 22,
          user: { name: "Виктор", surname: "Лепко" },
          orderType: "Сковородка",
          price: 1712,
          status: "new",
          createdAt: "2022-04-16T05:33:58.933Z",
        },
        {
          id: 23,
          user: { name: "Виктор", surname: "Раков" },
          orderType: "Шина",
          price: 3770,
          status: "archived",
          createdAt: "2022-04-16T12:08:29.765Z",
        },
        {
          id: 24,
          user: { name: "Олег", surname: "Соколов" },
          orderType: "Ручка",
          price: 1653,
          status: "new",
          createdAt: "2022-04-16T14:31:17.164Z",
        },
        {
          id: 25,
          user: { name: "Алексей", surname: "Соколов" },
          orderType: "Мыло",
          price: 2954,
          status: "process",
          createdAt: "2022-04-16T15:19:17.979Z",
        },
        {
          id: 26,
          user: { name: "Василий", surname: "Вихта" },
          orderType: "Веревка",
          price: 4807,
          status: "archived",
          createdAt: "2022-04-16T22:04:25.310Z",
        },
        {
          id: 27,
          user: { name: "Олег", surname: "Саван" },
          orderType: "Сковородка",
          price: 1519,
          status: "new",
          createdAt: "2022-04-16T22:37:51.796Z",
        },
        {
          id: 28,
          user: { name: "Виктор", surname: "Мельник" },
          orderType: "Кресло",
          price: 1512,
          status: "archived",
          createdAt: "2022-04-17T02:15:37.657Z",
        },
        {
          id: 29,
          user: { name: "Олег", surname: "Саван" },
          orderType: "Ручка",
          price: 1149,
          status: "archived",
          createdAt: "2022-04-17T03:10:12.255Z",
        },
        {
          id: 30,
          user: { name: "Алексей", surname: "Соловье" },
          orderType: "Ручка",
          price: 4384,
          status: "new",
          createdAt: "2022-04-17T05:00:17.212Z",
        },
      ]
    );
  }
}

export default Store;
