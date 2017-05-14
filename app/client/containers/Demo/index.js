/**
 * Transfer
 */

/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import './style.less';
export class Transfer extends PureComponent {

  render() {
    return (
        <div className="test">这是一个demo测试</div>
    );
  }

}

export default connect(null, null)(Transfer);
