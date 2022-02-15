import PropTypes from 'prop-types';
import React from 'react';

const LinksParent = (props) => {

    const classes = `${props.extraClasses}`;
    const Tag = props.tag;
    return(<Tag className={classes}>
                {props.children}
            </Tag>
    )
}

LinksParent.propTypes = {
    children: PropTypes.node.isRequired,
    extraClasses: PropTypes.string,
    tag: PropTypes.string,
}
  
LinksParent.defaultProps = {
    children: ``,
    extraClasses: ``,
    tag: 'div',
  }

export default LinksParent