import Observable from "./Observable.js";

class Navigator extends Observable {
  $data = {};
  constructor(handler = () => {}) {
    super();

    const params = new URLSearchParams(location.search);

    for (const [key, value] of params) {
      this.$data[key] = value;
    }

    this.subscribe(handler);
    this.dispatch(this);
  }

  has(key) {
    return this.$data.hasOwnProperty(key);
  }
  set(key, value) {
    //обновляем или добовляем данные в data
    if (!value) {
      return this.remove(key);
    }
    this.$data = {
      ...this.$data,
      [key]: value,
    };

    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(this.$data)) {
      params.append(key, value);
    }

    history.pushState(null, null, `?${params.toString()}`);
    this.dispatch(this);
  }
  get(key, defultValue) {
    if (this.$data.hasOwnProperty(key)) {
      return this.$data[key];
    }
    return defultValue;
  }
  remove(key) {
    if (!this.$data.hasOwnProperty(key)) {
      return;
    }

    delete this.$data[key];

    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(this.$data)) {
      params.append(key, value);
    }

    history.pushState(null, null, `?${params.toString()}`);
    this.dispatch(this);
  }
  get(key, defultValue) {
    if (this.$data.hasOwnProperty(key)) {
      return this.$data[key];
    }
    return defultValue;
  }
}

export default Navigator;
