import PropTypes from 'prop-types';
import React from 'react';

/* 
Example Usage:
    <Grid classNames="my-grid">
        <GridCell content={<div>Test 1</div>} classNames="my-class" />
        <GridCell content={<div>Test 2</div>} classNames="my-class" />
        <GridCell content={<div>Test 3</div>} classNames="my-class" />
    </Grid>
*/

const Grid = ({ children, classNames }) => {
    const classes = `${classNames}`

    return(
        <ul className={classes}>
            {children}
        </ul>
    )
}

Grid.propTypes = {
    children: PropTypes.node.isRequired,
    classNames: PropTypes.string,
}
  
  Grid.defaultProps = {
    children: ``,
    classNames: ``,
  }

export default Grid
