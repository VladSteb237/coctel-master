import React from 'react';
import { useRouteError } from 'react-router-dom';

const SinglePageError = () => {
    const error = useRouteError();
    return (
        <div>
            <h2>{error.message}</h2>
        </div>
    );
};

export default SinglePageError;
