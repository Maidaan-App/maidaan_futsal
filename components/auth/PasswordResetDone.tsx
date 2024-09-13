import { Button } from "@/components/ui/button";
import Heading from "@/components/Heading";
import Description from "@/components/Description";
import Copyright from "../Copyright";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { paths } from "@/lib/paths";

const PasswordResetDone = () => {
  return (
    <div>
      <AnimatePresence>
        <motion.div
          key="forgot-password"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 1 }}
        >
          <img src="/Group.png" alt="" className="h-[3.4475rem] w-[4.625rem] mx-auto md:mx-0" />
          <Heading heading={`All done!`} />
          <Description description={`Your password has been reset.`} />
          <Link href={paths.auth.login}>
          <Button variant={"default"} className="w-full my-3">
            Login now
          </Button>
          </Link>
          <Copyright />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PasswordResetDone;
