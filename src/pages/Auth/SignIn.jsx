import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons"

const SignIn = () => {
  return (
    <div className="flex justify-between bg-black w-2/3 rounded-[3rem]">
      <div className="flex flex-col p-10 pt-8 justify-between">
        <div className="flex">
          <img className="w-25" src="src/assets/logos/logo.webp" alt="GDC Logo" />
          <img src="" alt="UoG Logo" />
        </div>
        <div>
          <img src="" alt="Hello" />
          <p>Lorem ipsum</p>
        </div>
      </div>
      <div className="flex flex-col items-start pink-bg-color w-max p-12 pl-16 pr-16 rounded-[3rem]">
        <h1 className="monument-extra-bold text-3xl text-black mb-20">
          Welcome <br /> Back!
        </h1>
        <form action="" className="flex flex-col">
          <div className="flex flex-col gap-2.5 mb-1">
            <div className="flex items-center relative">
              <FontAwesomeIcon icon={faEnvelope} size="lg" className="absolute text-[#454545] left-3"/>
              <input
                type="email"
                placeholder="Email Address"
                className="p-2 pl-14 text-[#454545] bg-white rounded-[1rem] placeholder-[#454545] w-1/1"
              />
            </div>

            <div className="flex items-center relative">
              <FontAwesomeIcon icon={faLock} size="lg" className="absolute text-[#454545] left-3" />
              <input
                type="password"
                placeholder="Password"
                className="p-2 pl-14 text-[#454545] bg-white rounded-[1rem] placeholder-[#454545] w-1/1"
              />
            </div>
          </div>

          <a className="mb-8 pl-4" href="">Forgot Password?</a>

          <div className="flex flex-col gap-2.5 mb-1">
            <div className="flex items-center relative">
              <FontAwesomeIcon icon={faGoogle} size="2xl" className="absolute text-black left-2"/>
              <input 
                type="button" 
                value="Signin with Google"
                className="bg-white text-black p-2 pl-14 pr-14 rounded-2xl w-1/1 text-left"
              />
            </div>

            <div className="flex items-center relative">
              <FontAwesomeIcon icon={faUser} size="2xl" className="absolute text-black left-2"/>
              <input 
                type="button" 
                value="Signin with email fpt.edu.vn"
                className="bg-white text-black p-2 pl-14 pr-14 rounded-2xl w-1/1 text-left"
              />
            </div>
          </div>

          <input type="button" value="SIGN IN" className="pink-color bg-white w-fit p-1 pl-4 pr-4 rounded-2xl mt-5"/>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
