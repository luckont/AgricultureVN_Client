import React from 'react';

const Alert = ({ msg, bgColor }) => {
    return (
        <div className={`alert ${bgColor}`} style={{display: "flex", top: "5px", right: "5px", minWidth: "200px", zIndex: 50}} role="alert">
            {msg}
        </div>
    );
}

export default Alert;
