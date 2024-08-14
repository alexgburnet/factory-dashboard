import React, { createContext, useState }from "react";

export const FaultDataContext = createContext();

export const FaultDataProvider = ({ children }) => {
    const [updateTime, setUpdateTime] = useState([]);

    return (
        <FaultDataContext.Provider value={{ updateTime, setUpdateTime }}>
            {children}
        </FaultDataContext.Provider>
    );
};