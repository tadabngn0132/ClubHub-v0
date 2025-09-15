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
          <h1 className="text-[2.75rem] font-medium leading-12">
            Wanna <span className="text-pink-500">create</span> an
            <br />
            <span className="text-pink-500"> unforgettable </span>
            <br />
            moment <span className="text-pink-500">together?</span>
          </h1>

          <button className="bg-pink-500 p-1 pl-4 pr-4 rounded-4xl mt-6 font-medium">
            GET IN TOUCH
          </button>
        </div>

        <div className="flex gap-40">
          <div>
            <h3 className="text-pink-500 font-medium">PAGE NAVIGATION</h3>
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
              <h3 className="text-pink-500 font-medium">CONTACT</h3>
              <p>@gdc.fpt2022@gmail.com</p>
            </div>

            <div className="flex flex-col items-end">
              <h3 className="text-pink-500 font-medium">FOLLOW US</h3>
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

      <p className="border-b-1 mt-12">&copy; GDC - Greenwich Dance Crew</p>
    </div>
  );
};

export default Footer;
