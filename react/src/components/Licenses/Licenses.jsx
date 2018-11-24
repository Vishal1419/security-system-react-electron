import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BlockUI from 'react-block-ui';
import { Table } from 'reactstrap';

import { noop } from '../../utils';

const Licenses = ({
  type, licenses, generateLicenses, loading,
}) => (
  <div className="licenses">
    <BlockUI
      tag="div"
      className="full-screen"
      blocking={loading}
    >
      <button className="btn btn-primary btn-generate-licenses" onClick={generateLicenses}>Generate Licenses</button>
      {
        (licenses && licenses.length > 0) || loading
        ? (
          <Table hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Key</th>
                { type === 'all' && <th>is Used</th> }
                { (type === 'all' || type === 'used') && <th>MAC</th> }
                { (type === 'all' || type === 'used') && <th>User Name</th> }
                { (type === 'all' || type === 'used') && <th>Mobile Number</th> }
                { (type === 'all' || type === 'used') && <th>Updated</th> }
              </tr>
            </thead>
            <tbody>
              {
                licenses.map((license, index) => (
                  <tr key={license._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{license.key}</td>
                    { type === 'all' && <td align="center">{license.is_used ? <input type="checkbox" checked disabled /> : <input type="checkbox" disabled />}</td> }
                    { (type === 'all' || type === 'used') && <td>{license.hdd}</td> }
                    { (type === 'all' || type === 'used') && <td>{license.user && license.user.name}</td> }
                    { (type === 'all' || type === 'used') && <td>{license.user && license.user.mobile_no}</td> }
                    { (type === 'all' || type === 'used') && <td align="right" style={{ paddingRight: 40 }}>{license.updated_times}</td> }
                  </tr>
                ))
              }
            </tbody>
          </Table>
        )
        : (
          <Fragment>
            {
              type === 'all' || type === 'unused'
              ? <p className="text-center no-data">You don't have any licenses. Please generate new licenses.</p>
              : <p className="text-center no-data">You don't have any users. Please sell applications to show licenses here.</p>
            }
          </Fragment>
        )
      }
    </BlockUI>
  </div>
);

Licenses.propTypes = {
  type: PropTypes.string,
  licenses: PropTypes.arrayOf(PropTypes.any),
  generateLicenses: PropTypes.func,
  loading: PropTypes.bool,
};

Licenses.defaultProps = {
  type: '',
  licenses: [],
  generateLicenses: noop,
  loading: false,
};

export default Licenses;