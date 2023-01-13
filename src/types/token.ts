export interface IToken {
  token: string | undefined;
  addToken: (getToken: string) => void;
  removeToken: () => void;
}
