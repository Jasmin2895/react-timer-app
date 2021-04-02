import React, { useState, useEffect } from 'react';
import timeValditor from './../../utils/timeValditor';
import './index.scss';

const Main: React.FC = () => {
    const [timeInput, setTimeInput] = useState<string>('');
    const [timeRange, setTimeRange] = useState<Array<string>>([]);

    const handleTimeValidation = (event: any) => {
        console.log('value', event.target.value);
        setTimeInput(event.target.value);
    };

    useEffect(() => {
        console.log(
            localStorage.getItem('selectedTimeRange')?.split(','),
        );
        let previousTimeRange: Array<string> =
            localStorage.getItem('selectedTimeRange')?.split(',') ||
            [];

        setTimeRange(previousTimeRange);
    }, []);

    useEffect(() => {
        localStorage.setItem(
            'selectedTimeRange',
            timeRange.toString(),
        );
    }, [timeRange]);

    const handleClick = () => {
        timeValditor(timeInput);
        let test: string = timeInput;
        let startTime: string = '',
            endTime: string = '';
        // check for space in the entered string and replace it with no space.
        if (/\s/g.test(timeInput)) {
            test = test.split(' ').join('');

            console.log('test', test);

            let splitText: Array<string> = test.split('-');
            console.log('splitText', splitText);

            // check for valid input time
            if (timeValditor(splitText[0])) {
                startTime = splitText[0];
            }

            if (timeValditor(splitText[1])) {
                endTime = splitText[1];
            }
        }
        let timeRangeNewItem = `${startTime} - ${endTime}`;

        setTimeRange((prevTimeRange) => [
            ...prevTimeRange,
            timeRangeNewItem,
        ]);
        localStorage.setItem(
            'selectedTimeRange',
            timeRange.toString(),
        );
    };

    // check for maxlength of the input field
    const maxLengthCheck = (object: any) => {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(
                0,
                object.target.maxLength,
            );
        }
    };

    const handleListActions = (ele: string) => {
        let oldArray = timeRange.filter((time) => ele !== time);
        setTimeRange(oldArray);
    };

    return (
        <div className="wrapper">
            <a href="/config">Go to Config Page</a>
            <h1>Time Ranges</h1>
            <div className="input-range">
                <label>
                    <input
                        className="input-field"
                        placeholder="13:40 - 19:34"
                        type="text"
                        pattern="\d{1,2}:\d{2}([ap]m)?"
                        name="starttime"
                        maxLength={13}
                        onInput={maxLengthCheck}
                        onChange={(e) => handleTimeValidation(e)}
                    />
                </label>
                <button
                    className="add-time-value"
                    onClick={handleClick}
                >
                    +
                </button>
            </div>

            <div className="range-list">
                <ul>
                    {' '}
                    {timeRange.map((element, index) => (
                        <div className="list-actions">
                            <li key={index}>{element}</li>
                            {element ? (
                                <button
                                    id="remove-interval"
                                    className="remove-time-value m-l-10"
                                    onClick={() =>
                                        handleListActions(element)
                                    }
                                >
                                    -
                                </button>
                            ) : (
                                ''
                            )}
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Main;
