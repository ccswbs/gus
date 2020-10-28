import PropTypes from 'prop-types';
import React from 'react';
import { setHeadingLevel } from '../utils/ug-utils.js';

/* 
Example Usage:
    <GridParent classNames="my-grid">
        <GridCell content={<div>Test 1</div>} classNames="my-class" />
        <GridCell content={<div>Test 2</div>} classNames="my-class" />
        <GridCell content={<div>Test 3</div>} classNames="my-class" />
    </GridParent>
*/

const GridParent = ({ children, extraClasses }) => {
    const classes = `${extraClasses}`;

    return(<ul className={classes}>
                {children}
            </ul>
    )
}

GridParent.propTypes = {
    children: PropTypes.node.isRequired,
    extraClasses: PropTypes.string,
}
  
GridParent.defaultProps = {
    children: ``,
    extraClasses: ``,
  }

export default GridParent
