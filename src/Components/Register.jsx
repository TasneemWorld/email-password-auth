import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../Provider/UserProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendEmailVerification } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from "@fortawesome/free-brands-svg-icons";


// const userAuth = getAuth()

const showToastMessage = (massage) => {
    toast.success(massage, {                       //why templete string does not work
        position: toast.POSITION.TOP_RIGHT
    });
};

const Register = () => {

    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { user, createUser, ProfileUpdate, googleSignIn } = useContext(userContext);
    // console.log(user)

    const handleRegister = event => {

        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);


        setMessage('')

        if (!/(?=.*[A-Z])/.test(password)) {
            setMessage('Please add at least one upper case');
            return;
        }
        else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            setMessage('Please Add at least Two digit');
            return;
        }
        else if (password.length < 6) {
            setMessage('Please Add At least 6 Character In Your Password');
            return;
        }

        createUser(email, password)
            .then(result => {
                console.log(result);
                const loggedUser = result.user;
                console.log(loggedUser);
                form.reset();
                setMessage('');
                showToastMessage('Register successfully');
                VerificationEmail(loggedUser);
                updateUserData(loggedUser, name);
            })
            .catch(error => {
                console.log(error);
                setMessage(error.message)
            })
    }

    const VerificationEmail = (user) => {

        sendEmailVerification(user)
            .then(result => {
                console.log(result)
                showToastMessage('Please varify your Email')
            })
    }

    const updateUserData = (user, name) => {

        ProfileUpdate(user, name)
            .then(() => {
                console.log('user Name updated')
            })
            .catch(error => console.log(error))
    }

    function togglePasswordVisibility() {
        const passwordInput = document.getElementById("password");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    }

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const signUpwithGoogle = () => {
        googleSignIn()
    }


    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="name" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>

                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className='form-control relative'>
                                    <input type={showPassword ? 'text' : 'password'} name='password' placeholder="password" id='password' className="input input-bordered" required />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 px-3 flex items-center"
                                        onClick={handleTogglePassword}
                                    >
                                        <FontAwesomeIcon
                                            icon={showPassword ? faEye : faEyeSlash}
                                            className="text-gray-400"
                                        />
                                    </button>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        <button className="btn-link"><Link to='/login'>Already Have and account</Link></button>
                                    </span>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        <p className='error'>{message}</p>
                                    </span>
                                </label>
                            </div>
                        </form>
                        <div>
                            <div className='form-control'>
                                <button className="border  p-2  rounded text-orange-700 font-mono" onClick={signUpwithGoogle}>LogIn with google <FontAwesomeIcon icon={faGoogle} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;