import { daysInWeek } from "date-fns/constants";

const formatDateToYYYYMMDD = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to month to display it in 1-based index
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
};

export { formatDateToYYYYMMDD };
