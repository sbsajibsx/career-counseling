import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, AuthContext } from "../provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const [show, setShow] = useState(false);
  const { createNewUser, setUser, updateUserProfile, googleProvider } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // get form data
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const photo = form.get("photo");
    const password = form.get("password");

    const passregex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if(!passregex.test(password)){
      toast.error('Please add at lest one capital letter, one small letter and password must be 6 character', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      return;
    }
    console.log({ name, email, photo, password });
    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        updateUserProfile({ displayName: name, photoURL: photo })
          .then((r) => {
            console.log(r);
            navigate("/");
            setUser({ ...user, displayName: name, photoURL: photo });
          })
          .catch((err) => {
            toast.warn(`${err.code}`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          });
        toast.success(" Sign Up success", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.warn(`Something Went Wrong. ${errorCode}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
    .then(result => {
        console.log(result)
        navigate(location?.state ? location.state : "/");
    })
    .catch(error =>{
        console.log(error)
    })
}
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Helmet>
        <title>Career | Register</title>
      </Helmet>
      <div
        data-aos="zoom-in-left"
        className="card bg-base-100 w-full max-w-lg shrink-0 shadow-xl p-6 border"
      >
        <h1 className="font-semibold text-4xl text-center p-4 bg-blue-200 rounded-lg shadow-lg hover:shadow-indigo-500/50">
          Register your account
        </h1>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Photo URL</span>
            </label>
            <input
              name="photo"
              type="text"
              placeholder="photo url"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text font-bold">Password</span>
            </label>
            <input
              name="password"
              type={show? 'text' : 'password'}
              placeholder="password"
              className="input input-bordered"
              required
            />
            <span onClick={() => setShow(!show)} className="btn btn-sm absolute right-2 top-11">{show? <FaEye /> : <FaEyeSlash />}</span>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-neutral rounded-none font-semibold">
              Register
            </button>
          </div>
        </form>
        <p className="font-semibold text-center">
          Already Have An Account ?
          <Link className="text-red-500" to="/auth/login">
            Login
          </Link>
        </p>
        <p className="py-2 text-center text-xl font-semibold">or</p>
        <div className="*:w-full py-4">
          <button onClick={handleGoogleLogin} className="btn">
            <FcGoogle /> Register  with Google
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Register;
