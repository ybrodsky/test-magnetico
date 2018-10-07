import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppContainer from './containers/App/Index';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <AppContainer />,
  document.getElementById('root')
);
registerServiceWorker();
