import React from 'react';
import { Route } from 'react-router';
import Sidebar from './Sidebar';
import AdminPosts from './AdminPosts';
import Users from './Users';

const Dashboard = ({ match }) => {
  return (
    <div>
      <h1>Admin DashBoard</h1>
      <Sidebar />
      <Route path="/dashboard/admin/posts" component={AdminPosts} />
      <Route path="/dashboard/admin/users" component={Users} />
    </div>
  );
};

export default Dashboard;
