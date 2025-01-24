import React from 'react';
import PropTypes from 'prop-types'
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

// Extend dayjs with the timezone and utc plugins
dayjs.extend(utc);
dayjs.extend(timezone);

function DateModified ({ date }) {
    const lastModified = dayjs(date).tz('America/Toronto').format(`MMMM D, YYYY HH:mm zzz`);
    if(date !== null && date !== ""){
        return <div className="container-fluid date-modified">
                    <div className="container ft-container">
                        <strong>Last updated:</strong> {lastModified}
                    </div> 
               </div>
    }
    return null;
}

DateModified.propTypes = {
    date: PropTypes.string,
}
DateModified.defaultProps = {
    date: null,
}

export default DateModified