import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import MenuItems from '../../constants/menuItems.json';
import { noop } from '../../utils/index.js';

const renderMenuItems = (history, menuItems, activeMenuItemKey, expandedMenuItemKeys, selectedExpandedMenuItemKey, toggleExpandedMenuItemKey, level = 0) =>
  menuItems.map(menuItem => (
    <Fragment key={menuItem.key}>
      <div
        style={{ paddingLeft: (level + 1) * 20 }}
        className={`menu-item ${activeMenuItemKey === menuItem.key || selectedExpandedMenuItemKey === menuItem.key ? 'active' : ''}`}
        onClick={() => {
          if (menuItem.children && menuItem.children.length > 0) {
            if (menuItem.key !== selectedExpandedMenuItemKey) {
              toggleExpandedMenuItemKey(menuItem.key);
            }
          } else {
            history.push(menuItem.path);
          }
        }}
      >
        <i className={`fas fa-${menuItem.icon}`} />
        <span>{menuItem.text}</span>
        {
          menuItem.children && menuItem.children.length > 0
            && (
              expandedMenuItemKeys.includes(menuItem.key)
              ? <i className="fas fa-chevron-up expander" />
              : <i className="fas fa-chevron-down expander" />
            )
        }
      </div>
      {
        menuItem.children && menuItem.children.length > 0 && expandedMenuItemKeys.includes(menuItem.key)
        && renderMenuItems(history, menuItem.children, activeMenuItemKey, expandedMenuItemKeys, selectedExpandedMenuItemKey, toggleExpandedMenuItemKey, level + 1)
      }
    </Fragment>
  ));

const Sidebar = ({
  history, activeMenuItemKey, expandedMenuItemKeys, selectedExpandedMenuItemKey, toggleExpandedMenuItemKey,
}) => (
  <div className="sidebar">
    {renderMenuItems(history, MenuItems, activeMenuItemKey, expandedMenuItemKeys, selectedExpandedMenuItemKey, toggleExpandedMenuItemKey)}
    {/* {
      MenuItems.map(menuItem => (
        <div
          key={menuItem.key}
          className={`menu-item ${activeMenuItemKey === menuItem.key ? 'active' : ''}`}
          onClick={() => history.push(menuItem.path)}
        >
          <i className={`fas fa-${menuItem.icon}`} />
          <span>{menuItem.text}</span>
        </div>
      ))
    } */}
  </div>
);

Sidebar.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  activeMenuItemKey: PropTypes.string,
  expandedMenuItemKeys: PropTypes.arrayOf(PropTypes.string),
  selectedExpandedMenuItemKey: PropTypes.string,
  toggleExpandedMenuItemKey: PropTypes.func,
};

Sidebar.defaultProps = {
  activeMenuItemKey: '',
  expandedMenuItemKeys: [],
  selectedExpandedMenuItemKey: '',
  toggleExpandedMenuItemKey: noop,
};

export default withRouter(Sidebar);