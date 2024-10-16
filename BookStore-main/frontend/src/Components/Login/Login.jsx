import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { TokenAuthContext } from "../Context/Tokencontext";

export default function Login() {
  const [errorcheck, seterrorcheck] = useState(false);
  const [success, setsuccess] = useState(false);
  const [isclicked, setisclicked] = useState(false);
  const {token,settoken} = useContext(TokenAuthContext)
  const navigate = useNavigate();
  const user = {
    email: "",
    password: "",
  };

  async function registerdone(value) {
    try {
      setisclicked(true);
      const response = await axios.post(
        "https://book-store-back-end-d-mohamedmostafa427s-projects.vercel.app/users/login",
        value
      );
      setsuccess(true);
      setisclicked(false);

    
      settoken(response.data.token)
      localStorage.setItem("token",response.data.token)
    
      
      
      
      setTimeout(() => {
         navigate("/");
      }, 2000);
    } catch (error) {
      setisclicked(false);
      seterrorcheck(error.response.data.message);
      setTimeout(() => {
        seterrorcheck(null);
      }, 2000);
    }
  }

  const formik = useFormik({
    initialValues: user,
    onSubmit: registerdone
  });
//   /^(?=.*[A-Z]).{8,}$/
  return (
    <div className="flex justify-center items-center min-h-screen " style={{backgroundColor:'#F5F3EE'}}>
      <form className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg" onSubmit={formik.handleSubmit}>
        <h2 className="text-2xl font-serif pb-4 text-center">Login Now :</h2>

        {errorcheck ? (
          <div
            className="p-4 mb-4 text-sm text-white rounded-lg bg-red-600"
            role="alert"
          >
            {errorcheck}
          </div>
        ) : success ? (
          <div
            className="p-4 mb-4 text-sm text-white rounded-lg bg-green-600"
            role="alert"
          >
            Success! Congratulations!
          </div>
        ) : undefined}

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
        email address :
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>

          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {formik.errors.password}
            </div>
          ) : undefined}
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          {isclicked ? (
            <RotatingLines
              visible={true}
              height="20"
              width="20"
              color="white"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}
