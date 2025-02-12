import React from "react";

const FooterSocial = () => (
  <div>
    <h4 className="mt-4 text-dark">Stay Connected</h4>
    <div className="d-md-flex flex-wrap gap-3">
      <a href="https://instagram.com/ontvetcollege/" className="btn btn-outline-secondary text-dark-social">
        <span className="visually-hidden">Connect with OVC on Instagram</span>
        <i className="fa-brands fa-instagram fs-1 p-3" aria-hidden="true" />
      </a>
      <a href="https://www.linkedin.com/school/ontario-veterinary-college/" className="btn btn-outline-secondary text-dark-social">
        <span className="visually-hidden">Connect with OVC on LinkedIn</span>
        <i className="fa-brands fa-linkedin fs-1 p-3" aria-hidden="true"><span className="d-none">&nbsp;</span></i>
      </a>
      <a href="https://www.facebook.com/ontvetcollege" className="btn btn-outline-secondary text-dark-social">
        <span className="visually-hidden">Connect with OVC on Facebook</span>
        <i className="fa-brands fa-facebook fs-1 p-3" aria-hidden="true"><span className="d-none">&nbsp;</span></i>
      </a>
      <a href="https://twitter.com/OntVetCollege/" className="btn btn-outline-secondary text-dark-social">
        <span className="visually-hidden">Connect with OVC on Twitter</span>
        <i className="fa-brands fa-x-twitter fs-1 p-3" aria-hidden="true"><span className="d-none">&nbsp;</span></i>
      </a>
      <a href="https://www.youtube.com/user/OntarioVetCollege" className="btn btn-outline-secondary text-dark-social">
        <span className="visually-hidden">Connect with OVC on YouTube</span>
        <i className="fa-brands fa-youtube fs-1 p-3" aria-hidden="true"><span className="d-none">&nbsp;</span></i>
      </a>
    </div>
  </div>
)

export default FooterSocial