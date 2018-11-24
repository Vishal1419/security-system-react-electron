import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from '../components/Sidebar/SidebarContainer';

const MainTemplate = ({ children }) => (
  <div className="app">
    <Sidebar />
    <main>{children}</main>
  </div>
);

MainTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
}

MainTemplate.defaultProps = {
  children: <div />,
};

export default MainTemplate;