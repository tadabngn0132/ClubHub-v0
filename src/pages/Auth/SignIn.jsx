import { Link } from "react-router-dom"

const SignIn = () => {
  return (
    <div className="flex justify-between bg-black w-full xl:w-10/12 rounded-[3rem] relative">
      <div className="hidden xl:flex xl:flex-col xl:p-10 xl:pt-8 xl:justify-between">
        <video className="object-cover w-2/3 h-full absolute top-0 left-0 z-[0] rounded-[3rem] rounded-r-none opacity-75" src="src/assets/videos/flirting.webm" autoPlay loop muted></video>
        <div className="flex z-10">
          <img className="w-25 ml-7" src="src/assets/logos/GDC_logo.svg" alt="GDC Logo" />
          <img className="w-25" src="src/assets/logos/2025-Greenwich-White-Eng.png" alt="UoG Logo" />
        </div>
        <div className="flex flex-col z-10">
          <img className="w-125" src="src/assets/items/sign_in.webp" alt="Hello" />
          <p className="ml-7 text-xs w-2/3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>

      <div className="flex flex-col items-center w-full xl:w-2/5 p-10 pl-16 pr-16 md:rounded-[3rem] z-10 bg-[url(src/assets/backgrounds/sign_in_background/GDC_background_phone_dọc_full_màn.webp)] xl:bg-[url(src/assets/backgrounds/sign_in_background/GDC_background_web.webp)] bg-cover bg-center relative">
        <Link to="/" className="absolute w-10 top-30 left-1.5 m-4">
          <img src="src/assets/icons/back_to_home_icon.svg" alt="Back to Home" />
        </Link>
        <h1 className="monument-extra-bold text-4xl text-black mb-6 mt-24 xl:mt-24 w-[87%] xl:w-10/12">
          Welcome <br /> Back!
        </h1>
        <form action="" className="flex flex-col w-[87%] items-center text-[15px] xl:text-[16px] xl:w-10/12">
          <div className="flex items-center relative w-full">
            <img className="w-4.5 absolute left-5" src="src/assets/icons/user_icon.svg" alt="User icon" />
            <button className="bg-[#d0d0d0] text-black p-2 pt-2.5 pb-2.5 pl-14 xl:pl-16 rounded-[1.25rem] w-1/1 text-left cursor-pointer">
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
              <img className="w-5 absolute left-5" src="src/assets/icons/email_icon.svg" alt="Email icon" />
              <input
                type="email"
                placeholder="Email Address"
                className="p-2 pt-2.5 pb-2.5 pl-14 xl:pl-16 text-[#454545] bg-[#d0d0d0] rounded-[1.25rem] placeholder-[#454545] w-full focus:outline-none focus:border-[var(--pink-color)] border-2 border-transparent"
              />
            </div>

            <span className="text-[var(--red-color)] text-[10px] xl:text-xs pl-4 mb-2">Email cannot be empty</span>

            <div className="flex items-center relative">
              <img className="w-5 absolute left-5" src="src/assets/icons/lock_icon.svg" alt="Lock icon" />
              <input
                type="password"
                placeholder="Password"
                className="p-2 pt-2.5 pb-2.5 pl-14 xl:pl-16 text-[#454545] bg-[#d0d0d0] rounded-[1.25rem] placeholder-[#454545] w-full focus:outline-none focus:border-[var(--pink-color)] border-2 border-transparent"
              />
            </div>

            <div className="flex justify-between">
              <span className="text-[var(--red-color)] text-[10px] xl:text-xs pl-4 mb-2">Password cannot be empty</span>
              <Link to="/forgot-password" className="mb-3 self-end text-black text-[10px] xl:text-xs">Forgot Password?</Link>
            </div>
          </div>

          <input type="submit" value="SIGN IN" className="monument-regular text-[var(--black-color)] bg-[var(--pink-color)] w-fit pt-[6px] pb-1 pl-8 pr-8 rounded-2xl mt-5 mb-52 xl:mb-24 shadow-white-centered font-bold cursor-pointer self-start"/>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
