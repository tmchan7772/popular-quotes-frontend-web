import { Button, Divider, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import LoadingProgressModal, { TitledPromise } from '../components/LoadingProgressModal';
import { getAuthorCancelable, getAuthorQuoteCancelable } from '../services/author';
import { getCurrentProfile } from '../services/profile';
import userIcon from '../../assets/user.png';

export default function Profile() {
  const [fullname, setFullname] = useState('');
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorQuote, setAuthorQuote] = useState('');
  const [requests, setRequests] = useState([] as TitledPromise<unknown>[]);

  const updateClick = () => {
    const authorRequest = getAuthorCancelable();
    const authorQuoteRequest = getAuthorQuoteCancelable(authorRequest);

    authorQuoteRequest.then(response => {
      setAuthorName(response.authorName);
      setAuthorQuote(response.quote);
    });

    setRequests([
      {
        title: 'Requesting author',
        promise: authorRequest
      },
      {
        title: 'Requesting quote',
        promise: authorQuoteRequest
      }
    ]);

    setIsLoadingQuotes(true);
  };

  const onCancel = useCallback(() => {
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
      <div className="layout profile-data">
        <img src={userIcon}></img>
        {fullname && <h1>Welcome, {fullname}</h1>}
        {!fullname && <h1>Loading...</h1>}
      </div>
      <Button type="primary" onClick={updateClick}>Update</Button>

      {isLoadingQuotes && <LoadingProgressModal requests={requests} cancel={onCancel} onDone={onDone}></LoadingProgressModal>}

      <Divider />
      
      {authorQuote && quoteParagraph}
    </>
  );
}