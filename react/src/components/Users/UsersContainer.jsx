import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Users from './Users';
import { actions } from '../../redux/users';
import { actions as sidebarActions } from '../../redux/sidebar';
import { noop } from '../../utils';
import RequestStates from '../../constants/request-states';

class UsersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUser: 0,
    };
    this.changeActiveUser = this.changeActiveUser.bind(this);
  }

  componentDidMount() {
    const { getUsers, setActiveMenuItemKey } = this.props;
    setActiveMenuItemKey('users');
    getUsers();
  }

  changeActiveUser(index) {
    this.setState({
      activeUser: index,
    });
  }

  render() {
    const { loading, users } = this.props;
    return (
      <Users
        loading={loading}
        users={users}
        activeUser={this.state.activeUser}
        changeActiveUser={this.changeActiveUser}
      />
    );
  }
}

UsersContainer.propTypes = {
  setActiveMenuItemKey: PropTypes.func,
  loading: PropTypes.bool,
  getUsers: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.any),
};

UsersContainer.defaultProps = {
  setActiveMenuItemKey: noop,
  loading: false,
  getUsers: noop,
  users: [],
};

const mapStateToProps = state => ({
  loading: state.users.requestState === RequestStates.loading,
  users: state.users.users,
});

const mapDispatchToProps = dispatch => ({
  setActiveMenuItemKey: menuItemKey => dispatch(sidebarActions.setActiveMenuItemKey(menuItemKey)),
  getUsers: () => dispatch(actions.getUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);