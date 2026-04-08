import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import PageConnector from 'Components/Page/PageConnector';
import ApplyTheme from './ApplyTheme';
import AppRoutes from './AppRoutes';

function App({ store, history }) {
  console.log('App is rendering!', store, history);
  
  useEffect(() => {
    document.title = window.Melodarr.instanceName || 'Melodarr';
  }, []);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ApplyTheme />
        <PageConnector>
          <AppRoutes app={App} />
        </PageConnector>
      </ConnectedRouter>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default App;
