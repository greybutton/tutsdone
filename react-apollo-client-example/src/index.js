import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from "apollo-boost";

import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';

require('dotenv').config()

const GITHUB_BASE_URL = 'https://api.github.com/graphql';

const client = new ApolloClient({
  uri: GITHUB_BASE_URL,
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${
          process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
        }`,
      },
    });
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

registerServiceWorker();
