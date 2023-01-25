import { Button, Divider, Typography } from 'antd';
import { useContext, useEffect, useState } from 'react';
import LoadingProgressModal, { LoadingStep } from '../components/LoadingProgressModal';
import { ProfileContext } from '../contexts/Profile/ProfileContext';

import userIcon from '../../assets/user.png';

export default function Profile() {
  const { loadAuthorWithQuote, loadFullName, cancelAuthorWithQuoteLoad, ...state } = useContext(ProfileContext);
  const [loadingSteps, setLoadingSteps] = useState<LoadingStep[]>([
    { title: 'Requesting Author', isCompleted: false },
    { title: 'Requesting Quote', isCompleted: false }
  ]);

  const updateClick = () => {
    loadAuthorWithQuote();
  };

  const onCancel = () => {
    cancelAuthorWithQuoteLoad();
  };
  
  useEffect(() => {
    loadFullName();
  }, []);

  useEffect(() => {
    setLoadingSteps(oldSteps => {
      return [ {...oldSteps[0], isCompleted: !state.isLoadingAuthor }, {...oldSteps[1], isCompleted: !state.isLoadingQuotes } ];
    });
  }, [state.isLoadingAuthor, state.isLoadingQuotes]);

  const quoteParagraph = <div>
    <Typography.Text italic>&quot;{state.authorQuote}&quot;</Typography.Text> - <Typography.Text>{state.authorName}</Typography.Text>
  </div>;

  return (
    <>
      <div className="layout profile-data">
        <img src={userIcon}></img>
        {state.isLoadingFullName && <h1>Loading...</h1>}
        {!state.isLoadingFullName && <h1>Welcome, {state.fullname}</h1>}
      </div>
      <Button type="primary" onClick={updateClick}>Update</Button>

      {(state.isLoadingAuthor || state.isLoadingQuotes) && <LoadingProgressModal steps={loadingSteps} cancel={onCancel}></LoadingProgressModal>}

      <Divider />
      
      {state.authorQuote && quoteParagraph}
    </>
  );
}