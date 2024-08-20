import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
export const codeContext = createContext();
const CodeValidityContext = ({ children }) => {
    const [isValid, setIsValid] = useState(false);

    const checkCodeValidity = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/code-validity`);
            if (response?.data?.isvalid === true) {
                setIsValid(true);
            }
        }
        catch (error) {
            console.log("error in retriving code");
        }
    }

    useEffect(() => {
        checkCodeValidity(); //apply this after settling everything.
    }, []);

    return (
        <codeContext.Provider value={{ isValid }}>
            {children}
        </codeContext.Provider>
    )
}

export default CodeValidityContext;