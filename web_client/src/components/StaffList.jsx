import React from 'react';
import { Link } from 'react-router-dom';

import ChevronRight from 'react-icons/lib/md/chevron-right';

const StaffList = (props) => {
  const shopStaff = props.staffList.map((data) => {
    return (
      <Link
        key={data.key}
        to={data.key}
        className="staff-list"
      >
        <div className="user-description">
          <div style={{ backgroundImage: `url(${data.userImage})` }} />
          <p>{data.userName}</p>
        </div>
        <div>
          <ChevronRight
            size={28}
          />
        </div>
      </Link>
    );
  });
  return (
    <div className="staff-list-wrapper">
      { shopStaff }
    </div>
  );
};


export default StaffList;
