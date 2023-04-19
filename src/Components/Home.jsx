import React, { useContext } from 'react';
import { userContext } from '../Provider/UserProvider';

const Home = () => {

    const user = useContext(userContext)

    return (
        <div>
            <h1>this is home{user && <span>{user.displayName}</span> }</h1>
        </div>
    );
};

export default Home;