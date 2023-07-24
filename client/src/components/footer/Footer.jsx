import React from 'react';
import { FaPhone, FaYoutube, FaGithub } from 'react-icons/fa'; // Import Font Awesome icons
import { Link } from 'react-router-dom';
import classes from './footer.module.css';

const Footer = () => {
  return (
    <footer>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About Bangla Village</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam illum quam optio autem suscipit incidunt dicta dolorum eum dolores recusandae laboriosam expedita quo facilis, numquam et.
            Delectus atque dolorum sapiente.
          </p>
        </div>
        <div className={classes.col}>
          <h2>Contacts</h2>
          <span>
            <FaPhone className={classes.icon} /> Phone: +123 456 789
          </span>
          <a href="https://www.youtube.com/banglavillage" target="_blank" rel="noopener noreferrer">
            <FaYoutube className={classes.icon} /> YouTube: Bangla Village
          </a>
          <a href="https://github.com/banglavillage" target="_blank" rel="noopener noreferrer">
            <FaGithub className={classes.icon} /> GitHub: Bangla Village
          </a>
        </div>
        <div className={classes.col}>
          <h2>USA Office</h2>
          <span> Address : 37-22, 73rd Street,<br/>  Suite #2F, Jackson Heights, <br/>  New York
 </span>
        </div>
      </div>
      <div className={classes.privacyPolicy}>
        <Link to="/privacy-policy">Privacy Policy</Link>
      </div>
      
    </footer>
  );
};

export default Footer;
