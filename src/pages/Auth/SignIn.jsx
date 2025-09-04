import { FORM_FIELD, PLACEHOLDER_FORM } from '../../constants/formField';

const SignIn = () => {
  const handleSignIn = () => {};

  return (
    <>
      <div className="m-0 p-0 box-border flex flex-col gap-15 bg-auto ">
        {/* head */}
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-5xl">Sign in</h2>
        </div>

        {/* form */}
        <div className="">
          <form action={handleSignIn} className="flex flex-col gap-5" name="basic-login">
            <input
              type="text"
              className="border-1 border-gray-500 p-4 pb-2 pt-2 w-80 rounded-4xl outline-0 focus:border-cyan-300"
              name={FORM_FIELD.USERNAME}
              placeholder={PLACEHOLDER_FORM.USERNAME}
            />

            <input
              type="password"
              className="border-1 border-gray-500 p-4 pb-2 pt-2 w-80 rounded-4xl outline-0 focus:border-cyan-300"
              name={FORM_FIELD.PASSWORD}
              placeholder={PLACEHOLDER_FORM.PASSWORD}
            />

            <div className="flex justify-between">
              <div className="flex gap-1.5 items-center">
                <input type="checkbox" name="remember" />
                <span>Remember me</span>
              </div>

              <div className="self-baseline-last underline underline-offset-2">Forgot Password?</div>
            </div>

            <button
              className="mt-10 p-2 rounded-4xl bg-gray-500 hover:bg-cyan-500 hover:text-black hover:font-medium cursor-pointer"
              type="submit"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;