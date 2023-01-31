/**
 * Renders as a notice box with an icon and a configuratble message.
 * Usage: <Notice icon="fa-info-circle" color="var(--uog-red)" grow='2'>Hello this is a notice.</Notice>
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as styles from '../../styles/notice.module.css'

function Notice (props) {

    let notice_styles = {
        borderBottomColor: props.color,
        flexGrow: props.grow
    }

    let notice_icon_styles = {
        backgroundColor: props.color
    }

	return (<>
		<div style={notice_styles} className={styles.notice}>
            <div className={styles.icon_wrap}>
                <div style={notice_icon_styles} className={["fa", styles.icon, props.icon].join(' ')}></div>
            </div>
            <div className={styles.message_wrap}>
                <div className={styles.message}>
                    {props.children}
                </div>
            </div>
		</div>
	</>)
	
}

Notice.propTypes = {
	icon: PropTypes.string,
    color: PropTypes.string,
    grow: PropTypes.string,
    children: PropTypes.node.isRequired,
}

Notice.defaultProps = {
    icon: 'fa-info-circle',
    color: 'var(--uog-yellow)',
    grow: '1',
}

export default Notice
