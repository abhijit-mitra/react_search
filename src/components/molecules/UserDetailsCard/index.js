import React from 'react';

const UserDetailsCard = ({id, name, items, address, pincode}) => (
  <div className="p-3 border w-100">
    <div className="mb-3">
      {id}
    </div>
    <div className="mb-3">
      {name}
    </div>
    <div>
      {address}
    </div>
  </div>
);

export default UserDetailsCard;
