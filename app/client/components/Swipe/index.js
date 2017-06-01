/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import ReactSwipe from 'react-swipe';

import './style.less';
class Swipe extends PureComponent {

  render () {
    const { data } = this.props;

    return (<ReactSwipe className="carousel" swipeOptions={{ continuous: false }}
              key={data.length}>
              {
                data && data.length && data.map((item, index) => {
                  return <div key={index}><img src={item.url} role="presentation"></img></div>;
                })
              }
          </ReactSwipe>
        );
  }
}

Swipe.propTypes = {
  data: React.PropTypes.array.isRequired,
};

export default Swipe;
