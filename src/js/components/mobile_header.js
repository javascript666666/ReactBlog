import React from 'react';
import {Dropdown,Modal, Menu, Tabs, Form, message, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;

import {Router, Route, Link, browserHistory} from 'react-router'

class  RegistrationForm extends React.Component{
	constructor() {
		super();
		this.state = {
			current: 'top',
			modalVisible: false,
			action: 'login',
			hasLogined: false,
			userNickName: '',
			userid: 0,
			confirmDirty: false,
    	autoCompleteResult: [],
		};
	};
	setModalVisible(value)
	{
		this.setState({modalVisible: value});
	};
	handleClick(e) {
		console.log(e.key)
		if (e.key == "register") {
			this.setState({current: 'register'});
			this.setModalVisible(true);
		} else {
			{
				this.setState({current: e.key});
			}
		}
	};
	handleSubmit(e)
	{
		//页面开始向 API 进行提交数据
		e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		}
		this.props.form.validateFieldsAndScroll((err, formData) => {
      if (!err) {
				return console.log('Received values of form: ', formData);
      }
      if(formData.r_userName == null ||formData.r_password == null || r_confirmPassword == null ){
      	return console.log("内容不能为空!");
      }
			fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
			+ "&username="+formData.userName+"&password="+formData.password
			+"&r_userName=" + formData.r_userName + "&r_password="
			+ formData.r_password + "&r_confirmPassword="
			+ formData.r_confirmPassword, myFetchOptions)
			.then(response => response.json())
			.then(json => {
				this.setState({userNickName: json.NickUserName, userid: json.UserId});
			});
			if (this.state.action=="login") {
				
				this.setState({hasLogined:true});
			}
			
			message.success("请求成功！");
			this.setModalVisible(false);
	    });
	};




  handleConfirmBlur (e){
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword(rule, value, callback){
    const form = this.props.form;
    if (value && value !== form.getFieldValue('r_password')) {
      callback('二次输入密码不一致,请重新输入');
    } else {
      callback();
    }
  }
  checkConfirm(rule, value, callback){
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['r_confirmPassword'], { force: true });
    }
    callback();
  }

	login(){
		this.setModalVisible(true);
	};


	render(){
		const tailFormItemLayout = {
	      wrapperCol: {
	        xs: {
	          span: 24,
	          offset: 0,
	        },
	        sm: {
	          span: 14,
	          offset: 6,
	        },
	      },
	    };
		const { getFieldDecorator } = this.props.form;

		const formItemLayout = {
     labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
   
    const menu = (
 			<Menu class="ant-menu ant-menu-vertical ant-menu-light ant-menu-root" onClick={this.handleClick.bind(this)} role="menu" aria-activedescendant="" id="nav" tabindex="0"  selectedKeys={[this.state.current]} >
				<Menu.Item key="home">
					<Icon type="home" /> 首页
				</Menu.Item>
				<Menu.Item key="blog">
					<Icon type="edit" /> 博客
				</Menu.Item>
				<Menu.Item key="category">
					<Icon type="appstore" /> 分类
				</Menu.Item>
				<Menu.Item key="essay">
					<Icon type="smile-o" /> 随笔
				</Menu.Item>
				<Menu.Item key="reprint">
					<Icon type="eye" /> 转载
				</Menu.Item>
				<Menu.Item  key="myprofile">
					<Icon type="idcard" /> 简历
				</Menu.Item>
				</Menu>
		);

		const userShow = (this.state.hasLogined?
		<Link>
			<Icon type="inbox" />
		</Link>
		:
		<Icon type="setting" onClick={this.login.bind(this)} />
		);

		return(
			<div id="mobileheader">
				<header>
					<img src="./src/images/logo.png" alt="logo"/>
					<span>韩建文的博客</span>
					{userShow}
					
					 <Dropdown overlay={menu} >
   					 <a className="ant-dropdown-link" href="#">
     				 	<Icon type="down" />
    				</a>
  				</Dropdown>
				</header>

				

				


				<Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel= {()=>this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText = "关闭">
							<Tabs type="card">
								<TabPane tab="注册" key="2">
									<Form onSubmit={this.handleSubmit.bind(this)}>

										<FormItem
						          {...formItemLayout}
						          label={(
						            <span>
						              用户名&nbsp;
						              <Tooltip title="请给您起个响亮的账户名称吧!">
						                <Icon type="question-circle-o" />
						              </Tooltip>
						            </span>
						          )}
						          hasFeedback
						        >
						          {getFieldDecorator('r_userName', {
						            rules: [{ required: true, message: '请输入您的账号名称!', whitespace: true }],
						          })(
						            <Input />
						          )}
						        </FormItem>

						        <FormItem
						          {...formItemLayout}
						          label="邮箱"
						          hasFeedback
						        >
						          {getFieldDecorator('r_userEmail', {
						            rules: [{
						              type: 'email', message: '邮箱格式不对!',
						            }, {
						              required: true, message: '请输入您的邮箱',
						            }],
						          })(
						            <Input  placeholder="123@qq.com"/>
						          )}
						        </FormItem>
						         <FormItem
						          {...formItemLayout}
						          label="密码"
						          hasFeedback
						        >
						          {getFieldDecorator('r_password', {
						            rules: [{
						              required: true, message: '请输入您的密码!',
						            }, {
						              validator: this.checkConfirm.bind(this),
						            }],
						          })(
						            <Input type="password" />
						          )}
						        </FormItem>
						        <FormItem
						          {...formItemLayout}
						          label="确认密码"
						          hasFeedback
						        >
						          {getFieldDecorator('r_confirmPassword', {
						            rules: [{
						              required: true, message: '请确认您的密码!',
						            }, {
						              validator: this.checkPassword.bind(this),
						            }],
						          })(
						            <Input type="password" onBlur={this.handleConfirmBlur.bind(this)} />
						          )}
						        </FormItem>
						        
						        <FormItem {...tailFormItemLayout}>
						          <Button type="primary" htmlType="submit">提交注册</Button>
						        </FormItem>
						      </Form>
								</TabPane>
							</Tabs>
						</Modal>

			</div>
		)
	}
}
const MobileHeader = Form.create()(RegistrationForm);
export default MobileHeader;