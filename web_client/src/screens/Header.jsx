import React from 'react';

// eslint-disable-next-line
class Header extends React.Component {
  render() {
    return (
      <div className="header-wrapper">
        <div className="header-logos">
          <img src="/img/icon.png" alt="bland-logo" />
          <p>Snug</p>
        </div>
      </div>
    );
  }
}

export default Header;
