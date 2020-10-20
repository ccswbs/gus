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

const GridCell = ({ children, classNames, tag }) => {
    const classes = `${classNames}`
    const Tag = tag;

    return(
        <Tag className={classes}>
            {children}
        </Tag>
    )
}

GridCell.propTypes = {
    children: PropTypes.node.isRequired,
    classNames: PropTypes.string,
    tag: PropTypes.string,
  }
  
  GridCell.defaultProps = {
    children: ``,
    classNames: ``,
    tag: 'li',
  }

export default GridCell
