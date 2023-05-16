import React from 'react';

const Result = () => {
    return (
        <div id="scroreOuterBox">
            Score :
            {localStorage.getItem('score')}
        </div>
    );
};

export default Result;
