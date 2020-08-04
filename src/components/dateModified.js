import React from 'react';
import PropTypes from 'prop-types'

function DateModified ({ date }) {
console.log(date);
    if(date !== null && date !== ""){
        return <div className="container date-modified">
            <p><strong>Last updated:</strong> {date}</p>
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