

import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { get } from 'lodash';

import './style.less';
class ProjectItem extends PureComponent {

  render() {
    const { data, id } = this.props;
    let metal;
    let border;
    if (id === '0') {
      metal = <img src={require('./imgs/bd-gold-metal.png')} alt=""/>;
      border = 'cover gold-border';
    } else if (id === '1') {
      metal = <img src={require('./imgs/bd-silver-metal.png')} alt=""/>;
      border = 'cover silver-border';
    } else if (id === '2') {
      metal = <img src={require('./imgs/bd-copper-metal.png')} alt=""/>;
      border = 'cover copper-border';
    } else {
      metal = <span>{Number.parseInt(id, 10) + 1}</span>;
      border = 'cover normal-border';
    }

    return <Link to={`/project/`} id={id}>
          <div className="left">
            <div className="metal">
                {metal}
            </div>
          </div>
          <div className="right">
            <div className="logo">
              <div className={border} style={{ backgroundImage: `url(${get(data, 'logo')})` }}></div>
            </div>
            <div className="content">
              <div className="title">{get(data, 'name')}</div>
              <div className="num">
                <span>浏览量</span>
                {get(data, 'projectCount')}
              </div>
            </div>
            <div className="spec">
              {
                id < 3 ? <div className="num top3Color">{get(data, 'projectCount')}</div> :
                <div className="num">{get(data, 'projectCount')}</div>
              }
              <div className="txt">约谈量</div>
            </div>
          </div>
        </Link>;
  }
}

export default ProjectItem;
