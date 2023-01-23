import HttpClient from '../utils/httpClient';

type LoginRequest = { email: string, password: string };
type LoginResponse = { token: string };

export function login(payload: LoginRequest) {
  return HttpClient.post<LoginRequest, LoginResponse>('/login', payload);
}

export function logout() {
  return HttpClient.delete('/logout');
}