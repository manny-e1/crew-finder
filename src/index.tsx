import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
const store = configureStore();

const element: HTMLElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(element);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
