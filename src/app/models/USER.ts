export interface IUser {
  id: string,
  username: string,
  password: string,
  firstName: string,
  secondName: string,
  roles: string[],
  workBorders: object[],
}
export interface IWorkBorder {
  id: string;
  name: string;
}
