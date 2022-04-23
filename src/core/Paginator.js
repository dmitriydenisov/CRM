import EventEmitter from "./EventEmitter.js";

class Paginator extends EventEmitter {
  $root = null;
  $pages = 1;
  $pege = 1;

  constructor(root, pages, page) {
    super();

    this.$root = root;
    this.$pages = pages;
    this.$page = page;

    this.update();
  }

  get pages() {
    return this.$pages;
  }

  set pages(pages) {
    this.$pages = pages;
    this.update();
  }

  get page() {
    return this.$page;
  }

  set page(page) {
    this.$page = page;
    this.update();
  }

  update() {
    this.$root.textContent = "";

    const nav = document.createElement("nav");
    this.$root.append(nav);

    const ul = document.createElement("ul");
    nav.append(ul);
    ul.className = "pagination justify-content-center";

    const backLi = document.createElement("li");
    ul.append(backLi);
    backLi.classList.add("page-item");

    const backA = document.createElement("a");
    backLi.append(backA);
    backA.textContent = "Назад";
    backA.className = "page-link";
    backA.href = "#";

    backA.addEventListener("click", (e) => {
      e.preventDefault();
      this.emit("move", this.$page - 1);
    });

    if (this.$page === 1) {
      backLi.classList.add("disabled");
    }

    for (let i = 1; i <= this.$pages; i++) {
      const li = document.createElement("li");
      ul.append(li);
      li.classList.add("page-item");
      const a = document.createElement("a");
      li.append(a);
      a.classList.add("page-link");
      a.href = "#";
      a.textContent = i;

      a.addEventListener("click", (e) => {
        e.preventDefault();
        this.emit("move", i);
      });

      if (i === this.$page) {
        li.classList.add("active");
      }
    }

    const nextLi = document.createElement("li");
    ul.append(nextLi);
    nextLi.classList.add("page-item");

    const nextA = document.createElement("a");
    nextLi.append(nextA);
    nextA.textContent = "Вперед";
    nextA.classList.add("page-link");
    nextA.href = "#";

    nextA.addEventListener("click", (e) => {
      e.preventDefault();
      this.emit("move", this.$page + 1);
    });

    if (this.$page === this.$pages) {
      nextLi.classList.add("disabled");
    }
  }
}

export default Paginator;
