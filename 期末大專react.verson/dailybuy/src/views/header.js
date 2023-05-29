import React from 'react';
import Header_top from './header_top';
import Header_right from './header_right';
import '../public/css/header.css';
const Header = () => {
     return (
          <React.Fragment>
               <Header_top />
               <Header_right />
          </React.Fragment>
     )
}

export default Header;