import React from 'react';
import PropTypes from 'prop-types'
// import moment from 'moment-timezone'
import dayjs from 'dayjs';


function DateModified ({ date }) {
    // const lastModified = moment(date).tz('America/Toronto').format(`MMMM D, YYYY HH:mm z`);
    const lastModified = dayjs(date).format(`MMMM D, YYYY HH:mm z`);
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