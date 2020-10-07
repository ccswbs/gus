import ColumnLists from '../components/columnLists';
import PropTypes from 'prop-types';
import React from 'react';

function Careers (props) {
    return (<ColumnLists numColumns={props.numColumns}>
                {props.careerData.map (unit => {
                return <li key={unit.node.drupal_id}>{unit.node.title}</li>
                })}
            </ColumnLists>
    )
}

Careers.propTypes = {
	careerData: PropTypes.array,
}

Careers.defaultProps = {
    careerData: null,
}

export default Careers