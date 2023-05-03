import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { AuthProvider } from './contexts/authContext';
import { ErrorProvider } from './contexts/errorContext';
import { LoadingProvider } from './contexts/loadingContext';
import { PostsProvider } from './contexts/postsContext';
import { VotesProvider } from './contexts/votesContext';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <ErrorProvider>
          <AuthProvider>
            <PostsProvider>
              <VotesProvider>
                <App />
              </VotesProvider>
            </PostsProvider>
          </AuthProvider>
        </ErrorProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
