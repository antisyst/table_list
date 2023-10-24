import ReactDOM from 'react-dom/client'
import './index.scss';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from './redux/store.ts';

import LoginPage from './pages/LoginPage.tsx';
import TablePage from './pages/TablePage.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<LoginPage/>} />
        <Route path="/table" element={<TablePage/>} />
      </Routes>
    </BrowserRouter>
  </Provider>,
)
