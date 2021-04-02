function getTimeAsNumberOfMinutes(time: string) {
    var timeParts: any = time.split(':');

    var timeInMinutes = timeParts[0] * 60 + timeParts[1];

    return timeInMinutes;
}

const calculateLowerBound = (
    array: Array<string>,
    value: string,
): any => {
    let low = 0,
        high = array.length;
    while (low < high) {
        let mid: number = Math.floor(low + (high - low) / 2);
        if (
            getTimeAsNumberOfMinutes(value) <=
            getTimeAsNumberOfMinutes(array[mid])
        ) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    if (low === array.length) low = array.length - 1;

    return Math.floor(low);
};

const CheckValidTime = (time: string) => {
    let availableTimeRanges: Array<string> =
        localStorage.getItem('selectedTimeRange')?.split(',') || [];

    let v: Array<string> = [];

    let mpp: any = {};
    availableTimeRanges.map((timeRange: string) => {
        let test = timeRange.split(' ').join('').split('-');
        v.push(test[0]);
        if (!(test[0] in mpp)) mpp[test[0]] = 1;
        v.push(test[1]);
        mpp[test[1]] = 2;
    });

    v.sort();

    let index = calculateLowerBound(v, time);

    if (index > 0 && v[index] === time) {
        // console.log('yes');
        return true;
    } else {
        if (index >= 0 && mpp[v[index]] === 2) {
            // console.log('yes');
            return true;
        } else {
            // console.log('no');
            return false;
        }
    }
};

export default CheckValidTime;
