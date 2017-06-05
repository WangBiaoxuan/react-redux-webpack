import React, { PureComponent } from 'react';

import './style.less';
class TopBar extends PureComponent {

  render() {
    return <div className="topbar">
            <div className="logo">
              <img src={require('./imgs/topBanner.png')} alt=""/>
            </div>
            <div className="txt">
                <p>创投助手</p>
                <p>精选全网最优质的项目</p>
            </div>
            <div className="btn">
                <button>立即下载</button>
            </div>
          </div>;
  }

}

export default TopBar;
