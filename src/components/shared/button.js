import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import { fontAwesomeIconColour } from 'utils/ug-utils';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import classNames from 'classnames';

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
            return 'btn-light';
        case 'Light (Outline)':
            return 'btn-outline-light'
        case 'Dark':
            return 'btn-dark';
        case 'Dark (Outline)':
            return 'btn-outline-dark'
        default:
            return 'btn-primary';
    }
}

function Button (buttonCol, buttonData, buttonSpacing) {
  
    let urlLink = buttonData.field_button_link?.url;
    let buttonLinkTitle = buttonData?.field_formatted_title ? buttonData.field_formatted_title.processed : (buttonData.field_button_link?.title ? buttonData.field_button_link.title : "No title entered");
    let buttonIcon = buttonData?.field_font_awesome_icon;
    let buttonIconColour = buttonData.relationships.field_font_awesome_icon_colour?.name;
    let buttonClasses = classNames('btn', buttonStyle(buttonData.relationships.field_button_style?.name), buttonSpacing, 'no-icon', 'p-4');
    let buttonFontAwesomeClasses = classNames('align-middle','display-2','pe-3', buttonIcon, (buttonIconColour ? fontAwesomeIconColour(buttonIconColour) : null));
    let btnAnalyticsGoal = buttonData.relationships.field_cta_analytics_goal?.name;
    let btnAnalyticsAction = buttonData.relationships.field_cta_analytics_goal?.field_goal_action;
    let buttonTitleClasses = classNames('align-middle','lh-sm');

    // call to action settings
    if (buttonCol === "Call to Action") {
        buttonClasses = classNames(buttonClasses,'text-center');
        buttonTitleClasses = classNames(buttonTitleClasses,'fs-1', 'py-2',(buttonIcon ? 'pe-5' : 'px-5'));
        buttonFontAwesomeClasses = classNames(buttonFontAwesomeClasses,'ps-5');
    } else {
        // default settings
        buttonClasses = classNames(buttonClasses,'text-start');
        buttonTitleClasses = classNames(buttonTitleClasses, 'd-table-cell');
        buttonFontAwesomeClasses = classNames(buttonFontAwesomeClasses,'d-table-cell');
    }

    return (
    <React.Fragment key={buttonData.drupal_id}>
    {buttonData.field_cta_heading && <h2 className="h3 text-dark text-center" dangerouslySetInnerHTML={{__html: buttonData.field_cta_heading.processed}} />}    
    {urlLink && urlLink.includes("http") ? btnAnalyticsGoal && btnAnalyticsAction ? 
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
    buttonSpacing:  PropTypes.string, 
}

Button.defaultProps = {
    buttonData: ``,
    buttonSpacing: ``,
}
export default Button