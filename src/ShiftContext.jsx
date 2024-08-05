import React, { createContext, useState } from "react";

export const ShiftContext = createContext();



export const ShiftProvider = ({ children }) => {
    const [isDayShift, setDayShift] = useState(true);

    return (
        <ShiftContext.Provider value={{ isDayShift, setDayShift }}>
            {children}
        </ShiftContext.Provider>
    );
};