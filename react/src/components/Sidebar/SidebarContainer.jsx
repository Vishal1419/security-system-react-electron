import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Sidebar from './Sidebar';
import { actions } from '../../redux/sidebar';
import { noop } from '../../utils';

class SidebarContainer extends Component {
  render() {
    const {
      activeMenuItemKey, expandedMenuItemKeys, selectedExpandedMenuItemKey, toggleExpandedMenuItemKey,
    } = this.props;
    return (
      <Sidebar
        activeMenuItemKey={activeMenuItemKey}
        expandedMenuItemKeys={expandedMenuItemKeys}
        selectedExpandedMenuItemKey={selectedExpandedMenuItemKey}
        toggleExpandedMenuItemKey={toggleExpandedMenuItemKey}
      />
    );
  }
}

SidebarContainer.propTypes = {
  activeMenuItemKey: PropTypes.string,
  expandedMenuItemKeys: PropTypes.arrayOf(PropTypes.string),
  selectedExpandedMenuItemKey: PropTypes.string,
  toggleExpandedMenuItemKey: PropTypes.func,
};

SidebarContainer.defaultProps = {
  activeMenuItemKey: '',
  expandedMenuItemKeys: [],
  selectedExpandedMenuItemKey: '',
  toggleExpandedMenuItemKey: noop,
};

const mapStateToProps = state => ({
  activeMenuItemKey: state.sidebar.activeMenuItemKey,
  expandedMenuItemKeys: state.sidebar.expandedMenuItemKeys,
  selectedExpandedMenuItemKey: state.sidebar.selectedExpandedMenuItemKey,
});

const mapDispatchToProps = dispatch => ({
  toggleExpandedMenuItemKey: menuItemKey => dispatch(actions.toggleExpandedMenuItemKey(menuItemKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
