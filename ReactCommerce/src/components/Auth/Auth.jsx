/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import './Auth.css';
import NavItems from '../NavItems';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
function LoginForm() {
  const navigate = useNavigate();
  const [loginInputs, setLogin] = useState({
    email: '',
    password: '',
    remember_me: false,
    error_list: {}
  });
  const handleInputs = (e) => {
    setLogin({
      ...loginInputs, [e.target.name]: e.target.value
    });
  };

  const handleCheckbox = (e) => {
    setLogin({
      ...loginInputs, remember_me: e.target.checked
    });
  };
  const loginSubmit = (e) => {
    e.preventDefault();


    const data = {
      email: loginInputs.email,
      password: loginInputs.password,
      remember_me: loginInputs.remember_me,
    };

    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('http://localhost:8001/api/login', data).then(res => {
        if (res.data.status === 200) {
          if (loginInputs.remember_me) {
            localStorage.setItem('auth-token', res.data.token); // Persistent token
            localStorage.setItem('auth-user', JSON.stringify(res.data.data));
            window.location.reload();
          } else {
            sessionStorage.setItem('auth-token', res.data.token); // Session-only token
            sessionStorage.setItem('auth-user', JSON.stringify(res.data.data));
          }
          Swal.fire('Success', `Welcome Back Mr. ${res.data.data.name}`, 'success');
          navigate('/');
        } else if (res.data.status === 404) {
          Swal.fire('Warning', res.data.message, 'warning');
        } else {
          setLogin({
            ...loginInputs, 
            error_list: res.data.errors,
          });
        }
      }).catch(error => {
        console.error('Error:', error);
        Swal.fire('Error', 'Something went wrong, please try again.', 'error');
      });
    }).catch(error => {
      console.error('Error:', error);
      Swal.fire('Error', 'Failed to get CSRF token, please try again.', 'error');
    });
  };
  return (
    <form onSubmit={loginSubmit} className="formAuth">
      <h2 className="title">Sign in</h2>
      <div className="input-field">
        <MdOutlineAlternateEmail />
        <input type="email"
          className='inputauth'
          onChange={handleInputs}
          name="email"
          value={loginInputs.email}
          placeholder="Email Adresse" />
      </div>
      <span className="text-danger">
        {loginInputs.error_list && loginInputs.error_list.email}
      </span>
      <div className="input-field">
        <RiLockPasswordFill />
        <input type="password"
          className='inputauth'
          onChange={handleInputs}
          name="password"
          value={loginInputs.password}
          placeholder="Password" />
      </div>
      <span className="text-danger">
        {loginInputs.error_list && loginInputs.error_list.password}
      </span>
      <div className="input-field">
        <input type="checkbox" onChange={handleCheckbox} checked={loginInputs.remember_me} name="remember_me" />
        <label htmlFor="remember_me">Remember Me</label>
      </div>
      <input type="submit" value="Login" className="btnS" />
      <p className="social-text">Or Sign in with social platforms</p>
      <div className="social-media">
      </div>
    </form>
  );
}

function RegisterForm() {
  const navigate = useNavigate();
  const [registerInput, setRegisterInput] = useState({
    name: "",
    email: "",
    password: "",
    error_list: {},
  });
  const [message, setMessage] = useState("");

  const handleInputs = (e) => {
    e.persist();
    setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
    };
    axios
      .get("http://127.0.0.1:8001/sanctum/csrf-cookie").then((response) => {
        axios
          .post("http://127.0.0.1:8001/api/register", data)
          .then((res) => {
            if (res.data.status !== 201) {
              setRegisterInput({
                ...registerInput,
                error_list: res.data.errors,
              });
            }
            else {
              localStorage.setItem('auth-token', res.data.token)
              localStorage.setItem('auth-user', JSON.stringify(res.data.data));
              setMessage('Welcome Mr ' + registerInput.name)
              setTimeout(() => {
                navigate('/')
              }, 1000)
            }
          })
          .catch((error) => console.error("Error:", error));
      });
  };

  return (
    <form onSubmit={registerSubmit} className="formAuth"  >
      <h2 className="title">Sign up</h2>
      <div className="input-field">
        <CiUser />
        <input type="text"
          className='inputauth'
          onChange={handleInputs}
          name="name"
          value={registerInput.name}
          placeholder="Username" />

      </div>
      <span className="text-danger">
        {registerInput.error_list &&
          registerInput.error_list.name}{" "}
      </span>
      <div className="input-field">
        <MdOutlineAlternateEmail />
        <input type="email"
          className='inputauth'
          onChange={handleInputs}
          name="email"
          value={registerInput.email}
          placeholder="Email" />
      </div>
      <span className="text-danger">
        {registerInput.error_list &&
          registerInput.error_list.email}{" "}
      </span>
      <div className="input-field">
        <RiLockPasswordFill />
        <input type="password"
          className='inputauth'
          onChange={handleInputs}
          name="password"
          value={registerInput.password} placeholder="Password" />
      </div>
      <span className="text-danger">
        {registerInput.error_list &&
          registerInput.error_list.password}{" "}
      </span>
      <input type="submit" className="btnS" value="Sign up" />
      <p className="social-text">Or Sign up with social platforms</p>
      <div className="social-media">
      </div>
    </form>
  );
}

function AuthPage({ etat }) {
  useEffect(() => {
    setIsSignInMode(etat);
  }, [etat]);
  const [isSignInMode, setIsSignInMode] = useState(etat);

  const toggleMode = () => {
    setIsSignInMode(prevMode => !prevMode);
  };

  return (
    <div>
      <NavItems />
      <div className={`containera ${isSignInMode ? '' : 'sign-up-mode'}`}>
        <div className="forms-containera">
          <div className="signin-signup">
            {isSignInMode ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
        <div className="panels-containera">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Rejoignez-nous pour découvrir une large sélection de produits de qualité, des vêtements tendance aux gadgets high-tech
              </p>
              <button className="btn transparent" onClick={toggleMode}>Sign up</button>
            </div>
            <img src="log.svg" className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Rejoignez-nous pour découvrir une large sélection de produits de qualité, des vêtements tendance aux gadgets high-tech
              </p>
              <button className="btn transparent" onClick={toggleMode}>Sign in</button>
            </div>
            <img src="register.svg" className="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
