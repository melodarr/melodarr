// @ts-nocheck -- Converted from JSX. Pending type annotations.
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import ErrorBoundary from 'Components/Error/ErrorBoundary';
import PageContentError from './PageContentError';
import styles from './PageContent.module.css';

function PageContent(props) {
  const { className, title, children } = props;

  useEffect(() => {
    document.title = title
      ? `${title} - ${window.Melodarr.instanceName}`
      : window.Melodarr.instanceName;
  }, [title]);

  return (
    <ErrorBoundary errorComponent={PageContentError}>
      <div className={className}>{children}</div>
    </ErrorBoundary>
  );
}

PageContent.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

PageContent.defaultProps = {
  className: styles.content,
};

export default PageContent;
