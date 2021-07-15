export class LocalStorage<TData> {
  constructor(private initialData: TData, private key = "dxz") {}

  load(): TData {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : this.initialData;
  }

  save(data: TData) {
    const oldData = this.load();
    const updatedData = {
      ...oldData,
      ...data,
    };
    localStorage.setItem(this.key, JSON.stringify(updatedData));
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}
