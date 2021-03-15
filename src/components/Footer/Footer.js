import React from 'react'

import appLogo from '../../Images/MediLogo.svg'

import './Footer.scss'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-line-first">
        <div className="footer-logo">
          <img src={appLogo} alt="Medi thanks logo"></img>
        </div>
        <div className="contact-email">
          <a href="mailto: medithanks21@gmail.com">Contact Us</a>
        </div>
      </div>
      <div className="footer-line-second">
        <p className="footer-text">
          &copy; 2021 Medithanks. All rights reserved.
        </p>
        <p className="private-policy-link">
          <a href="#private-policy">Privacy Policy</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
