import React, { useState, useEffect } from 'react';
import CheckValidTime from './../../utils/checkValidTime';
import timeValidation from './../../utils/timeValditor';
import './index.scss';
import './../../App.css';

const Config: React.FC = () => {
    // set input field time state
    const [time, setTime] = useState('');

    const [userTimeSlots, setUserTimeSlots] = useState<Array<string>>(
        [],
    );
    const [currentSlot, setCurrentSlot] = useState({});
    const [hasTimeSlot, setTimeSlot] = useState(false);

    useEffect(() => {
        // TODO:on page refresh recheck the slotavailable variable for each time range
        function getUserSlots() {
            let previousUserTimeSlots: any =
                localStorage.getItem('userTimeSlots')?.split(',') ||
                [];

            console.log('this part executed');
            setTimeSlot(true);
            let updatedTimeSlotsArray: any = [];
            previousUserTimeSlots.map((timeSlots: string) => {
                let updatedString = timeSlots.split('|');
                console.log('updatedString', updatedString);
                updatedTimeSlotsArray.push(
                    `${updatedString[0]}|${CheckValidTime(
                        updatedString[0],
                    )}`,
                );
            });
            console.log(
                'previousUserTimeSlots',
                previousUserTimeSlots,
                updatedTimeSlotsArray,
            );

            setUserTimeSlots((prevSlots) => [
                ...prevSlots,
                ...updatedTimeSlotsArray,
            ]);
        }

        getUserSlots();
    }, []);

    useEffect(() => {
        if (userTimeSlots.length > 0)
            localStorage.setItem(
                'userTimeSlots',
                userTimeSlots.toString(),
            );
    }, [userTimeSlots]);

    // time range for selected interval
    const timeRangeData: Array<string> =
        localStorage.getItem('selectedTimeRange')?.split(',') || [];

    const handleChangeTime = (event: any) => {
        console.log('event', event);
        setTime(event.target.value);
    };

    const handleSubmitBtn = () => {
        // add the element in user mentioned list
        let timeData: string = `${time}|${CheckValidTime(time)}`;

        if (timeValidation(time)) {
            setCurrentSlot(timeData);
            setUserTimeSlots((prevSlots) => [...prevSlots, timeData]);
            localStorage.setItem(
                'userTimeSlots',
                userTimeSlots.toString(),
            );
        }
    };

    const handleTimeSlots = (element: any) => {
        let tempArray = userTimeSlots.filter(
            (timeSlot) => timeSlot !== element,
        );
        console.log('tempArray', tempArray);
        setUserTimeSlots(tempArray);
    };

    return (
        <main className="config-container">
            <div className="time-value">
                <h1>Time Range Verifier</h1>
                <div>
                    <input
                        className="input-field"
                        type="text"
                        placeholder="Time Value(14:30)"
                        onChange={(e) => handleChangeTime(e)}
                    ></input>
                    <button
                        className="add-time-value m-l-2"
                        onClick={handleSubmitBtn}
                    >
                        +
                    </button>
                </div>
                <div className="available-slots">
                    <ul>
                        {' '}
                        {hasTimeSlot &&
                            userTimeSlots.map((item: any, index) => {
                                let currentTime = item.split('|');
                                return (
                                    <li key={index}>
                                        {currentTime[1] === 'true' ? (
                                            <img
                                                className="slot-status"
                                                src="/draw-check-mark.svg"
                                                alt="available-slot"
                                            ></img>
                                        ) : (
                                            <img
                                                className="slot-status"
                                                src="/warning.svg"
                                                alt="not-available-slot"
                                            ></img>
                                        )}
                                        <span>{currentTime[0]}</span>
                                        <button
                                            className="remove-time-value m-l-12"
                                            onClick={() =>
                                                handleTimeSlots(item)
                                            }
                                        >
                                            {' '}
                                            -
                                        </button>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
            <div className="time-range">
                <h1>Time Ranges</h1>
                <ul>
                    {timeRangeData.map((item: any, index) => {
                        return <li key={index}>{item}</li>;
                    })}
                </ul>
            </div>
        </main>
    );
};

export default Config;
