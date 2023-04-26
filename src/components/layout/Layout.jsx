import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => (
  <Fragment>
    <Header />
    {/* Wrap all content in column-direction flexbox */}
    <div className="App-theme">
      <Outlet />
    </div>
    <Footer />
  </Fragment>
);

export default Layout;
