import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { type FieldValues, useForm } from "react-hook-form";
import useAuthStore from "@/store/auth-store";
import { useState } from "react";
import ForgetPassword from "./forget-password";

const LoginNavbar = ({
  className,
  close,
}: {
  className?: string;
  close: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuthStore((state) => state);
  const onSubmit = (_: FieldValues) => {
    login({
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
    });
    close();
  };
  const [forgetPassword, setForgetPassword] = useState(false);
  return (
    <div
      className={cn(
        "fixed page-root grid grid-cols-2 top-0 left-0 z-20 w-full h-20 md:h-16  !py-0 bg-white  justify-between shadow items-center",
        className
      )}
    >
      {forgetPassword && (
        <ForgetPassword
          close={close}
          backtoLogin={() => setForgetPassword(false)}
        />
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" col-span-2 md:col-span-1 h-full flex gap-8 items-center"
      >
        <div>
          <Input
            type="text"
            placeholder="Username or Email"
            className=""
            {...register("username", {
              required: {
                value: true,
                message: "Username or Email is required",
              },
            })}
          />
          {errors.username && (
            <p className="text-red-500 text-xs">
              {errors?.username?.message as string}
            </p>
          )}
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            className=""
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">
              {errors?.password?.message as string}
            </p>
          )}
        </div>
        <Button type="submit">Login</Button>
      </form>
      <div className=" col-span-2 md:col-span-1 flex md:justify-end space-x-3 items-center text-sm">
        <div className=" flex items-center gap-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className=" font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>
        <div className="w-px h-6 bg-gray-300" />
        <button
          type="button"
          onClick={() => setForgetPassword(true)}
          className=" cursor-pointer "
        >
          Forgot Password
        </button>
        <div className="w-px h-6 bg-gray-300" />
        <button type="button" onClick={close} className="cursor-pointer">
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginNavbar;
