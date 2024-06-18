const isTimeBetween = (dateToCheck: Date, startTime: Date, endTime: Date): boolean => {
    // Extract hours and minutes from moment objects
    const checkHours = dateToCheck.getHours();
    const checkMinutes = dateToCheck.getMinutes();

    const startHours = startTime.getHours();
    const startMinutes = startTime.getMinutes();

    const endHours = endTime.getHours();
    const endMinutes = endTime.getMinutes();

    // Convert time components to total minutes since midnight for easier comparison
    const checkTotalMinutes = checkHours * 60 + checkMinutes;
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    // Check if the time of dateToCheck is between startTime and endTime
    return checkTotalMinutes >= startTotalMinutes && checkTotalMinutes <= endTotalMinutes;
}

export default isTimeBetween