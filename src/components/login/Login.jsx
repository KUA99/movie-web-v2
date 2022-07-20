import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./login.scss";
import googleImg from "../../assets/image/google.png";
import { auth } from "../../firebase/firebase";
import { setUserLogin } from "../../features/user/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginFormRef = useRef(null);
  const signupFormRef = useRef(null);

  //defined login form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  //defined signup form
  const {
    register: signUpRegister,
    handleSubmit: signUpHandleSubmit,
    watch,
    formState: { errors: signUpErrors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    if (data) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        const user = userCredential.user;
        dispatch(
          setUserLogin({
            name: user.email.toLowerCase().slice(0, user.email.indexOf("@")),
            email: user.email,
            photo: user.photoURL,
          })
        );
        const playlist = [];
        if (!localStorage.getItem(user.email)) {
          localStorage.setItem(user.email, JSON.stringify(playlist));
        }
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onSubmitSignUp = async (data, e) => {
    e.preventDefault();
    if (data) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        const user = userCredential.user;
        dispatch(
          setUserLogin({
            name: user.email.toLowerCase().slice(0, user.email.indexOf("@")),
            email: user.email,
            photo: user.photoURL,
          })
        );
        const playlist = [];
        if (!localStorage.getItem(user.email)) {
          localStorage.setItem(user.email, JSON.stringify(playlist));
        }
        navigate("/");
      } catch (error) {
        console.log(error);
        alert("This email address is already being used");
      }
    } else {
      console.log("No data founded");
    }
  };

  const handelShowForm = (e) => {
    const text = e.target.innerText;
    if (text.toLowerCase().includes("login")) {
      signupFormRef.current.style.display = "none";
      loginFormRef.current.style.display = "block";
    } else {
      signupFormRef.current.style.display = "block";
      loginFormRef.current.style.display = "none";
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      dispatch(
        setUserLogin({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );
      const playlist = [];
      if (!localStorage.getItem(user.email)) {
        localStorage.setItem(user.email, JSON.stringify(playlist));
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <div className="login-container" ref={loginFormRef}>
        <div className="content">
          <h2 className="content-header">log in</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>email</label>
            <input
              type="text"
              placeholder="abc@website.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            <p className="error">{errors.email?.message}</p>
            <label>password</label>
            <input
              type="password"
              placeholder="Min 8 characters"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Min length is 8",
                },
              })}
            />
            <p className="error">{errors.password?.message}</p>
            <input type="submit" value="Login" />
          </form>
          <h3 className="message">
            don't have account ?{" "}
            <span onClick={handelShowForm}>Signup now</span>
          </h3>
        </div>
        <div className="other">
          <h3 className="other-header">or</h3>
          <button className="other-google-btn" onClick={handleLoginWithGoogle}>
            <img src={googleImg} alt="google logo" />
            log in with Google
          </button>
        </div>
      </div>
      <div className="signup-container" ref={signupFormRef}>
        <div className="content">
          <h2 className="content-header">sign up</h2>
          <form onSubmit={signUpHandleSubmit(onSubmitSignUp)}>
            <label>email</label>
            <input
              type="text"
              placeholder="abc@website.com"
              {...signUpRegister("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            <p className="error">{signUpErrors.email?.message}</p>
            <label>password</label>
            <input
              type="password"
              placeholder="Min 8 characters"
              {...signUpRegister("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
              })}
            />
            <p className="error">{signUpErrors.password?.message}</p>

            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Min 8 characters"
              {...signUpRegister("confirm_password", {
                required: "Confirm Password is required",
                validate: (val) => {
                  if (watch("password") !== val) {
                    return "Your passwords do no match";
                  }
                },
              })}
            />
            <p className="error">{signUpErrors.confirm_password?.message}</p>
            <input type="submit" value="Signup" />
          </form>
          <h3 className="message">
            have account ? <span onClick={handelShowForm}>Login now</span>
          </h3>
        </div>
        <div className="other">
          <h3 className="other-header">or</h3>
          <button className="other-google-btn" onClick={handleLoginWithGoogle}>
            <img src={googleImg} alt="google logo" />
            log in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
