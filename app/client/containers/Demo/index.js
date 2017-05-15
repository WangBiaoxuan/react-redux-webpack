/**
 * Demo
 */

/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

/**
 * Internal dependencies
 */
import './style.less';
export class Demo extends PureComponent {

  render() {
    return (
      <div className="demo-container">
          <Helmet
            titleTemplate="%s - 创投助手"
            defaultTitle="创投助手"
            meta={[
              { name: 'description', content: '创投助手' },
            ]}
          />
        <div className="test">这是一个demo测试</div>
      </div>
    );
  }

}

export default connect(null, null)(Demo);
