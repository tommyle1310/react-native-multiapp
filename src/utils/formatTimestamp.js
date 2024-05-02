export const convertDateTimeFormat = (dateString) => {
    // Parse the provided date string
    var date = new Date(dateString);

    // Extract date components
    var day = date.getUTCDate();
    var month = date.getUTCMonth() + 1; // Months are zero-based, so add 1
    var year = date.getUTCFullYear();
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();

    // Add leading zeros if necessary
    day = (day < 10) ? '0' + day : day;
    month = (month < 10) ? '0' + month : month;
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;

    // Format the date and time
    var formattedDate = day + '/' + month + '/' + year + '-' + hours + ':' + minutes;

    return formattedDate;
}


export const calculateTimeTotalResumeTime = (listTimestamps) => {
    let totalPauseTime = 0;
    let resumeTime = 0;

    for (let i = 0; i < listTimestamps.length; i++) {
        if (listTimestamps[i].action === "start") {
            resumeTime = new Date(listTimestamps[i].timestamp);
        } else if (listTimestamps[i].action === "pause") {
            totalPauseTime += new Date(listTimestamps[i].timestamp) - resumeTime;
        } else if (listTimestamps[i].action === "resume") {
            resumeTime = new Date(listTimestamps[i].timestamp);
        }
    }

    return totalPauseTime;
}

export const convertMilisecondToTimeFormat = (milliseconds) => {
    // Calculate hours, minutes, and seconds
    var hours = Math.floor(milliseconds / 3600000); // 1 hour = 3600000 milliseconds
    var minutes = Math.floor((milliseconds % 3600000) / 60000); // 1 minute = 60000 milliseconds
    var seconds = Math.floor((milliseconds % 60000) / 1000); // 1 second = 1000 milliseconds

    // Add leading zeros if necessary
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    // Format the time as HH:MM:SS
    return hours + ':' + minutes + ':' + seconds;
}

export const convertSeriesTime = listTimestamps => {
    const differences = [];
    let totalDifference = 0;

    for (let i = 1; i < listTimestamps.length; i++) {
        const prevTimestamp = new Date(listTimestamps[i - 1].timestamp);
        const currentTimestamp = new Date(listTimestamps[i].timestamp);
        const differenceInSeconds = (currentTimestamp - prevTimestamp) / 1000; // Convert milliseconds to seconds
        differences.push(differenceInSeconds);
        totalDifference += differenceInSeconds;
    }

    return differences.map(difference => difference / totalDifference);
}

export const convertTimestampToTimeOrDate = (listTimestamps, index, actionType, timeType) => {
    let count = 0;
    let timestamp;

    for (const item of listTimestamps) {
        if (item.action === actionType) {
            count++;
            if (count === index) {
                timestamp = item.timestamp;
                break;
            }
        }
    }

    if (timestamp) {
        const date = new Date(timestamp);
        if (timeType === 'date') {
            const day = String(date.getUTCDate()).padStart(2, "0");
            const month = String(date.getUTCMonth() + 1).padStart(2, "0");
            const year = date.getUTCFullYear();
            return `${day}/${month}/${year}`;
        } else {
            const hours = String(date.getUTCHours()).padStart(2, "0");
            const minutes = String(date.getUTCMinutes()).padStart(2, "0");
            return `${hours}:${minutes}`;
        }
    } else {
        // If there are less than `index` items with the specified action type, return an empty string or handle as appropriate
        return '';
    }
}


// eg.  [13817, 4043, 78215, 4793, 41020] => ['00:00:13', '00:00:04', '21:43:35', '00:00:04', '11:23:40']
export const convertListMilisecondsToListAppTime = (listMiliseconds) => {
    return listMiliseconds.map(milliseconds => {
        // Convert milliseconds to seconds
        let seconds = Math.floor(milliseconds / 1000);

        // Calculate days
        let days = Math.floor(seconds / (3600 * 24));
        seconds -= days * 3600 * 24;

        // Calculate hours
        let hours = Math.floor(seconds / 3600);
        seconds -= hours * 3600;

        // Calculate minutes
        let minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;

        // Format time string
        let formattedTime = '';

        if (days > 0) {
            formattedTime += `${days}d`;
        }

        if (hours > 0 || days > 0) {
            formattedTime += `${hours}h`;
        }

        if (minutes > 0 || hours > 0 || days > 0) {
            formattedTime += `${minutes.toString().padStart(2, '0')}:`;
        } else {
            formattedTime += '00:';
        }

        formattedTime += seconds.toString().padStart(2, '0');

        return formattedTime;
    });
}
