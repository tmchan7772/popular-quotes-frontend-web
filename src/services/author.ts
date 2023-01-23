import HttpClient from '../utils/httpClient';

type AuthorData = { authorId: number, name: string };

export type QuoteData = { quoteId: number, authorId: number, quote: string };

export function getAuthor(abortController?: AbortController) {
  return HttpClient.get<AuthorData>('/author', abortController ? { signal: abortController.signal } : undefined);
}

export function getAuthorCancelable() {
  return HttpClient.getCancelable<AuthorData>('/author');
}

export function getAuthorQuote(authorId: number, abortController?: AbortController) {
  return HttpClient.get<QuoteData>(`/quote?authorId=${authorId}`, abortController ? { signal: abortController.signal } : undefined);
}

export function getAuthorQuoteCancelable(authorId: number) {
  return HttpClient.getCancelable<QuoteData>(`/quote?authorId=${authorId}`);
}