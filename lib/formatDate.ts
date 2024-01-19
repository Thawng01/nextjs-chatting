export const formateDateInTime = (date: number) => {
    if (!date) return;
    const currentTime = new Date().getTime();
    const dateInMilisecond = date;

    let time;
    let min = 60 * 1000;
    let hr = min * 60;
    let day = hr * 24;
    let mon = day * 30.41;
    let yr = mon * 12;

    let duration = currentTime - dateInMilisecond;

    if (duration < min) {
        time = "Now";
    } else if (duration < hr) {
        const durationMin = Math.floor(duration / min);
        const text = durationMin > 1 ? "mins" : "min";
        time = durationMin + " " + text;
    } else if (duration < day) {
        const durationHr = Math.floor(duration / hr);
        const text = durationHr > 1 ? "hrs" : "hr";
        time = durationHr + " " + text;
    } else if (duration < mon) {
        const durationDay = Math.floor(duration / day);
        const text = durationDay > 1 ? "days" : "day";
        time = durationDay + " " + text;
    } else if (duration < yr) {
        const durationMon = Math.floor(duration / mon);
        const text = durationMon > 1 ? "mons" : "mon";
        time = durationMon + " " + text;
    } else {
        const durationYr = Math.floor(duration / yr);
        const text = durationYr > 1 ? "yrs" : "yr";
        time = durationYr + " " + text;
    }

    return time;
};
