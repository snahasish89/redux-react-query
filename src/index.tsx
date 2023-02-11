import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import { HeaderNavbar } from './component/headerNavbar';
import { Loading } from './component/Loading';
import  Users  from './views/users';
import { QueryClientProvider ,QueryClient} from 'react-query';
import { queryConfig } from './util/queryConfig';
import Gallery from './views/gallery';
import { Cart, Product } from './cart/view';
import { Toaster } from 'react-hot-toast';


const container = document.getElementById('root')!;
const root = createRoot(container);
const queryClient = new QueryClient(queryConfig);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter>
        <HeaderNavbar/>
        <Suspense fallback={<Loading/>}>
          <Routes>
            <Route path='/' element={<App/>} />
            <Route path='/users' element={<Users/>} />
            <Route path='/gallery' element={<Gallery/>} />
            <Route path='/product' element={<Product/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/*' element={
              <div className='text-center uppercase h-{200} m-40 font-bold text-red-700'>
                <h2>Not Found</h2>
              </div>
            } 
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster/>
    </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);