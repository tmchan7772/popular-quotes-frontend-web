import HttpClient from '../utils/httpClient';

type ProfileData = { id: number, fullname: string, email: string; };

export function getCurrentProfile() {
  return HttpClient.get<ProfileData>('/profile');
}