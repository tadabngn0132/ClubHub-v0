import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { loginUser, resetAuthError } from "../../store/slices/authSlice";
import toast from "react-hot-toast";
import gdcLogo from "../../assets/logos/GDC_logo.svg";
import uogLogo from "../../assets/logos/2025-Greenwich-White-Eng.png";
import bgVideo from "../../assets/videos/flirting_1080p.webm";
import signInImage from "../../assets/items/sign_in.webp";
import backToHomeIcon from "../../assets/icons/back_to_home_icon.svg";
import userIcon from "../../assets/icons/user_icon.svg";
import emailIcon from "../../assets/icons/email_icon.svg";
import lockIcon from "../../assets/icons/lock_icon.svg";
import bgFormImage from "../../assets/backgrounds/sign_in_background/GDC_background.webp";
import { AUTH_REMEMBER_DAY_OPTIONS } from "../../utils/constants";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
      rememberForDays: AUTH_REMEMBER_DAY_OPTIONS[1],
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const rememberMe = watch("rememberMe");

  const handleLogin = async (formData) => {
    const resData = await dispatch(loginUser(formData)).unwrap();

    if (
      resData.data.necessaryUserData.userPosition[0].position.systemRole.toLowerCase() ===
      "admin"
    ) {
      navigate("/admin/dashboard");
    } else if (
      resData.data.necessaryUserData.userPosition[0].position.systemRole.toLowerCase() ===
      "moderator"
    ) {
      navigate("/moderator/dashboard");
    } else if (
      resData.data.necessaryUserData.userPosition[0].position.systemRole.toLowerCase() ===
      "member"
    ) {
      navigate("/member/dashboard");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthError());
    }
  }, [error]);

  const handlePasswordView = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleGoogleLogin = () => {
    window.location.href = `http://localhost:5995/api/auth/google-auth`;
  };

  return (
    <div className="flex w-full min-h-[var(--pub-main-min-h)] items-center-safe justify-center-safe lg:pl-[var(--pub-container-padding-x)] lg:pr-[var(--pub-container-padding-x)]">
      <div className="flex justify-between bg-black w-full xl:w-11/12 2xl:w-10/12 rounded-[3rem] relative">
        <div className="hidden lg:flex lg:flex-col lg:p-10 lg:pt-8 lg:justify-between">
          <video
            className="object-cover lg:w-2/3 2xl:w-7/10 h-full absolute top-0 left-0 z-[0] rounded-[3rem] rounded-r-none opacity-75 animate-scale-bigger animate-slide-left"
            src={bgVideo}
            autoPlay
            loop
            muted
          ></video>
          <div className="flex z-10 animate-slide-left">
            <img className="w-25 ml-7" src={gdcLogo} alt="GDC Logo" />
            <img className="w-25" src={uogLogo} alt="UoG Logo" />
          </div>
          <div className="flex flex-col z-10 animate-slide-left">
            <img className="w-125  2xl:w-138" src={signInImage} alt="Hello" />
            <p className="ml-7 text-xs w-2/3">
              Access Greenwich Dance Club member portal to check schedules,
              connect with members, and stay updated on all GDC activities.
            </p>
          </div>
        </div>

        <div
          className="flex flex-col items-center justify-center-safe w-full min-h-[var(--sign-in-form-min-h)] lg:w-6/12 xl:w-[46%] 2xl:w-2/5 p-10 pl-21 pr-21 sm:pl-51 sm:pr-51 md:pl-66 md:pr-66 lg:pl-24 lg:pr-24 xl:pl-22 xl:pr-22 lg:rounded-[5rem] z-10 bg-auto md:bg-size-[auto_1920px] lg:bg-auto bg-current bg-center relative animate-slide-right"
          style={{ backgroundImage: `url(${bgFormImage})` }}
        >
          {/* Form header */}
          <div className="flex mb-6 w-full relative">
            <Link
              to="/"
              className="absolute w-10 top-0 left-[-80px] m-4 hover:opacity-70"
            >
              <img src={backToHomeIcon} alt="Back to Home" />
            </Link>
            <h1 className="monument-extra-bold text-4xl text-black w-full">
              Welcome <br /> Back!
            </h1>
          </div>

          {/* Form main */}
          <form
            action=""
            onSubmit={handleSubmit(handleLogin)}
            className="flex flex-col w-full items-center text-[15px] lg:text-[16px]"
          >
            {/* Login with Google buton */}
            <div className="flex items-center relative w-full">
              <img
                className="w-4.5 absolute left-5"
                src={userIcon}
                alt="User icon"
              />
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="bg-[#d0d0d0] text-black p-2 pt-2.5 pb-2.5 pl-14 rounded-[1.25rem] w-1/1 text-left cursor-pointer"
              >
                Signin with email
                <span className="text-[var(--pink-color)] ml-1 w-fit">
                  fpt.edu.vn
                </span>
              </button>
            </div>

            <div className="flex items-end text-[14px] w-full mt-4 mb-6 text-[var(--pink-color)] font-medium">
              <span className="w-[12%] border-b-2 border-[#d0d0d0]"></span>
              <span className="w-[76%] text-center p-0">
                OR LOGIN WITH YOUR EMAIL
              </span>
              <span className="w-[12%] border-b-2 border-[#d0d0d0]"></span>
            </div>

            {/* Email field */}
            <div className="flex flex-col gap-0.5 mb-1 w-full">
              <div className="flex flex-col mb-2">
                <div className="flex items-center relative">
                  <img
                    className="w-5 absolute left-5"
                    src={emailIcon}
                    alt="Email icon"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="p-2 pt-2.5 pb-2.5 pl-14 text-[#454545] bg-[#d0d0d0] rounded-[1.25rem] placeholder-[#454545] w-full focus:outline-none focus:border-[var(--pink-color)] border-2 border-transparent"
                    {...register("email", {
                      required: "Email cannot be empty",
                      pattern: {
                        value: /^[A-Za-z0-9]+@fpt\.edu\.vn$/,
                        message: "Email must have @fpt.edu.vn tail",
                      },
                    })}
                  />
                </div>
                {/* Email error */}
                {errors.email && (
                  <span className="text-[var(--red-color)] text-[10px] lg:text-[11px] pl-4">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password field */}
              <div className="flex items-center relative">
                <img
                  className="w-5 absolute left-5"
                  src={lockIcon}
                  alt="Lock icon"
                />
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Password"
                  className="p-2 pt-2.5 pb-2.5 pl-14 text-[#454545] bg-[#d0d0d0] rounded-[1.25rem] placeholder-[#454545] w-full focus:outline-none focus:border-[var(--pink-color)] border-2 border-transparent"
                  {...register("password", {
                    required: "Password cannot be empty",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                <span
                  onClick={handlePasswordView}
                  className="flex items-center-safe justify-center-safe absolute right-5 text-[var(--pink-color)] p-1 cursor-pointer hover:opacity-70"
                >
                  <FontAwesomeIcon
                    icon={isPasswordVisible ? faEyeSlash : faEye}
                  />
                </span>
              </div>

              {errors.password && (
                <div className="flex flex-col w-full justify-between">
                  {/* Password error */}
                  <span className="text-[var(--red-color)] text-[10px] lg:text-[11px] pl-4">
                    {errors.password.message}
                  </span>
                </div>
              )}

              <div className="w-full mb-3 rounded-2xl border border-white/35 px-4 py-3 backdrop-blur-[1px]">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <label className="flex items-center gap-1.5 text-[12px] text-black select-none cursor-pointer leading-none">
                    <input
                      type="checkbox"
                      className="accent-[var(--pink-color)] mt-[1px]"
                      {...register("rememberMe")}
                    />
                    <span className="font-semibold tracking-[0.01em]">
                      Remember me
                    </span>
                    <span
                      className="text-[11px] text-[#545454] self-start mt-0.5"
                      title="When enabled, your session is persisted and auto-expires after the selected duration."
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </span>
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-[10px] lg:text-[11px] font-medium text-[#272727] underline underline-offset-2 decoration-transparent hover:decoration-[var(--pink-color)] hover:text-[var(--pink-color)] transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-black">
                  <span className="font-medium text-[#3d3d3d]">
                    Keep me signed in for
                  </span>
                  <select
                    className="min-w-[92px] bg-[#e0e0e0]/50 rounded-lg px-1.75 py-0.75 outline-none border border-transparent focus:border-[var(--pink-color)] disabled:opacity-55 disabled:cursor-not-allowed text-[#222] font-medium"
                    disabled={!rememberMe}
                    {...register("rememberForDays", { valueAsNumber: true })}
                  >
                    {AUTH_REMEMBER_DAY_OPTIONS.map((day) => (
                      <option key={day} value={day}>
                        {day} day{day > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <input
              type="submit"
              value={isLoading ? "SIGNING IN..." : "SIGN IN"}
              className="monument-regular text-[var(--black-color)] bg-[var(--pink-color)] w-fit pt-[6px] pb-1 pl-8 pr-8 rounded-2xl mt-1.5 shadow-white-centered font-bold cursor-pointer self-start hover:bg-[var(--dark-pink-color)] hover:text-white"
              disabled={isLoading}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
