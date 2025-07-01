import { Link, Navigate, useNavigate } from "react-router-dom";
import BackgroundImage from "../assets/images/onboarding.jpg";
import { Button } from "@/components/ui/button.jsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeClosed } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userRegister } from "@/redux/slices/user.js";
import toast from "react-hot-toast";

const loginSchema = yup
  .object({
    email: yup.string().email("Invalid email!").required("Email is required!"),
    password: yup
      .string()
      .required("Password is required!")
      .min(6, "Password must be at least 6 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one numeric digit")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
  })
  .required();

const registrationSchema = yup
  .object({
    username: yup
      .string()
      .required("Username is required!")
      .min(4, "Username must be at least 4 characters"),
    email: yup.string().email("Invalid email!").required("Email is required!"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one numeric digit")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
  })
  .required();

export default function Onboarding() {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    return <Navigate to="/home" />;
  }
  const [screen, setScreen] = useState("onboarding");
  const [isHidePassword, setIsHidePassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(
      screen === "login" ? loginSchema : registrationSchema
    ),
  });
  const { registerUserData, loginUserData, isLoading, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (data) => {
    try {
      const res = await dispatch(userLogin(data)).unwrap();
      const access_token = res?.access_token;
      if (access_token) {
        localStorage.setItem("access_token", access_token);
        navigate("/home");
        toast.success(`Welcome back ${res.user.username} to Stock App!`);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const handleRegister = async (data) => {
    try {
      const res = await dispatch(userRegister(data)).unwrap();
      const access_token = res?.access_token;
      if (access_token) {
        localStorage.setItem("access_token", access_token);
        navigate("/home");
        toast.success(`Welcome ${res.user.username} to Stock App!`);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return (
    <>
      <div className="flex h-screen">
        <section className="w-full lg:w-2/3 flex items-center justify-center h-full flex-col px-4">
          {screen === "onboarding" && (
            <>
              <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
                Check your mutual funds with our{" "}
                <span className="bg-gradient-to-r from-yellow-500 via-red-500 to-black-500 bg-clip-text text-transparent">
                  Stock APP!
                </span>
              </h2>
              <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
                A Stock checking application which allows you to keep track on
                your best performing stocks.
              </p>
              <div className="mt-4 z-50">
                <Button
                  onClick={() => setScreen("login")}
                  className="bg-gray-800 text-white cursor-pointer hover:bg-gray-900 transition duration-200 ease-in-out shadow-xl/30"
                >
                  Get Started!
                </Button>
              </div>
            </>
          )}
          {screen === "login" && (
            <>
              <div className="w-full max-w-[496px] z-50">
                <Link
                  href={"/"}
                  className="font-semibold text-gray-800 text-2xl"
                >
                  MERN Stock App
                </Link>
                <div className="my-4">
                  <h4 className="text-4xl font-semibold">Login 👋</h4>
                  <p className="text-gray-500 mt-3">A Stock checking app...</p>
                </div>
                <form
                  onSubmit={handleSubmit(handleLogin)}
                  className="flex flex-col gap-2"
                >
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-gray-400">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="border border-gray-500 rounded-md py-2 px-3"
                      placeholder="Enter your email here..."
                      defaultValue=""
                      {...register("email")}
                    />
                    {errors?.email?.message && (
                      <span className="text-sm text-red-500">
                        {errors?.email?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex relative flex-col gap-2">
                    <label htmlFor="email" className="text-gray-400">
                      Password
                    </label>
                    <input
                      type={isHidePassword ? "password" : "text"}
                      name="password"
                      className="border border-gray-500 rounded-md py-2 px-3"
                      placeholder={
                        isHidePassword
                          ? "*******"
                          : "Enter your password here..."
                      }
                      defaultValue=""
                      {...register("password")}
                    />
                    {errors?.password?.message && (
                      <span className="text-sm text-red-500">
                        {errors?.password?.message}
                      </span>
                    )}
                    <span
                      className="absolute top-11 right-4"
                      onClick={() => setIsHidePassword(!isHidePassword)}
                    >
                      {isHidePassword && isHidePassword ? (
                        <EyeClosed />
                      ) : (
                        <Eye />
                      )}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="py-2 px-3 bg-gray-700 hover:bg-gray-800 text-white rounded-[5px] font-semibold my-4 z-10"
                  >
                    {isLoading ? "Logging..." : "Login"}
                  </button>
                  <span>
                    <p
                      onClick={() => {
                        setScreen("registration");
                        reset();
                      }}
                      className="hover:underline cursor-pointer inline"
                    >
                      Don&apos;t have an account??
                    </p>
                  </span>
                </form>
              </div>
            </>
          )}
          {screen === "registration" && (
            <>
              <div className="w-full max-w-[496px] z-50">
                <Link
                  href={"/"}
                  className="font-semibold text-gray-800 text-2xl"
                >
                  MERN Stock App
                </Link>
                <div className="my-4">
                  <h4 className="text-4xl font-semibold">Register 👋</h4>
                  <p className="text-gray-500 mt-3">A Stock checking app...</p>
                </div>
                <form
                  onSubmit={handleSubmit(handleRegister)}
                  className="flex flex-col gap-2"
                >
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-gray-400">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      className="border border-gray-500 rounded-md py-2 px-3"
                      placeholder="Enter your username here..."
                      defaultValue=""
                      {...register("username")}
                    />
                    {errors?.username?.message && (
                      <span className="text-sm text-red-500">
                        {errors?.username?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-gray-400">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="border border-gray-500 rounded-md py-2 px-3"
                      placeholder="Enter your email here..."
                      defaultValue=""
                      {...register("email")}
                    />
                    {errors?.email?.message && (
                      <span className="text-sm text-red-500">
                        {errors?.email?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex relative flex-col gap-2">
                    <label htmlFor="email" className="text-gray-400">
                      Password
                    </label>
                    <input
                      type={isHidePassword ? "password" : "text"}
                      name="password"
                      className="border border-gray-500 rounded-md py-2 px-3"
                      placeholder={
                        isHidePassword
                          ? "*******"
                          : "Enter your password here..."
                      }
                      defaultValue=""
                      {...register("password")}
                    />
                    {errors?.password?.message && (
                      <span className="text-sm text-red-500">
                        {errors?.password?.message}
                      </span>
                    )}
                    <span
                      className="absolute top-11 right-4"
                      onClick={() => setIsHidePassword(!isHidePassword)}
                    >
                      {isHidePassword && isHidePassword ? (
                        <EyeClosed />
                      ) : (
                        <Eye />
                      )}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="py-2 px-3 bg-gray-700 hover:bg-gray-800 text-white rounded-[5px] font-semibold  my-4"
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </button>
                  <span>
                    <p
                      onClick={() => {
                        setScreen("login");
                        reset();
                      }}
                      className="hover:underline cursor-pointer inline"
                    >
                      Already have an account??
                    </p>
                  </span>
                </form>
              </div>
            </>
          )}
        </section>
        <section className="lg:flex w-full hidden -scale-x-100 lg:w-1/3  h-full right-0">
          <img
            src={BackgroundImage}
            alt="Onboarding image"
            className="object-cover w-full h-full"
          />
        </section>
      </div>
    </>
  );
}
