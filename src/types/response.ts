export interface IResponse<T> {
  data?: T;
  fetchData: () => Promise<void>;
}
