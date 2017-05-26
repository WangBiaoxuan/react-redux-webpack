/**
 * BDOrg
 */

/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroller';

/**
* internal
*/
import ProjectItem from '../../components/ProjectItem';
import LoadHint from '../../components/LoadHint';

/**
 * Internal dependencies
 */
import './style.less';
import * as actions from './actions';

export class BdOrg extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    const query = this.props.location.query;
    const page = query.page ? query.page : '1';
    const pageSize = query.pageSize ? query.pageSize : '10';
    if (!this.props.listData) {
      this.props.loadList(page, pageSize);
    }
  }

  componentDidMount() {
    console.log(this.props);
  }

  hasMore() {
    const { page, totalPages } = this.props;
    return page < totalPages;
  }

  loadItems(page) {
    let pageSize = 10;
    this.props.loadList(page, pageSize);
  }

  renderList(data) {
    return data.data && data.data.length ? data.data.map((item, index) => {
      return <ProjectItem  data={item} key={`project-item-${index}`}  id={`${index}`}/>;
    }) : <div>暂时没有数据哦</div>;
  }

  render() {
    const { listData, listLoading } = this.props;
    let items = [];
    console.log(Array.isArray(listData), '=====');
    items.concat(Array.from(listData ? listData : []));

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
              <div className="projects-list">
                {
                  listLoading || (!listLoading && items)
                  ? this.renderList(items)
                  : <LoadHint></LoadHint>
                }
              </div>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const bdOrgList = state.bgorg;
  const query = props.location.query;
  const page = query.page ? query.page : '1';

  return {
    totalCount: bdOrgList.get('totalCount'),
    page: bdOrgList.get('page'),
    totalPages: bdOrgList.get('totalPages'),
    listLoading: bdOrgList.get('loading'),
    listData: bdOrgList.getIn(['listData', page]),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadList: (page, pageSize) => dispatch(actions.loadBDOrgList(page, pageSize)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BdOrg);
