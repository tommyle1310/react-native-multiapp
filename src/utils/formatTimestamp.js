
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


export const convertListTotalTimestampDurationToAppTime = (listTimestamps) => {
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


export const convertListTotalTimestampDurationToAppTimeToTimestamp = (timeDuration) => {
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


export const convertTotalResumeTimestamp = (listTimestamps) => {
    let sumOfDifferences = 0;
    let lastStartOrResumeTimestamp = null;

    for (const action of listTimestamps) {
        if (action.action === "start" || action.action === "resume") {
            lastStartOrResumeTimestamp = new Date(action.timestamp);
        } else if (action.action === "pause" && lastStartOrResumeTimestamp) {
            const pauseTimestamp = new Date(action.timestamp);
            const difference = pauseTimestamp - lastStartOrResumeTimestamp;
            sumOfDifferences += difference;
        }
    }
    return sumOfDifferences
}


const actions = [
    { "_id": "662bab3fff161d61625695d0", "action": "start", "timestamp": "2024-04-26T13:25:19.170Z" },
    { "_id": "662d00a4b7f3e78d75b1a526", "action": "resume", "timestamp": "2024-04-27T13:41:56.457Z" },
    { "_id": "662d00afb7f3e78d75b1a543", "action": "pause", "timestamp": "2024-04-27T13:42:07.776Z" },
    { "_id": "662d0115b7f3e78d75b1a594", "action": "resume", "timestamp": "2024-04-27T13:43:49.896Z" },
    { "_id": "662d058cb7f3e78d75b1f0ce", "action": "pause", "timestamp": "2024-04-27T14:02:52.222Z" },
    { "_id": "662d063db7f3e78d75b1f1cb", "action": "resume", "timestamp": "2024-04-27T14:05:49.573Z" },
    { "_id": "662d0655b7f3e78d75b1f21c", "action": "pause", "timestamp": "2024-04-27T14:06:13.785Z" },
    { "_id": "662d0658b7f3e78d75b1f270", "action": "resume", "timestamp": "2024-04-27T14:06:16.079Z" }
];


export const convertTotalTimestampDurationToAppTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;

    let formattedTime = '';

    if (days > 0) {
        formattedTime += `${days}day`;
    }

    if (remainingHours > 0) {
        formattedTime += `${remainingHours}:`;
    }

    if (remainingMinutes > 0) {
        formattedTime += `${remainingMinutes}:`;
    }

    if (remainingSeconds > 0) {
        formattedTime += `${remainingSeconds}`;
    }

    return formattedTime.trim();
}
// console.log("Total sum of differences:", convertTotalTimestampDurationToAppTime(convertTotalResumeTimestamp(actions)));

export const getTotalPauses = listTimestamps => {
    let pauseCount = 0;

    for (const action of listTimestamps) {
        if (action.action === "pause") {
            pauseCount++;
        }
    }
    return pauseCount
}


export const getNthPauseAction = (actions, n) => {
    let pauseCount = 0;
    for (let i = actions.length - 1; i >= 0; i--) {
        if (actions[i].action === "pause") {
            pauseCount++;
            if (pauseCount === n) {
                return actions[i];
            }
        }
    }
    return null; // If there are fewer than n pause actions
}

export const getNthNotPauseAction = (actions, n) => {
    let pauseCount = 0;
    for (let i = actions.length - 1; i >= 0; i--) {
        if (actions[i].action !== "pause") {
            pauseCount++;
            if (pauseCount === n) {
                return actions[i];
            }
        }
    }
    return null; // If there are fewer than n not pause actions
}

export const formatTimestampToTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");

    const formattedTime = `${hours}:${minutes}`;
    return formattedTime
}

export const formatTimestampToDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed, so add 1
    const year = date.getUTCFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate

}

export const formatTimestampToDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");

    const formattedDateTime = `${year}/${month}/${day}-${hours}:${minutes}`;
    return formattedDateTime// Output: "2024/04/27-14:08"

}