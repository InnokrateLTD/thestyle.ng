export interface SignUpResponse {
  email: string;
}

interface Token {
  access_token: string;
  refresh_token: string;
}

interface StylengUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  date_joined: string;
  must_change_password: boolean;
  role: string;
  profile_photo: string | null;
}

export interface LoginResponse {
  token: Token;
  user: StylengUser;
}

export interface AuthProviderResponse {
   authorization_url: string
   state: string
}