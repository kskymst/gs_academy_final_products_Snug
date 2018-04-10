import React from 'react';
import Cloud from 'react-icons/lib/io/ios-rainy-outline';

const NoMatch = () => (
  <div className="nomatch-wrapper">
    <Cloud className="icon" />
    <p>404エラー</p>
  </div>
);

export default NoMatch;
