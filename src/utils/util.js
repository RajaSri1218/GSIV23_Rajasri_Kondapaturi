export const getYear = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    return year;
};

export const convertTimeFormat = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const hoursText = hours < 10 ? "0" + hours : hours;
    const minutesText = remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes;

    return hoursText + ":" + minutesText;
};


export const roundToOneDeci = (number) => {
    return parseFloat(number?.toFixed(1));
};