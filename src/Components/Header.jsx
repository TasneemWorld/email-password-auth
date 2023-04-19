import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../Provider/UserProvider';

const Header = () => {

    const { user, logOut } = useContext(userContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {

            })
            .catch(error => console.error(error))
    }

    return (
        <div>
            <div className="navbar bg-base-300">
                <a className="btn btn-ghost normal-case text-xl">FireBase</a>
                <Link className='mr-4' to="/">Home</Link>
                <Link className='mr-4' to="/login">LogIn</Link>
                <Link className='mr-4' to="/order">Order</Link>
                <Link className='mr-4' to="/register">Register</Link>
                {
                    user ? <>
                        <span>{user.email}</span>
                        <button onClick={handleLogOut} className="btn btn-xs ml-2">signOut</button>
                    </> : <button className="btn btn-xs ml-2"><Link to="/login">LogIn</Link></button>
                }
            </div>
        </div>
    );
};

export default Header;