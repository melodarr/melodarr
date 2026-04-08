import { createBrowserHistory } from 'history';
import React from 'react';
import { createRoot } from 'react-dom/client';
import createAppStore from 'Store/createAppStore';
import App from './App/App';

import 'Diag/ConsoleApi';

class RootErrorBoundary extends React.Component<{ children: React.ReactNode }> {
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(
      '🔥 GLOBAL ErrorBoundary caught an error:',
      error,
      '\nComponent Stack:\n',
      info?.componentStack
    );
  }
  render() {
    return this.props.children;
  }
}

export async function bootstrap() {
  const history = createBrowserHistory();
  const store = createAppStore(history);
  const rootElement = document.getElementById('root');
  console.log('ROOT ELEMENT IS:', rootElement);
  console.log('ROOT TYPE:', typeof rootElement);
  if (rootElement) {
    console.log('ROOT tag:', rootElement.tagName);
  } else {
    console.warn('ROOT ELEMENT IS NULL!');
  }

  const root = createRoot(rootElement!);
  root.render(
    <RootErrorBoundary>
      <App store={store} history={history} />
    </RootErrorBoundary>
  );
}
