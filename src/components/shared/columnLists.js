import React from 'react';
import PropTypes from 'prop-types';
import 'styles/columnLists.css';

function ColumnLists (props) {
	return (
        <div className="container">
            <ul className={'column-lists column-lists-' + props.numColumns + ' ' + props.columnClass}>
                {props.children}
            </ul>
        </div>
	)
}

ColumnLists.propTypes = {
    children: PropTypes.node.isRequired,
    numColumns: PropTypes.number,
    columnClass: PropTypes.string,
}
ColumnLists.defaultProps = {
    children: ``,
    numColumns: 3,
    columnClass: '',
  }
  
export default ColumnLists