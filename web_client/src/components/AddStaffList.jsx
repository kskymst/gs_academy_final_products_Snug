import React from 'react';
import { Link } from 'react-router-dom';

const AddStaffList = (props) => {
  const searchedUser = props.searchedData.map(data => (
    <div
      key={data.key}
      className="staff-item"
    >
      <div className="staff-info">
        <Link to={data.key} >
          <div
            style={{ backgroundImage: `url(${data.userImage})` }}
            className="user-image"
          />
        </Link>
        <div className="staff-description">
          <Link to={data.key} >
            <p>{data.userName}</p>
          </Link>
          <p>{data.userText}</p>
        </div>
      </div>
      <div>
        {
          data.shopId === props.myId ? (
            <button
              className="added-button"
              onClick={() => {
              props.handleSubmit(data.key, 'toFree');
              data.shopId = '';
            }}
            >
              追加済み
            </button>
          ) : (
            <button
              className="add-button"
              onClick={() => {
                props.handleSubmit(data.key, 'add');
                data.shopId = props.myId;
              }}
            >
              追加する
            </button>
          )
        }
      </div>
    </div>
  ));
  return (
    <div className="add-staff-list-area">
      { searchedUser }
    </div>
  );
};


export default AddStaffList;

