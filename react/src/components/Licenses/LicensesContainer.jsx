import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Licenses from './Licenses';
import { actions } from '../../redux/licenses';
import { actions as sidebarActions } from '../../redux/sidebar';
import { noop } from '../../utils';
import RequestStates from '../../constants/request-states';
import * as Toast from '../Toaster/Toaster';

class LicensesContainer extends Component {
  constructor(props) {
    super(props);
    this.generateLicenses = this.generateLicenses.bind(this);
  }

  componentDidMount() {
    const {
      match, setActiveMenuItemKey, setSelectedExpandedMenuItemKey, getLicenses
    } = this.props;
    setActiveMenuItemKey(match.params.type);
    setSelectedExpandedMenuItemKey('licenses');
    getLicenses(match.params.type);
  }

  componentWillUnmount() {
    const { flushSelectedExpandedMenuItemKey } = this.props;
    flushSelectedExpandedMenuItemKey();
  }

  generateLicenses() {
    const { generateLicenses, getLicenses, match } = this.props;
    generateLicenses()
      .then((licensesInfo) => {
        if (licensesInfo.n > 0) {
          Toast.success(`Generated ${licensesInfo.n} Licenses`, 'Success');
          getLicenses(match.params.type);
        } else {
          Toast.info('You already have 10 unused licenses', 'No need to generate licenses');
        }
      });
  }

  render() {
    const { match, licenses, loading } = this.props;
    return (
      <Licenses
        type={match.params.type}
        licenses={licenses}
        generateLicenses={this.generateLicenses}
        loading={loading}
      />
    );
  }
}

LicensesContainer.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  setActiveMenuItemKey: PropTypes.func,
  setSelectedExpandedMenuItemKey: PropTypes.func,
  flushSelectedExpandedMenuItemKey: PropTypes.func,
  generateLicenses: PropTypes.func,
  getLicenses: PropTypes.func,
  licenses: PropTypes.arrayOf(PropTypes.any),
  loading: PropTypes.bool,
};

LicensesContainer.defaultProps = {
  setActiveMenuItemKey: noop,
  setSelectedExpandedMenuItemKey: noop,
  flushSelectedExpandedMenuItemKey: noop,
  generateLicenses: noop,
  getLicenses: noop,
  licenses: [],
  loading: false,
};

const mapStateToProps = state => ({
  licenses: state.licenses.licenses,
  loading: state.licenses.requestState === RequestStates.loading,
});

const mapDispatchToProps = dispatch => ({
  setActiveMenuItemKey: menuItemKey => dispatch(sidebarActions.setActiveMenuItemKey(menuItemKey)),
  setSelectedExpandedMenuItemKey: menuItemKey => dispatch(sidebarActions.setSelectedExpandedMenuItemKey(menuItemKey)),
  flushSelectedExpandedMenuItemKey: () => dispatch(sidebarActions.flushSelectedExpandedMenuItemKey()),
  generateLicenses: () => dispatch(actions.generateLicenses()),
  getLicenses: type => dispatch(actions.getLicenses(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LicensesContainer));
