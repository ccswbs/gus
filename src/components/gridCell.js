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

const GridCell = ({ children, extraClasses, tag }) => {
    const classes = `grid-cell ${extraClasses}`
    const Tag = tag;

    return(
        <Tag className={classes}>
            {children}
        </Tag>
    )
}

// content-area news-item col-md-3 col-sm-6

GridCell.propTypes = {
    children: PropTypes.node.isRequired,
    extraClasses: PropTypes.string,
    tag: PropTypes.string,
  }
  
  GridCell.defaultProps = {
    children: ``,
    extraClasses: 'col-md-3 col-sm-6',
    tag: 'li',
  }

export default GridCell
