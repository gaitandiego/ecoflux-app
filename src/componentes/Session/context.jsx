import React from 'react';
 
const AuthUserContext = React.createContext({
    userData: {},
    toggleUser: () => {},
});

export const UserProvider = AuthUserContext.Provider
export const UserConsumer = AuthUserContext.Consumer
 
export default AuthUserContext;
