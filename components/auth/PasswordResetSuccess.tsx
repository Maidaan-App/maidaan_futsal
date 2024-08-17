import Description from "../Description";
import Heading from "../Heading";
import { Button } from "../ui/button";

const PasswordResetSuccess = ({ onContinue, onBackToLogin }: any) => {
  return (
    <div className="">
      <img
        src="/Group.png"
        alt=""
        className="h-[3.4475rem] w-[4.625rem] mb-4 "

      />
      <Heading heading={`Forgot password`} />
      <Description
        description={`We have sent a password reset link in your email`}
      />
      <p className="font-normal text-[1rem] mb-6 text-[#1E1E1E]">
        maidaan@gmail.com
      </p>
      <Button variant={"default"} className="w-full mb-4" onClick={onContinue}>
        Continue
      </Button>
      <Button variant={"outline"} className="w-full" onClick={onBackToLogin}>
        Back to login
      </Button>
      <p className="mt-4 text-sm">
        Didn&apos;t receive the mail?{" "}
        <a href="#" className="text-[#3169FF] font-medium">
          Click to resend
        </a>
      </p>
      <p className="mt-6 text-sm">© 2024 | maidaan.com</p>
    </div>
  );
};

export default PasswordResetSuccess;
