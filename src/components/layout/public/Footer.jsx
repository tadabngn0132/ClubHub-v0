import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="pt-1 pb-1 pl-4 pr-4">
      <img src="" alt="GDC Logo" />
      <div className="flex justify-between">
        <div>
          <h1>
            Wanna <span>create</span> an
            <br />
            <span> unforgettable </span>
            <br />
            moment <span>together?</span>
          </h1>
          <button>GET IN TOUCH</button>
        </div>

        <div>
          <h3>PAGE NAVIGATION</h3>
          <div>
            <h4>
              Home <span>.</span> About <span>.</span> Account
            </h4>
          </div>
          <div>
            <p>
              Activities <span>.</span> Members
            </p>
          </div>
        </div>

        <div>
          <div>
            <h3>CONTACT</h3>
            <p>@gdc.fpt2022@gmail.com</p>
          </div>

          <div>
            <h3>FOLLOW US</h3>
            <div>
              <FontAwesomeIcon icon={faFacebookF} />
              <FontAwesomeIcon icon={faInstagram} />
              <FontAwesomeIcon icon={faTiktok} />
              <FontAwesomeIcon icon={faYoutube} />
            </div>
          </div>
        </div>
      </div>

      <p className="border-b-1">&copy; GDC - Greenwich Dance Crew</p>
    </div>
  );
};

export default Footer;
