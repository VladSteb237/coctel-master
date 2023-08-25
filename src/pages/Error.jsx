import React from 'react';
import img from '../assets/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';
import { Link, useRouteError } from 'react-router-dom';

const Error = () => {
    const error = useRouteError();
    if (error.status === 404) {
        return (
            <Wrapper>
                <div>
                    <img src={img} alt="not found" />
                    <h3>Ohh! </h3>
                    <p>We can't seem to find the page you're looking for</p>
                    <Link to='/'>back to home page</Link>
                </div>
            </Wrapper>
        );
    }
    return (
        <Wrapper>
            <div>
                <h2>something went wrong</h2>
            </div>
        </Wrapper>
    );
};

export default Error;
