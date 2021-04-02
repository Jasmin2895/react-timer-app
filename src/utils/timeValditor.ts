const timeValidation = (time: string) => {
    let re = /^(\d{1,2}):(\d{2})([ap]m)?$/;
    console.log('re', time);
    if (time !== '') {
        let regs = time.match(re);
        if (regs === null) return false;
        if (regs && regs[3]) {
            // 12-hour value between 1 and 12

            if (parseInt(regs[1]) < 1 || parseInt(regs[1]) > 12) {
                // alert('Invalid value for hours: ' + regs[1]);
                return false;
            }
        } else {
            // 24-hour value between 0 and 23
            if (regs && parseInt(regs[1]) > 23) {
                // alert('Invalid value for hours: ' + regs[1]);
                return false;
            }
        }

        if (regs && parseInt(regs[2]) > 59) {
            // alert('Invalid value for minutes: ' + regs[2]);
            return false;
        }
    } else {
        // alert('Invalid time format: ' + time);
        return false;
    }
    // alert('All input fields have been validated!');
    return true;
};

export default timeValidation;
