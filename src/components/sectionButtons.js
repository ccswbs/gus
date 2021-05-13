import PropTypes from 'prop-types';
import React from 'react';
import '../styles/button-widget.css'
import { contentExists } from '../utils/ug-utils';
import Button from "../components/button";

function ColumnClass (columnName) {
    switch (columnName){
        case 'right':
            return 'btn-block section-button-rigth';
        case 'left':
            return 'section-button-left';
        default:
            return 'section-button-main';
    }      
}
function ButtonClass (columnName) {
    switch (columnName){
        case 'right':
            return 'section-button-rigth-layout';
        case 'left':
            return 'section-button-left-layout';
        default:
            return 'section-button-main-layout';
    }      
}


function SectionButtons (props) {

/***
Set variables to control button layout 
	if column is right use section-button-right
	if column is left use section-button-left
	if column is main use section-button-main

Note: if button has a Font Awesome Icon - the placement of the FA Icon is affected by the column 
***/

console.log(props.pageData.relationships.field_section_column)
const columnClass = (contentExists(props.pageData.relationships.field_section_column))? ColumnClass (props.pageData.relationships.field_section_column.name): "section-button-main";
const buttonClassWraper = (contentExists(props.pageData.relationships.field_section_column))? ButtonClass (props.pageData.relationships.field_section_column.name): '';
let fieldButtonsData = contentExists(props.pageData.relationships.field_buttons)? props.pageData.relationships.field_buttons: '';
    return (
        <React.Fragment>
            <div class={buttonClassWraper}>
            {contentExists(fieldButtonsData) && fieldButtonsData.length !== 0 && <>
                {fieldButtonsData.map (buttonData => {
                    return Button(buttonData,
                                 columnClass,
                                 'section-button-icon',
                                 'section-button-text',
                        )
                })}
           </> }</div>
        </React.Fragment>
    )

}

SectionButtons.propTypes = {
    pageData: PropTypes.object,
}

SectionButtons.defaultProps = {
    pageData: '',
}
export default SectionButtons