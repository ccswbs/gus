import React from "react";
import 'styles/ovc/social-icons.css';

// Social icons
import {
  FaInstagram,
  FaFacebookSquare,
  FaTwitterSquare,
  FaLinkedin,
  FaYoutubeSquare
} from "react-icons/fa";

const FooterSocial = () => (
  <div>
    <h4 className="mt-4 text-dark">Stay Connected</h4>
    <a href="https://instagram.com/ontvetcollege/" className="text-dark-social">
      <span className="sr-only">Connect with OVC on Instagram</span>
      <FaInstagram style={{fontSize: "4.8rem"}}/>
    </a>
    <a href="https://www.linkedin.com/school/ontario-veterinary-college/" className="text-dark-social">
      <span className="sr-only">Connect with OVC on LinkedIn</span>
      <FaLinkedin style={{fontSize: "4.8rem"}}/>
    </a>
    <a href="http://www.facebook.com/ontvetcollege" className="text-dark-social">
      <span className="sr-only">Connect with OVC on Facebook</span>
      <FaFacebookSquare style={{fontSize: "4.8rem"}} />
    </a>
    <a href="http://twitter.com/OntVetCollege/" className="text-dark-social">
      <span className="sr-only">Connect with OVC on Twitter</span>
      <FaTwitterSquare style={{fontSize: "4.8rem"}} />
    </a>
    <a href="http://www.youtube.com/user/OntarioVetCollege" className="text-dark-social">
      <span className="sr-only">Connect with OVC on YouTube</span>
      <FaYoutubeSquare style={{fontSize: "4.8rem"}} />
    </a>
  </div>
)

export default FooterSocial