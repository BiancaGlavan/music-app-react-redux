
export const secondsToAlbumTime = (secs: number) => {

    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };

    const h = hours > 0 ? `${hours} h ` : '';
    const m = minutes > 0 ? `${minutes} m ` : '';
    return `${h}${m}`;
}

export default secondsToAlbumTime;



export const secondsToSongTime = (secs: number) => {

    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    return `${minutes}:${seconds < 10 ? '0'+seconds : seconds}`;
}