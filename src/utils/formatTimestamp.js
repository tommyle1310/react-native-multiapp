
export const formattedDate = (timestamp) => {
    const date = new Date(timestamp * 1000);

    // Extract the date components
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based, so add 1
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM'; // Determine the period (AM/PM)
    const formattedHours = hours % 12 || 12; // Convert 0 to 12-hour format

    // Create the formatted date string
    const formattedDate = `${month}/${day}/${year}- ${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
    return formattedDate
}

export const convertTimestamp = (timestamp) => {
    let seconds = timestamp % 60;
    let minutes = Math.floor((timestamp / 60) % 60);
    let hours = Math.floor((timestamp / (60 * 60)) % 24);
    let days = Math.floor(timestamp / (24 * 60 * 60));

    // Approximating years and months
    let years = Math.floor(days / 365.25);
    let months = Math.floor((days % 365.25) / 30.4375);

    return {
        "years": years,
        "months": months,
        "days": days,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds
    };
}

export const convertIsoDateTimeToAppTime = (time) => {
    return formattedDate(Math.floor(new Date(time).getTime() / 1000));
}
