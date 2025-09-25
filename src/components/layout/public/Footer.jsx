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
      <img className="w-60 xl:w-55" src="src/assets/logos/GDC_logo.svg" alt="GDC Logo" />
      <div className="flex flex-col items-start lg:flex-row lg:justify-between lg:items-end">
        <div>
          <h1 className="monument-regular text-[1.6rem] md:text-4xl xl:text-3xl">
            Wanna <span className="pink-color">create</span> an
            <br />
            <span className="pink-color"> unforgettable </span>
            <br />
            moment <span className="pink-color">together?</span>
          </h1>

          <button className="pink-bg-color  font-[600] p-1 pl-6 pr-6 rounded-4xl mt-4 cursor-pointer">
            GET IN TOUCH
          </button>
        </div>

        <div className="flex flex-col justify-baseline mt-10 xl:mt-0 gap-6 xl:gap-4 xl:h-full xl:items-end">
          <div className="flex flex-col text-xl xl:text-lg items-start gap-1 ">
            <h3 className="pink-color font-medium xl:self-end">CONTACT</h3>
            <p>@gdc.fpt2022@gmail.com</p>
          </div>

          <div className="flex flex-col items-start gap-1">
            <h3 className="pink-color text-xl xl:text-lg font-medium mb-1.5 xl:self-end">FOLLOW US</h3>
            <div className="">
              <a href="https://www.facebook.com/gdcgwdance" className="hover:text-[#DB3F7A] text-lg mr-4.5 xl:mr-0 xl:ml-4.5">
                <FontAwesomeIcon icon={faFacebookF} size="lg" />
              </a>
              <a href="https://www.instagram.com/gdc.gwhn/" className="hover:text-[#DB3F7A] text-lg mr-4.5 xl:mr-0 xl:ml-4.5">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a href="https://www.tiktok.com/@greenwichdancecrew" className="hover:text-[#DB3F7A] text-lg mr-4.5 xl:mr-0 xl:ml-4.5">
                <FontAwesomeIcon icon={faTiktok} size="lg" />
              </a>
              <a href="https://www.youtube.com/@GDC-GreenwichDanceCrew" className="hover:text-[#DB3F7A] text-lg mr-4.5 xl:mr-0 xl:ml-4.5">
                <FontAwesomeIcon icon={faYoutube} size="lg" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-1 lg:mt-12 xl:mt-8 gap-6">
        <p className="border-b-1 text-[12.5px]">&copy; GDC - Greenwich Dance Crew</p>
        <img src="src/assets/items/footer.webp" alt="Footer image" />
      </div>
    </div>
  );
};

export default Footer;
