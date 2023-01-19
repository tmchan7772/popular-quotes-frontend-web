import { StrictMode } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <StrictMode>
      <h1>Popular quotes app</h1>

      <nav>
        <Link to="/">About</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route index element={<div>About us content</div>} />
        <Route path="login" element={<div>Login content</div>} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </StrictMode>
  );
};

const NoMatch = () => {
  return <p>Not found</p>;
};

export default App;