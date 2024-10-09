import React, { useContext, useEffect, useState } from "react";
import LoginInput from "../../components/common/LoginInput";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const initialForm = {
  user_name: "",
  user_email: "",
  user_password: "",
};

const baseUrl = "http://localhost:4000/users";
export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [userDetails, setUserDetails] = useState(initialForm);

  const url = isLogin ? "/login" : "/add-user-for-managers";
  const { setIsAuth, isAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    const { value, name } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  }

  // Async state managment - Loading , Errors
  // useQuery - react-query
  async function handleForm(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${baseUrl}${url}`, userDetails, {
        withCredentials: true,
      });
      console.log(data);
      if (data.success) {
        setUserDetails(initialForm);
        !isLogin && setIsLogin(true);
        isLogin && setIsAuth(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //   Mounting , Updating
  useEffect(() => {
    isAuth && navigate("/home");
  }, [isAuth]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {isLogin ? "Login" : "Register"}
            </h1>
            <form onSubmit={handleForm} className="space-y-4 md:space-y-6">
              {!isLogin && (
                <LoginInput
                  label={"Your name"}
                  type={"text"}
                  name={"user_name"}
                  id={"user_name"}
                  placeholder={"type your name..."}
                  required={true}
                  onChange={handleChange}
                  value={userDetails.user_name}
                />
              )}
              <LoginInput
                label={"Your email"}
                type={"email"}
                name={"user_email"}
                id={"user_email"}
                placeholder={"name@company.com"}
                required={true}
                onChange={handleChange}
                value={userDetails.user_email}
              />
              <LoginInput
                label={"Password"}
                type={"password"}
                name={"user_password"}
                id={"user_password"}
                placeholder={"••••••••"}
                required={true}
                onChange={handleChange}
                value={userDetails.user_password}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      for="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isLogin ? "Sign in" : "Sign up"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {isLogin ? "Don’t have an account yet? " : "have an account? "}
                <a
                  onClick={() => setIsLogin((prev) => !prev)}
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {isLogin ? "Sign in" : "Sign up"}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
