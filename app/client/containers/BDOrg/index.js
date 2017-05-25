/**
 * BDOrg
 */

/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import ProjectItem from '../../components/projectItem';

/**
 * Internal dependencies
 */
import './style.less';
import * as actions from './actions';

export class BDOrg extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    const id = this.props.params.id;
    const query = this.props.location.query;
    const page = query.page ? query.page : '1';
    const pageSize = query.pageSize ? query.pageSize : '10';
    if (!this.props.listData) {
      this.props.loadList(id, page, pageSize);
    }
  }

  componentDidMount() {
    const id = this.props.params.id;
    const query = this.props.location.query;
    const page = query.page ? query.page : '1';
    const pageSize = query.pageSize ? query.pageSize : '10';
    if (!this.props.listData) {
      this.props.loadList(id, page, pageSize);
    }
  }

  renderList(data) {
    return data.data && data.data.length ? data.data.map((item, index) => {
      return <ProjectItem loading={false} data={item} key={`project-item-${index}`}  id={`${index}`}/>;
    }) : '<div text="暂时没有数据哦" />';
  }

  render() {
    const { listData, listLoading } = this.props;
    console.log(listData);
    console.log(listLoading);

    return (
      <div className="bdorg-container">
          <Helmet
            titleTemplate="%s - 风口机构排行榜"
            defaultTitle="风口机构排行榜"
            meta={[
              { name: 'description', content: '风口机构排行榜' },
            ]}
          />
        <div className="bdorg-content">
            <div className="bdorg-top"></div>
              <div className="projects-list-list">
                {
                  listData
                  ? this.renderList(listData)
                  : ''
                }
              </div>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const helpList = state.bgorg;
  return {
    listLoading: helpList.get('loading'),
    listData: helpList.get('listData'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadList: (id, page, pageSize) => dispatch(actions.loadBDOrgList(id, page, pageSize)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BDOrg);
