import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'

import App from './App';
import '../styles.css';

const container = document.getElementById('app-root')!;
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)