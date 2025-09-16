import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="flex flex-col p-2 pl-9 pr-9 gap-6">
      <img className="w-50" src="src/assets/logos/logo.webp" alt="GDC Logo" />
      <div className="flex justify-between">
        <div>
          <h1 className="monument-extra-bold text-[1.75rem] font-medium">
            Wanna <span className="pink-color">create</span> an
            <br />
            <span className="pink-color"> unforgettable </span>
            <br />
            moment <span className="pink-color">together?</span>
          </h1>

          <button className="pink-bg-color p-1 pl-4 pr-4 rounded-4xl mt-6 font-medium">
            GET IN TOUCH
          </button>
        </div>

        <div className="flex gap-40">
          <div>
            <h3 className="pink-color font-medium">PAGE NAVIGATION</h3>
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

          <div className="flex flex-col justify-between">
            <div className="flex flex-col items-end">
              <h3 className="pink-color font-medium">CONTACT</h3>
              <p>@gdc.fpt2022@gmail.com</p>
            </div>

            <div className="flex flex-col items-end">
              <h3 className="pink-color font-medium">FOLLOW US</h3>
              <div>
                <FontAwesomeIcon icon={faFacebookF} />
                <FontAwesomeIcon icon={faInstagram} />
                <FontAwesomeIcon icon={faTiktok} />
                <FontAwesomeIcon icon={faYoutube} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="border-b-1 mt-12">&copy; GDC - Greenwich Dance Crew</p>
        <img src="src/assets/backgrounds/text-footer.webp" alt="Footer image" />
      </div>
    </div>
  );
};

export default Footer;
