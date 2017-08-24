import React from 'react';
import { Row, Col } from 'antd';
import { Menu, Icon } from 'antd';

export default class PCFooter extends React.Component{
	render(){
		return(
			<footer>
				<Row>
					<Col span={2}></Col>
					<Col span={20} class="footer">
						&copy;&nbsp;2017 Han JianWen. All Rights Reserved.
					</Col>
					<Col span={2}></Col>
				</Row>
			</footer>
		)
	}
}
