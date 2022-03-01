import ColumnLists from 'components/shared/columnLists';
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
    numColumns: PropTypes.number,
}

Careers.defaultProps = {
    careerData: null,
    numColumns: 3,
}

export default Careers