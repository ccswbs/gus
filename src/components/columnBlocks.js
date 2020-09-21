import React from 'react';
import PropTypes from 'prop-types';
import '../styles/columnLists.css';

// https://flaviocopes.com/how-to-divide-array-js/

// const items = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] //… your array, filled with values

// const n = 3
// const result = [[], [], []] //we create it, then we'll fill it

// const wordsPerLine = Math.ceil(items.length / 3)

// for (let line = 0; line < n; line++) {
//   for (let i = 0; i < wordsPerLine; i++) {
//     const value = items[i + line * wordsPerLine]
//     if (!value) continue //avoid adding "undefined" values
//     result[line].push(value)
//   }
// }

function ColumnBlocks (props) {
    let dividedBlocks = [];

    for(let i=0;i<props.numColumns;i++){
        dividedBlocks.push([]);
    }


	return (
        <div className="container">
            <div className="row">
                {props.children}
            </div>
        </div>
	)
}

ColumnBlocks.propTypes = {
    data: PropTypes.array,
    // children: PropTypes.node.isRequired,
    numColumns: PropTypes.number,
    columnClass: PropTypes.string,
}
ColumnBlocks.defaultProps = {
    data: null,
    // children: ``,
    numColumns: 3,
    columnClass: '',
  }
  
export default ColumnBlocks