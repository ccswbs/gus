import PropTypes from 'prop-types';
import React from 'react';
import '../styles/button-widget.css'
import { contentExists } from '../utils/ug-utils';
import Button from "../components/button";

function ColumnClass (columnName) {
    switch (columnName){
        case 'right':
            return 'btn-block section-button-right';
        case 'left':
            return 'section-button-left';
        case 'cta':
            return 'section-button-cta'
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
        case 'cta':
            return 'section-button-cta-layout';
        default:
            return 'section-button-main-layout';
    }      
}
function TextClass (columnName) {
    switch (columnName){
        case 'cta':
            return 'section-button-cta-text';
        default:
            return 'section-button-text';
    }      
}
function IconClass (columnName) {
    switch (columnName){
        case 'right':
            return 'fa-pull-left section-button-icon-right'
        case 'cta':
            return 'section-button-icon-cta';
        default:
            return 'section-button-icon';
    }      
}

function SectionButtons (props) {
console.log(props)
/***
Set variables to control button layout 
	if column is right use section-button-right
	if column is left use section-button-left
	if column is main use section-button-main

Note: if button has a Font Awesome Icon - the placement of the FA Icon is affected by the column 
***/

const columnClass = (contentExists(props.pageData.relationships.field_section_column))? ColumnClass (props.pageData.relationships.field_section_column.name): "section-button-main";
const buttonClassWraper = (contentExists(props.pageData.relationships.field_section_column))? ButtonClass (props.pageData.relationships.field_section_column.name): '';
const buttonTextWraper = (contentExists(props.pageData.relationships.field_section_column))? TextClass (props.pageData.relationships.field_section_column.name): '';
const buttonIconWraper = (contentExists(props.pageData.relationships.field_section_column))? IconClass (props.pageData.relationships.field_section_column.name): '';
let fieldButtonsData = contentExists(props.pageData.relationships.field_buttons)? props.pageData.relationships.field_buttons: '';
    return (
        <React.Fragment>
            <div class={buttonClassWraper}>
            {contentExists(fieldButtonsData) && fieldButtonsData.length !== 0 && <>
                {fieldButtonsData.map (buttonData => {
                    return Button(buttonData,
                                 columnClass,
                                 buttonIconWraper,
                                 buttonTextWraper,
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