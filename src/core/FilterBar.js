import Observable from "./Observable.js";

class FilterBar extends Observable {
  $nameInput = null;
  $orderTypeSelect = null;
  $statusSelect = null;
  $minPrice = null;
  $maxPrice = null;
  $minDay = null;
  $maxDay = null;

  constructor(data) {
    super();

    this.$nameInput = document.querySelector("[data-field='name']");
    this.$orderTypeSelect = document.querySelector("[data-field='orderType']");
    this.$statusSelect = document.querySelector("[data-field='status']");

    this.$minPrice = document.querySelector("[data-field='minPrice']");
    this.$maxPrice = document.querySelector("[data-field='maxPrice']");

    this.$minDay = document.querySelector("[data-field='minDay']");
    this.$maxDay = document.querySelector("[data-field='maxDay']");

    this.$minDay.value.toLocaleString("ru-RU");

    this.$nameInput.addEventListener("input", this.applay);
    this.$orderTypeSelect.addEventListener("change", this.applay);
    this.$statusSelect.addEventListener("change", this.applay);

    this.$minPrice.addEventListener("input", this.applay);
    this.$maxPrice.addEventListener("input", this.applay);

    this.$minDay.addEventListener("input", this.applay);
    this.$maxDay.addEventListener("input", this.applay);

    if (data.orderTypes) {
      this.$orderTypeSelect.textContent = null;

      const option = document.createElement("option");
      option.value = "";
      option.textContent = "";
      this.$orderTypeSelect.append(option);

      for (const orderType of data.orderTypes) {
        const option = document.createElement("option");
        option.value = orderType;
        option.textContent = orderType;
        this.$orderTypeSelect.append(option);
      }
    }
  }

  applay = () =>
    this.dispatch({
      fName: this.$nameInput.value,
      fOrderType: this.$orderTypeSelect.value,
      fStatus: this.$statusSelect.value,
      fMinPrice: this.$minPrice.value,
      fMaxPrice: this.$maxPrice.value,
      fMinDay: this.$minDay.value,
      fMaxDay: this.$maxDay.value,
    });
}

export default FilterBar;
