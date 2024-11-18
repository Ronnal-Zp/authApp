export interface LoginResponse {
  user:  User;
  token: string;
}

export interface User {
  id:       string;
  email:    string;
  name:     string;
  isActive: boolean;
  roles:    string[];
  v?:        number;
}
