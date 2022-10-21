import React from 'react';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby';

const Footer = () => (
  <>
    <Helmet>
      <script src={withPrefix("/web-components/ug-footer.js")}></script>
    </Helmet>
    <ug-footer className="unloaded"></ug-footer>
  </>
)

export default Footer
