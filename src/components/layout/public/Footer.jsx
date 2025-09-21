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
      <img className="w-60" src="src/assets/logos/GDC_logo.svg" alt="GDC Logo" />
      <div className="flex justify-between">
        <div>
          <h1 className="monument-regular text-3xl">
            Wanna <span className="pink-color">create</span> an
            <br />
            <span className="pink-color"> unforgettable </span>
            <br />
            moment <span className="pink-color">together?</span>
          </h1>

          <button className="monument-regular pink-bg-color text-[14px] p-2.5 pl-4 pr-4 rounded-4xl mt-6 cursor-pointer">
            GET IN TOUCH
          </button>
        </div>

        <div className="flex gap-30">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col items-end gap-1">
              <h3 className="pink-color font-medium">CONTACT</h3>
              <p>@gdc.fpt2022@gmail.com</p>
            </div>

            <div className="flex flex-col items-end gap-1">
              <h3 className="pink-color font-medium mb-1.5">FOLLOW US</h3>
              <div className="">
                <a href="https://www.facebook.com/gdcgwdance" className="hover:text-[#DB3F7A] text-lg">
                  <FontAwesomeIcon icon={faFacebookF} size="xl" />
                </a>
                <a href="https://www.instagram.com/gdc.gwhn/" className="hover:text-[#DB3F7A] text-lg">
                  <FontAwesomeIcon icon={faInstagram} size="xl" />
                </a>
                <a href="https://www.tiktok.com/@greenwichdancecrew" className="hover:text-[#DB3F7A] text-lg">
                  <FontAwesomeIcon icon={faTiktok} size="xl" />
                </a>
                <a href="https://www.youtube.com/@GDC-GreenwichDanceCrew" className="hover:text-[#DB3F7A] text-lg">
                  <FontAwesomeIcon icon={faYoutube} size="xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <p className="border-b-1 mt-12">&copy; GDC - Greenwich Dance Crew</p>
        <img src="src/assets/items/footer.webp" alt="Footer image" />
      </div>
    </div>
  );
};

export default Footer;
