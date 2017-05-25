

import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { get } from 'lodash';

import './style.less';
class ProjectItem extends PureComponent {

  render() {
    const { data, id } = this.props;
    let metal;
    if (id === '0') {
      metal = <img src={require('./imgs/bd-gold-metal.png')} alt=""/>;
    } else if (id === '1') {
      metal = <img src={require('./imgs/bd-silver-metal.png')} alt=""/>;
    } else if (id === '2') {
      metal = <img src={require('./imgs/bd-copper-metal.png')} alt=""/>;
    } else {
      metal = <span>{parseInt(id, 10) + 1}</span>;
    }

    return <Link to={`/project/`} id={id}>
          <div className="metal">
              {metal}
          </div>
          <div className="logo">
            <div className="cover" style={{ backgroundImage: `url(${get(data, 'logo')})`}}></div>
          </div>
          <div className="content">
          <span>{get(data, 'name')}</span>
          <span>{get(data, 'projectCount')}</span>
          <span>{get(data, 'projectCount')}</span>
          </div>
        </Link>;
  }
}

export default ProjectItem;
