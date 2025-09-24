import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons"

const SignIn = () => {
  return (
    <div className="flex justify-between bg-black w-full md:w-10/12 rounded-[3rem] relative">
      <div className="hidden md:flex md:flex-col md:p-10 md:pt-8 md:justify-between">
        <video className="object-cover w-2/3 h-full absolute top-0 left-0 z-[0] rounded-[3rem] rounded-r-none opacity-75" src="src/assets/videos/flirting.webm" autoPlay loop muted></video>
        <div className="flex z-10">
          <img className="w-25 ml-7" src="src/assets/logos/GDC_logo.svg" alt="GDC Logo" />
          <img className="w-25" src="src/assets/logos/2025-Greenwich-White-Eng.png" alt="UoG Logo" />
        </div>
        <div className="flex flex-col z-10">
          <img className="w-125" src="src/assets/items/sign_in.webp" alt="Hello" />
          <p className="ml-7">Lorem ipsum</p>
        </div>
      </div>

      <div className="flex flex-col items-center bg-white w-full md:w-2/5 p-10 pl-16 pr-16 rounded-[3rem] z-10">
        <h1 className="monument-extra-bold text-4xl text-black mb-6 mt-14 md:mt-16 w-full md:w-10/12">
          Welcome <br /> Back!
        </h1>
        <form action="" className="flex flex-col w-full items-center text-[14px] md:text-[16px] md:w-10/12">
          <div className="flex items-center relative w-full">
            <FontAwesomeIcon icon={faUser} size="xl" className="absolute text-black left-4"/>
            <button className="bg-[#d0d0d0] text-black p-2 pt-3 pb-3 pl-16 rounded-2xl w-1/1 text-left cursor-pointer">
              Sign in with email<span className="text-[var(--pink-color)] ml-1 w-fit">fpt.edu.vn</span>
            </button>
          </div>

          <div className="flex items-end text-[14px] w-full mt-4 mb-6 text-[var(--pink-color)] font-medium">
            <span className="w-[12%] border-b-2 border-[#d0d0d0]"></span>
            <span className="w-[76%] text-center p-0">OR LOGIN WITH YOUR EMAIL</span>
            <span className="w-[12%] border-b-2 border-[#d0d0d0]"></span>
          </div>

          <div className="flex flex-col gap-0.5 mb-1 w-full">
            <div className="flex items-center relative">
              <FontAwesomeIcon icon={faEnvelope} size="xl" className="absolute text-[#454545] left-4"/>
              <input
                type="email"
                placeholder="Email Address"
                className="p-2 pt-3 pb-3 pl-16 text-[#454545] bg-[#d0d0d0] rounded-[1rem] placeholder-[#454545] w-full"
              />
            </div>

            <span className="text-[var(--pink-color)] text-xs pl-4 mb-2">Email cannot be empty</span>

            <div className="flex items-center relative">
              <FontAwesomeIcon icon={faLock} size="xl" className="absolute text-[#454545] left-4" />
              <input
                type="password"
                placeholder="Password"
                className="p-2 pt-3 pb-3 pl-16 text-[#454545] bg-[#d0d0d0] rounded-[1rem] placeholder-[#454545] w-full"
              />
            </div>

            <div className="flex justify-between">
              <span className="text-[var(--pink-color)] text-xs pl-4 mb-2">Password cannot be empty</span>
              <Link to="/forgot-password" className="mb-3 self-end text-black text-xs">Forgot Password?</Link>
            </div>
          </div>

          <input type="submit" value="SIGN IN" className="monument-regular text-[var(--black-color)] bg-[var(--pink-color)] w-fit pt-[6px] pb-1 pl-8 pr-8 rounded-2xl mt-5 mb-16 shadow-white-centered font-bold cursor-pointer md:self-start"/>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
