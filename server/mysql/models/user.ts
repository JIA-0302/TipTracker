export default interface IUser {
  user_id?: number;
  name: string;
  email: string;
  timezone: string;
  email_verified?: boolean;
  image?: string;
}
