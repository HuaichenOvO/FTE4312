import React, { useEffect, useState } from "react";

const getReturnValues = (countDown) => {
    // calculate time left
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [days, hours, minutes, seconds];
};

const DateTimeDisplay = ({ value, type, isDanger }) => {
    return (
        <>
            <span>{value}</span>
            <span> </span>
            <span>{type}</span>
        </>
    );
};

const useCountdown = (targetDate) => {
    const countDownDate = new Date(targetDate).getTime();

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    return getReturnValues(countDown);
};

const ExpiredNotice = () => {
    return (
        <div className="expired-notice">
            <span>Your fairy has grown up!</span>
            {/* <p>Please select a future date and time.</p> */}
        </div>
    );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
        <div>
            <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
            <> : </>
            <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
            <> : </>
            <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
            <> : </>
            <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
        </div>
    );
};

export const CountdownTimer = ({ targetDate }) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    if (days + hours + minutes + seconds <= 0) {
        return <ExpiredNotice />;
    } else {
        return (
            <ShowCounter
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
        );
    }
};

export default ShowCounter;