import React, { useContext, useRef, useState } from 'react';
import { userContext } from '../Provider/UserProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const LogIn = () => {

    const { signIn, resetPassword, ProfileUpdate } = useContext(userContext);

    console.log(resetPassword)

    const [error, setError] = useState('');
    const emailRef = useRef();

    const showToastMessage = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const handelLogin = event => {
        console.log(event)
        event.preventDefault()

        const form = event.target;
        console.log(form.email)
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        resetPassword(email)

        signIn(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                if (!loggedUser.emailVerified) {
                    showToastMessage('Please Varify your Email');
                    // return;
                }
                else {
                    showToastMessage('successfully Varified');
                }
                form.reset();
            })
            .catch(error => {
                setError(error.message)
                console.log(error)
            })
    }

    const handelResetPassword = (event) => {
        const email = emailRef.current.value;
        if (!email) {
            showToastMessage('Please Provied Your Email to Reset Password');
        }

        resetPassword(email)
            .then(() => {
                showToastMessage('Please Chack Your Email')
            })
            .catch(error => console.log(error))
    }


    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handelLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' ref={emailRef} placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" onClick={handelResetPassword} className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                                <label className="label">
                                    <Link className="label-text-alt link link-hover" to="/register">New to Firebase! Please Register</Link>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">{error}</span>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default LogIn;