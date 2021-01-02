import React from 'react';
import { UtilityHeader, SideNav, Footer } from '@awesomecomponents/mux/core/components';
import './Layout.css';

function Layout({ children }) {
  return (
    <div className="Layout">
      <div className="Layout-header">
        <UtilityHeader />
      </div>
      <div className="Layout-sideNav">
        <SideNav mobileHeaderToggle />
      </div>
      <div className="Layout-container">
        <div className="Layout-content">{children}</div>
        <div className="Layout-footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
