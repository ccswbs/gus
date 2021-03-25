import PropTypes from 'prop-types';
import React from 'react';
import SVG from 'react-inlinesvg';
import '../styles/button-widget.css'
import { contentExists } from '../utils/ug-utils';


function ButtonStyle (styleOfButton){
    switch(styleOfButton){
        case 'Primary':
            return 'btn-primary';
        case 'Primary (Outline)':
            return 'btn-outline-primary';
        case 'Secondary':
            return 'btn-secondary';
        case 'Secondary (Outline)':
            return 'btn-outline-secondary';
        default:
            return 'btn-primary';
    }
}

function FontAwesomeIconColour (colourChoice) {
    switch(colourChoice) {
        case 'Yellow':
            return 'yellow-icon';
        case 'Red':
            return 'red-icon';
        case 'Darker Red':
            return 'red-darker-icon)';
        default: 
            return '';
    }
}

function ButtonsSection (props) {
console.log (props.pageData.relationships.field_buttons)
let fieldButtonsData = contentExists(props.pageData.relationships.field_buttons)? props.pageData.relationships.field_buttons: '';
    return (
        <React.Fragment>
            {contentExists(fieldButtonsData) && fieldButtonsData.length !== 0 && <>
                {fieldButtonsData.map (buttonData => {
                    console.log(buttonData)
                    let buttonLinkURI = buttonData.field_button_link.uri;
                    // let buttonLinkTitle = contentExists(buttonData.field_formatted_title)? buttonData.field_formatted_title.processed:
                    //     contentExists(buttonData.field_button_link.title)? buttonData.field_button_link.title: "no title entered";    
                                           
                    let buttonLinkTitle = contentExists(buttonData.field_button_link)? buttonData.field_button_link.title: "no title entered";    
                                           
                    let buttonClassName= 'btn ' + ButtonStyle(buttonData.relationships.field_button_style.name) +' btn-block section-button' ;
                    let buttonFontAwesomeClassName = contentExists(buttonData.field_font_awesome_icon)? 'fas ' + buttonData.field_font_awesome_icon +
                                                ' fa-pull-left section-button-icon '+ FontAwesomeIconColour(buttonData.relationships.field_font_awesome_icon_colour.name):'';
    
                    return <React.Fragment key={buttonData.drupal_id}>
                        <a href={buttonLinkURI} className={buttonClassName}>
                            <i aria-hidden="true" className={buttonFontAwesomeClassName} > </i>
                            <div className="section-button-text" dangerouslySetInnerHTML={{__html: buttonLinkTitle}} />
                        </a>
                    </React.Fragment>
                })}
           </> }
        </React.Fragment>
    )

}

ButtonsSection.propTypes = {
    pageData: PropTypes.object,
}

ButtonsSection.defaultProps = {
    pageData: '',
}
export default ButtonsSection