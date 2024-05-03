class LocalStorage {
  private store: any;
  private KEY = 'pyxisLocalStorageDb';
  private static instance: LocalStorage;
  private constructor() {
    this.store = localStorage;
  }

  static getInstance = () => {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new LocalStorage();
    return this.instance;
  };

  getItems = () => {
    return JSON.parse(this.store.getItem(this.KEY));
  };

  setItems = (value: null) => {
    this.store.setItem(this.KEY, JSON.stringify({ user: value }));
  };

  clearItems = () => this.store.removeItem(this.KEY);
}

export const storage = LocalStorage.getInstance();
