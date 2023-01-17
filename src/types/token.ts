export interface IToken {
  token: string;
  addToken: (getToken: string) => void;
  removeToken: () => void;
}
