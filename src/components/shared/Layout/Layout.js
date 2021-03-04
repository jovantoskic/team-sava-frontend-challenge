import React from 'react';
import PropTypes from 'prop-types';

import './Layout.scss';

function Layout({ children }) {
  return <section className="content">{children}</section>;
}

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
