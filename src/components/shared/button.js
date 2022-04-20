import PropTypes from 'prop-types';
import React from 'react';
//import 'styles/button-widget.css'
import { Link } from 'gatsby';
import { fontAwesomeIconColour } from 'utils/ug-utils';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

function buttonStyle(styleOfButton) {
    switch(styleOfButton){
        case 'Primary':
            return 'btn-primary';
        case 'Primary (Outline)':
            return 'btn-outline-primary';
        case 'Secondary':
            return 'btn-secondary';
        case 'Secondary (Outline)':
            return 'btn-outline-secondary';
        case 'Info':
            return 'btn-info';
        case 'Info (Outline)':
            return 'btn-outline-info'
        case 'Success':
            return 'btn-success';
        case 'Success (Outline)':
            return 'btn-outline-success'
        case 'Warning':
            return 'btn-warning';
        case 'Warning (Outline)':
            return 'btn-outline-warning'
        case 'Danger':
            return 'btn-danger';
        case 'Danger (Outline)':
            return 'btn-outline-danger'
        case 'Light':
            return 'btn-white';
        case 'Light (Outline)':
            return 'btn-outline-white'
        case 'Dark':
            return 'btn-black';
        case 'Dark (Outline)':
            return 'btn-outline-black'
        default:
            return 'btn-primary';
    }
}

function Button (buttonData, buttonWidth) {
  
    let urlLink = buttonData.field_button_link?.url;
    let buttonLinkTitle = buttonData?.field_formatted_title ? buttonData.field_formatted_title.processed : (buttonData.field_button_link?.title ? buttonData.field_button_link.title : "No title entered");
    let buttonIcon = buttonData?.field_font_awesome_icon;
    let buttonIconColour = buttonData.relationships.field_font_awesome_icon_colour?.name;
    let buttonClasses = "btn " + buttonStyle(buttonData.relationships.field_button_style?.name) + " " + buttonWidth + " no-icon p-4 text-start d-table-row";
    let buttonFontAwesomeClasses = "align-middle d-table-cell display-1 w-25 " + buttonIcon + (buttonIconColour ? " " + fontAwesomeIconColour(buttonIconColour) : null);
    let btnAnalyticsGoal = buttonData.relationships.field_cta_analytics_goal?.name;
    let btnAnalyticsAction = buttonData.relationships.field_cta_analytics_goal?.field_goal_action;
    let buttonTitleClasses = "d-table-cell lh-sm";
    
    return (
    <React.Fragment key={buttonData.drupal_id}>
    {buttonData.field_cta_heading && <span dangerouslySetInnerHTML={{__html: "<p>" + buttonData.field_cta_heading.processed + "</p>"}} />}    
    {buttonData.field_button_link.uri.includes("http") ? btnAnalyticsGoal && btnAnalyticsAction ? 
        <a href={urlLink} className={buttonClasses} onClick={e => {trackCustomEvent({category: btnAnalyticsGoal,action: btnAnalyticsAction,})}}>		
            {buttonIcon && <i aria-hidden="true" className={buttonFontAwesomeClasses}> </i>}
            <span className={buttonTitleClasses} dangerouslySetInnerHTML={{__html: buttonLinkTitle}} />
        </a>
        :
        <a href={urlLink} className={buttonClasses}>
            {buttonIcon && <i aria-hidden="true" className={buttonFontAwesomeClasses}> </i>}
            <span className={buttonTitleClasses} dangerouslySetInnerHTML={{__html: buttonLinkTitle}} />
        </a>
        :
        btnAnalyticsGoal && btnAnalyticsAction ? 
        <Link to={urlLink} className={buttonClasses} onClick={e => {trackCustomEvent({category: btnAnalyticsGoal,action: btnAnalyticsAction,})}}>		
            {buttonIcon && <i aria-hidden="true" className={buttonFontAwesomeClasses}> </i>}
            <span className={buttonTitleClasses} dangerouslySetInnerHTML={{__html: buttonLinkTitle}} />
        </Link>
        :
        <Link to={urlLink} className={buttonClasses}>
            {buttonIcon && <i aria-hidden="true" className={buttonFontAwesomeClasses}> </i>}
            <span className={buttonTitleClasses} dangerouslySetInnerHTML={{__html: buttonLinkTitle}} />
        </Link>        
    }
    </React.Fragment>)
}
Button.propTypes = {
    buttonData: PropTypes.object,
    buttonWidth:  PropTypes.string, 
}

Button.defaultProps = {
    buttonData: '',
    buttonWidth: '',
}
export default Button