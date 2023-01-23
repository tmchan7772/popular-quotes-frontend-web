import { Button, Modal, Space } from 'antd';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { logout } from '../services/auth';
import HttpClient from '../utils/httpClient';

export default function Nav() {
  const { userToken, loggingOutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const onSignOutClick = () => {
    logout().then(() => {
      loggingOutUser && loggingOutUser();
      navigate('/');
    });
  };

  HttpClient.setup401Handler(() => {
    loggingOutUser && loggingOutUser();
    Modal.confirm({
      title: 'Error',
      content: 'The session has expired. Please signin again',
      onOk: () => {
        navigate('/signIn');
      }
    });
  });

  HttpClient.setupGlobalErrorHandler(() => {
    Modal.error({
      title: 'Error',
      content: 'Something went wrong...'
    });
  });

  return (
    <nav>
      <Space size="small">
        <Link to="/"><Button>About us</Button></Link>
        {!userToken && <Link to="/signIn"><Button>Sign in</Button></Link>}
        {userToken && <Link to="/profile"><Button>Profile</Button></Link>}
        {userToken && <Button onClick={onSignOutClick}>Sign out</Button>}
      </Space>
    </nav>
  );
}