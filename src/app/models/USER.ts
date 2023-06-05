export interface IUser {
  id: string;
  username: string;
  password: string;
  firstName: string;
  secondName: string;
  roles: string[];
  workBorders: IWorkBorder[];
}
export interface IWorkBorder {
  id: string;
  name: string;
}
