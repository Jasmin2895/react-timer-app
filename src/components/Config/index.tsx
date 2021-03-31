import React, { useState, useEffect } from 'react';
import CheckValidTime from './../../utils/checkValidTime';
import './index.scss';

const Config: React.FC = () => {
    let timeRangeData: Array<string> =
        localStorage.getItem('selectedTimeRange')?.split(',') || [];
    console.log('timeRangeData', timeRangeData);
    console.log('CheckValidTime', CheckValidTime('12:50'));
    return (
        <main className="config-container">
            <div className="time-value">
                <h1>Time Range Verfifier!</h1>
                <div>
                    <input
                        type="text"
                        placeholder="Time Value(14:30)"
                    ></input>
                    <button>Submit</button>
                </div>
            </div>
            <div className="time-range">
                <h1>Time Ranges</h1>
                <ul>
                    {timeRangeData.map((item: string) => {
                        return <li key={item}> {item}</li>;
                    })}
                </ul>
            </div>
        </main>
    );
};

export default Config;
