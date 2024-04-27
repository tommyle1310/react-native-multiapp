
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


export const convertTotalTimestampDurationToAppTime = (listTimestamps) => {
    let sumDifference = 0;
    let prevTimestamp = null;

    // Convert timestamps to Date objects
    const dates = listTimestamps.map(ts => new Date(ts));

    // Calculate sum of absolute differences
    for (const date of dates) {
        if (prevTimestamp && prevTimestamp.action !== "pause" && date.action !== "pause") {
            sumDifference += Math.abs(date - prevTimestamp);
        }
        prevTimestamp = date;
    }

    // Convert time difference to a human-readable format
    const days = Math.floor(sumDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((sumDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((sumDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((sumDifference % (1000 * 60)) / 1000);

    // Format the time difference
    let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    if (days > 0) {
        formattedTime = `${days} day ${formattedTime}`;
    }

    return formattedTime;
}


export const convertTotalTimestampDurationToAppTimeToTimestamp = (timeDuration) => {
    // Split the time duration into hours, minutes, and seconds
    const [hoursStr, minutesStr, secondsStr] = timeDuration.split(':');

    // Parse hours, minutes, and seconds as integers
    const hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);
    const seconds = parseInt(secondsStr);

    // Calculate the total number of seconds
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

    // Format the total number of seconds
    const formattedTime = totalSeconds.toString();
    return formattedTime
}