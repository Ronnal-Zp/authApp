import { User } from "./login-response.interface";

export interface CheckTokenResponse {
  user:  User;
  token: string;
}

