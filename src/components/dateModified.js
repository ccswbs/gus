import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

function DateModified ({ date }) {
    const lastModified = moment(date).tz('America/Toronto').format(`MMMM D, YYYY HH:mm z`);
    if(date !== null && date !== ""){
        return <div className="container date-modified">
            <p><strong>Last updated:</strong> {lastModified}</p>
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