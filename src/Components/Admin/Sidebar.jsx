import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/dashboard/admin/posts">Posts</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/users">Users</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
