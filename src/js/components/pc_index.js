import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCMainWrapper from './pc_mainwrapper';
export default class PCIndex extends React.Component{
	render() {
		return (
			<div>
				<PCHeader />
				<PCFooter />
				<PCMainWrapper/>
			</div>
		);
	}
}
