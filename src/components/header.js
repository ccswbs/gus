import React from 'react';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby';
import HeaderMenu from 'components/shared/headerMenu';

const Header = ({ menuName }) => (
  <>
    <Helmet>
      <script src={withPrefix("/web-components/ug-header.js")}></script>
    </Helmet>
    <div id="header-breakpoint"></div>
    <ug-header>
      <HeaderMenu menuName={menuName} />
    </ug-header>
  </>
)

export default Header
