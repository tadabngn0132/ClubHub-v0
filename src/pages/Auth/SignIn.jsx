import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons"

const SignIn = () => {
  return (
    <div className="flex justify-between bg-black w-9/12 rounded-[3rem]">
      <div className="flex flex-col p-10 pt-8 justify-between">
        <div className="flex">
          <img className="w-25" src="src/assets/logos/GDC_logo.svg" alt="GDC Logo" />
          <img className="w-25" src="src/assets/logos/2025-Greenwich-White-Eng.png" alt="UoG Logo" />
        </div>
        <div>
          <img src="src/assets/items/sign_in.webp" alt="Hello" />
          <p>Lorem ipsum</p>
        </div>
      </div>
      <div className="flex flex-col items-center pink-bg-color w-2/5 p-10 pl-14 pr-14 rounded-[3rem]">
        <h1 className="monument-extra-bold text-3xl text-black mb-20 w-11/12">
          Welcome <br /> Back!
        </h1>
        <form action="" className="flex flex-col w-11/12">
          <div className="flex flex-col gap-2.5 mb-1">
            <div className="flex items-center relative">
              <FontAwesomeIcon icon={faEnvelope} size="lg" className="absolute text-[#454545] left-3"/>
              <input
                type="email"
                placeholder="Email Address"
                className="p-2 pl-14 text-[#454545] bg-white rounded-[1rem] placeholder-[#454545] w-full"
              />
            </div>

            <div className="flex items-center relative">
              <FontAwesomeIcon icon={faLock} size="lg" className="absolute text-[#454545] left-3" />
              <input
                type="password"
                placeholder="Password"
                className="p-2 pl-14 text-[#454545] bg-white rounded-[1rem] placeholder-[#454545] w-full"
              />
            </div>
          </div>

          <a className="mb-8 pl-4" href="">Forgot Password?</a>

          <div className="flex flex-col gap-2.5 mb-1 w-full">
            <div className="flex items-center relative">
              <FontAwesomeIcon icon={faGoogle} size="2xl" className="absolute text-black left-2"/>
              <input 
                type="button" 
                value="Signin with Google"
                className="bg-white text-black p-2 pl-14 pr-14 rounded-2xl w-full text-left cursor-pointer"
              />
            </div>

            <div className="flex items-center relative">
              <FontAwesomeIcon icon={faUser} size="2xl" className="absolute text-black left-2"/>
              <input 
                type="button" 
                value="Signin with email fpt.edu.vn"
                className="bg-white text-black p-2 pl-14 pr-14 rounded-2xl w-1/1 text-left cursor-pointer"
              />
            </div>
          </div>

          <input type="button" value="SIGN IN" className="pink-color bg-white w-fit p-1 pl-8 pr-8 rounded-2xl mt-5 shadow-white-centered font-bold cursor-pointer"/>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
