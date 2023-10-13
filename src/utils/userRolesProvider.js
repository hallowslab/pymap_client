import React, { createContext, useContext, useState } from 'react';

export const UserRolesContext = createContext();

export const useUserRoles = () => useContext(UserRolesContext);

export const UserRolesProvider = ({ children }) => {
  const [userRoles, setUserRoles] = useState([]);

  return (
    <UserRolesContext.Provider value={{ userRoles, setUserRoles }}>
      {children}
    </UserRolesContext.Provider>
  );
};
