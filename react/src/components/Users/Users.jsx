import React from 'react';
import PropTypes from 'prop-types';
import BlockUI from 'react-block-ui';
import { Collapse, CardBody, Card, CardHeader } from 'reactstrap';

import { noop } from '../../utils';

const Dashboard = ({
  loading, users, activeUser, changeActiveUser
}) => (
  <div className="users">
    <BlockUI
      tag="div"
      className="full-screen"
      blocking={loading}
    >
      {
        (users && users.length > 0) || loading
        ? (
          users.map((user, index) => (
            <Card key={user._id}>
              <CardHeader onClick={() => changeActiveUser(index)} data-event={index}>
                <div className="row user-info">
                  <span className="col-md-2">{user.name}</span>
                  <span className="col-md-2 mobile">{user.mobile_no}</span>
                  <span className="col-md-7 badge badge-primary">{user.licenses.length}</span>
                </div>
              </CardHeader>
              <Collapse isOpen={activeUser === index}>
              <CardBody>
                <div className="user-licenses">
                  {
                    user.licenses.map(license => (
                      <div key={license._id}>
                        <div className="license-info-container">
                          <div className="license-info">
                            <span>{`key: ${license.key}`}</span>
                            <br />
                            <span>{`mac: ${license.hdd}`}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </CardBody>
              </Collapse>
            </Card>
          ))
        )
        : (
          <p className="text-center no-data">You don't have any users. Please sell applications to show licenses here.</p>
        )
      }
    </BlockUI>
  </div>
);

Dashboard.propTypes = {
  loading: PropTypes.bool,
  users: PropTypes.arrayOf(PropTypes.object),
  activeUser: PropTypes.number,
  changeActiveUser: PropTypes.func,
};

Dashboard.defaultProps = {
  loading: false,
  users: [],
  activeUser: 0,
  changeActiveUser: noop,
};

export default Dashboard;