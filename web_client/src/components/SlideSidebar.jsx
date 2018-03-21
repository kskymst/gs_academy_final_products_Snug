import React from 'react';
import { Button } from 'semantic-ui-react';

import Bars from 'react-icons/lib/fa/bars';

class SlideSidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
    };
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    return (
      <React.Fragment>
        <Bars
          color="#fff"
          size={40}
          className="toggle-button"
        />
      </React.Fragment>
    );
  }
}

export default SlideSidebar;
