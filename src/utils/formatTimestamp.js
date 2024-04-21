
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

// console.log(formattedDate(1803376500))