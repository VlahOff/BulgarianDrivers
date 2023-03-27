import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { AuthProvider } from './contexts/authContext';
import { ErrorProvider } from './contexts/errorContext';
import { LoadingProvider } from './contexts/loadingContext';
import { PostsProvider } from './contexts/postsContext';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <LoadingProvider>
      <ErrorProvider>
        <AuthProvider>
          <PostsProvider>
            <App />
          </PostsProvider>
        </AuthProvider>
      </ErrorProvider>
    </LoadingProvider>
  </BrowserRouter>
);