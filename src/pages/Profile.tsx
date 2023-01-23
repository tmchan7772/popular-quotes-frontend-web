import { Button, Divider, Typography } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import LoadingProgressModal, { TitledPromise } from '../components/LoadingProgressModal';
import { getAuthor, getAuthorQuote } from '../services/author';
import { getCurrentProfile } from '../services/profile';

export default function Profile() {
  const [fullname, setFullname] = useState('');
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorQuote, setAuthorQuote] = useState('');
  const [requests, setRequests] = useState([] as TitledPromise<unknown>[]);
  const refController = useRef({} as AbortController);

  const updateClick = () => {
    refController.current = new AbortController();
    const { current: controller } = refController;
    const authorRequest = getAuthor(controller);
    const authorQuoteRequest = authorRequest.then(response => {
      return getAuthorQuote(response.data.authorId, controller).then(quoteResponse => {
        setAuthorName(response.data.name);
        setAuthorQuote(quoteResponse.data.quote);
      });
    });
    setRequests([
      {
        title: 'Request author',
        promise: authorRequest
      },
      {
        title: 'Request quote',
        promise: authorQuoteRequest
      }
    ]);

    setIsLoadingQuotes(true);
  };

  const onCancel = useCallback(() => {
    refController.current.abort();
    setIsLoadingQuotes(false);
  }, []);

  const onDone = useCallback(() => {
    setIsLoadingQuotes(false);
  }, []);
  
  useEffect(() => {
    getCurrentProfile().then((response) => {
      setFullname(response.data.fullname);
    });
  }, []);

  const quoteParagraph = <div>
    <Typography.Text italic>&quot;{authorQuote}&quot;</Typography.Text> - <Typography.Text>{authorName}</Typography.Text>
  </div>;

  return (
    <>
      {fullname && <h1>Welcome, {fullname}</h1>}
      {!fullname && <h1>Loading...</h1>}
      <Button type='primary' onClick={updateClick}>Update</Button>

      {isLoadingQuotes && <LoadingProgressModal requests={requests} cancel={onCancel} onDone={onDone}></LoadingProgressModal>}

      <Divider />
      
      {authorQuote && quoteParagraph}
    </>
  );
}