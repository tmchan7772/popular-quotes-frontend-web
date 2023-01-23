import HttpClient, { HttpResponse, PromiseCancelable } from '../utils/httpClient';

type AuthorData = { authorId: number, name: string };
export type AuthorQuoteData = { quoteId: number, authorId: number, quote: string, authorName: string };

export type QuoteData = { quoteId: number, authorId: number, quote: string };

export function getAuthorCancelable() {
  return HttpClient.getCancelable<AuthorData>('/author');
}

export function getAuthorQuoteCancelable(authorPromise: Promise<HttpResponse<AuthorData>>) {
  const abortController = new AbortController();
  const req = authorPromise.then(response => {
    return HttpClient.getCancelable<QuoteData>(`/quote?authorId=${response.data.authorId}`, abortController)
      .then(quoteData => {
        return {
          ...quoteData.data,
          authorName: response.data.name
        } as AuthorQuoteData;
      });
  }) as PromiseCancelable<AuthorQuoteData>;
  
  req.cancel = () => abortController.abort();

  return req;
}