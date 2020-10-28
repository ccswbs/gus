import PropTypes from 'prop-types';
import React from 'react';

/* 
Example Usage:
    <GridParent classNames="my-grid">
        <GridCell content={<div>Test 1</div>} classNames="my-class" />
        <GridCell content={<div>Test 2</div>} classNames="my-class" />
        <GridCell content={<div>Test 3</div>} classNames="my-class" />
    </GridParent>
*/

const GridParent = ({ children, classNames }) => {
    const classes = `${classNames}`

    return(
        <ul className={classes}>
            {children}
        </ul>
    )
}

GridParent.propTypes = {
    children: PropTypes.node.isRequired,
    classNames: PropTypes.string,
}
  
GridParent.defaultProps = {
    children: ``,
    classNames: ``,
  }

export default GridParent
