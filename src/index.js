import Store from "./core/Store.js";
import Observable from "./core/Observable.js";
import EventEmitter from "./core/EventEmitter.js";

const store = new Store();
store.download();

// const ob = new Observable();

// ob.subscribe((a) => console.log("subscribe fierd 1", a));
// ob.subscribe((a) => console.log("subscribe fierd 2", a));

// ob.dispatch(2);

const ee = new EventEmitter();

ee.addEventListener("event1", (data) => console.log("event1", data));
ee.addEventListener("event2", (data) => console.log("event2", data));

ee.emit("event2", { name: "Dmitriy" });
