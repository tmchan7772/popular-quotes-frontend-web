import HttpClient from '../utils/httpClient';

type AboutData = { info: string };

export function getAbout() {
  return HttpClient.get<AboutData>('/info');
}