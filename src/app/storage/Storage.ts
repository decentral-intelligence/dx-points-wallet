export interface Storage<TData> {
  load(): Promise<TData> | TData;
  save(data: TData): Promise<void> | void;
  clear(): Promise<void> | void;
}
