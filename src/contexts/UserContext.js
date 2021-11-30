import React, { createContext } from 'react';

export const UserContext = createContext({});

const UserContextProvider = ({ children }) => {

    const userLogin = async (payload) => {
        return;
    }

    const userSignUp = async (payload) => {
        return;
    }

    const userLogout = async () => {
        return;
    };

    return (
        <UserContext.Provider
            value={{
                userLogin,
                userLogout,
                userSignUp
            }}
        >
        {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
