/**
 * BDOrg
 */

/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import Helmet from 'react-helmet';
//import InfiniteScroll from 'react-infinite-scroller';

/**
* internal
*/
import ProjectItem from '../../components/ProjectItem';
import LoadHint from '../../components/LoadHint';
import ProItem from '../../components/ProItem';

/**
 * Internal dependencies
 */
import './style.less';
import * as actions from './actions';

export class BdOrg extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.proItems = [];
    this.currPage = 1;
    this.hasMore = true;
    const query = this.props.location.query;
    const page = query.page ? query.page : '1';
    const pageSize = query.pageSize ? query.pageSize : '10';
    if (!this.props.listData) {
      this.props.loadList(page, pageSize);
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.readMore.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.readMore.bind(this));
  }

  readMore() {
    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
      this.addMoreData();
    }
  }

  addMoreData() {
    let pageSize = 10;
    if (this.currPage && this.hasMore) {
      let page  = Number.parseInt(this.currPage, 10) + 1;
      this.props.dispatch(actions.loadBDOrgList(page, pageSize));
    }
  }

  render() {
    const { listData, hasMore, page, loading } = this.props;
    this.currPage = page;
    this.hasMore = hasMore;
    listData && listData.data ? this.proItems = this.proItems.concat(listData.data) : [];

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
              <div className="projects-list" ref="scrollDiv">
                {
                  this.proItems ? <ProItem data={this.proItems} loading={loading} hasMore={hasMore}/> :
                  <LoadHint></LoadHint>
                }
              </div>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const bgorg = state.bgorg;
  const layout = state.layout;

  return {
    userInfoData: layout.getIn(['userInfo', 'data']),
    totalCount: bgorg.getIn(['orgInfo', 'totalCount']),
    page: bgorg.getIn(['orgInfo', 'page']),
    totalPages: bgorg.getIn(['orgInfo', 'totalPages']),
    loading: bgorg.getIn(['orgInfo', 'loading']),
    listData: bgorg.getIn(['orgInfo', 'listData']),
    hasMore: bgorg.getIn(['orgInfo', 'hasMore']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadList: (page, pageSize) => dispatch(actions.loadBDOrgList(page, pageSize)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BdOrg);
