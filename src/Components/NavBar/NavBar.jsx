import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { enGB } from "date-fns/locale";

export const NavBar = () => {

    const [startDate, setStartDate] = useState(new Date());
    return (
        <div className="header">
            <h1>Factory Overview for </h1>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"  // British date format
                locale={enGB}            // British locale
            />
        </div>
    );
}