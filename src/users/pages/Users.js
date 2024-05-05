import React from 'react';

import UsersList from '../components/UsersList';


const Users = () => {
  const USERS = [{id: 'u1', name: 'Georgina', image: 'https://www.pexels.com/photo/woman-in-yellow-long-sleeve-standing-under-the-sunlight-3779756/', places: 3}]
  return (
    <UsersList items={USERS} />
  );
}

export default Users