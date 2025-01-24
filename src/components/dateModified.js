import React from 'react';
import PropTypes from 'prop-types'
import dayjs from 'dayjs';

function DateModified ({ date }) {
    const lastModified = dayjs(date).format(`MMMM D, YYYY HH:mm zzz`);
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