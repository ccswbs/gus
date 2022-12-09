import React from 'react';
import HeaderMenu from 'components/shared/headerMenu';

const Header = ({ menuName }) => (
  <>
    <div id="header-breakpoint"></div>
    <ug-header>
      <HeaderMenu menuName={menuName} />
    </ug-header>
  </>
)

export default Header
