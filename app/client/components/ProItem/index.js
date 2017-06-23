/**
 * HelpListItems
 */

/**
 * External dependencies
 */
import React from 'react';
import { PropTypes } from 'prop-types';
/**
 * Internal dependencies
 */
import ProjectItem from '../../components/ProjectItem';
import LoadHint from '../../components/LoadHint';
import './style.less';

function ProItem(props) {
  const { loading, data, hasMore } = props;
  return (
    <div className="container">
      {
        data && data.map((item, index) => {
          return <ProjectItem  data={item} key={`project-item-${index}`}  id={`${index}`} />;
        })
      }
      {
        loading && hasMore ? <LoadHint></LoadHint> : <div className="no-moreData">已没有更多数据</div>
      }
    </div>
  );
}

ProItem.propTypes = {
  loading: PropTypes.bool.isRequired,
  data:  PropTypes.array.isRequired,
};

ProItem.defaultProps = {
  loading: true,
  data: false,
};

export default ProItem;
