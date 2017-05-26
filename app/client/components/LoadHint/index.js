import React, { PureComponent } from 'react';

import './style.less';
class LoadHint extends PureComponent {

  render() {
    return <div className="loading">
          <span>数据正在加载中...</span>
          <img src={require('./imgs/loading.svg')} alt=""/>
          </div>;
  }

}

export default LoadHint;
