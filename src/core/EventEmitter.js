class EventEmitter {
  handlers = new Map();

  addEventListener(key, handler) {
    if (!this.handlers.has(key)) {
      this.handlers.set(key, new Set());
    }

    this.handlers.get(key).add(handler);
  }

  removeEventListener(key, handler) {
    if (this.handlers.has(key)) {
      const handlers = this.handlers.get(key);
      handlers.delete(handler);

      if (!handlers.size) {
        this.handler.delete(key);
      }
    }
  }

  on(...args) {
    return this.addEventListener(...args);
  }
  off(...args) {
    return this.removeEventListener(...args);
  }

  emit(key, ...data) {
    if (this.handlers.has(key)) {
      for (const handler of this.handlers.get(key)) {
        handler(...data);
      }
    }
  }
}

export default EventEmitter;
