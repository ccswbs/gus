/**
 * Renders a building capacity widget that updates in real time. 
 * The widget fetches the building capacity from the SenSource API every 10 seconds. 
 * 
 * Usage: <BuildingCapacityNotice />
 */

import React from 'react';
import { useEffect, useState } from 'react';
import Notice from './notice';
import * as styles from '../../styles/buildingCapacity.module.css'

function BuildingCapacityNotice () {

	let [capacity, setCapacity] = useState("...");
	let [icon, setIcon] = useState("fa-info-circle");
	let [color, setColor] = useState("var(--uog-yellow)");
	let [visible, setVisible] = useState(false);

	useEffect(() => {
		const url = typeof window !== 'undefined' ? window.location.href : '';
		
		const fetch_occupancy = () => {
			const baseUrl = `https://display.safespace.io`;
			const spaceCode = 'e81c82f9';
			const hoursUrl = 'https://api3-ca.libcal.com/api_hours_today.php?iid=3228&format=json';
			
			let occupancy_precent = 0;
			let occupants = 0;
			let max_capacity = 0;
			var building_open = false;
		
			Promise.all([
				fetch(hoursUrl)
					.then((response) => response.json())
					.then((body) => building_open = get_building_open(body.locations)),

				fetch(`${baseUrl}/value/live/${spaceCode}`)
					.then((response) => response.text())
					.then((val) => occupants = val),
		
				fetch(`${baseUrl}/entity/space/hash/${spaceCode}`)
					.then((response) => response.json())
					.then((body) => max_capacity = body.space.maxCapacity),
		
			]).then(() => {
				if (!building_open) {
					setVisible(false);
				} else {
					setVisible(true);
				}

				occupancy_precent = Math.floor((occupants / max_capacity) * 100);
				setCapacity(occupancy_precent + "%");
				update_icon(occupancy_precent);
			});
		}

		const get_building_open = (locations) => {
			let library = locations.find(location => location.lid === 1911);
			return library.times.currently_open;
		}

		const update_icon = (percent) => {

			if (percent < 75) {
				setIcon('fa-check');
				setColor('var(--green)');
			}
			else if (percent < 90 ) {
				setIcon('fa-info-circle');
				setColor('var(--uog-yellow)');
			}
			else {
				setIcon('fa-exclamation-triangle');
				setColor('var(--danger)');
			}
		}
		
		if (url.match("/thelinc/contact/?")) {
		   fetch_occupancy();
		   setInterval(fetch_occupancy, 120000);
		}

	}, []);

	if (!visible) {
		return (<></>);
	}
	else {
		return (<>
			<Notice icon={icon} color={color} className={visible}>
				<span className={styles.message}>
					<span>Current building occupancy is</span> <span id={styles.current_occupancy}>{capacity}</span>
				</span>
			</Notice>
		</>);
	}
	
	
}

export default BuildingCapacityNotice
