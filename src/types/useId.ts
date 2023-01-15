export interface IUserId {
  userId: string | null;
  addUserId: (id: string) => void;
  removeUserId: () => void;
}
