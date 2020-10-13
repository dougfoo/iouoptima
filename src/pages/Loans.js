import React, { Component } from "react";
import { InputNumber, Select, DatePicker, Input, Modal, Button, Table, message } from 'antd';
import axios from 'axios';
import * as MyConsts from '../configs';

const { Option } = Select;

/* select options -- can i make this a react native function ?? */
function onChange(value) {
  console.log(`selected ${value}`);
}
function onSearch(val) {
  console.log('search:', val);
}

class Loans extends Component {
  state = { 
    visible: false,
    loans: [],
    friends: [],   // AB#60 -- how to add this
    add_payee: '',
    add_date: '',
    add_description: '',  // auto added, but add here for clarity
    add_amount: 0         // auto added, but add here for clarity
  };  // move these add_ to an obj sometime later

  componentDidMount() {
    console.log('consolemount');
    try {
        axios.get(MyConsts.API_URL + '/loans/').then(response => response.data)
            .then((data) => {
                console.log('loans',data);
                this.setState({ loans: data });
            })
            .catch(function (error) {
              message.error("Axios backend loans error: "+error);
            })

        axios.get(MyConsts.API_URL + '/users/').then(response => response.data)  // change to /friends later
            .then((data) => {
                console.log('friends',data);
                this.setState({ friends: data });
            })
            .catch(function (error) {
              message.error("Axios backend users error: "+error);
            })
    } catch (error) {
      console.error(error);
      message.error("Axios unhandled error: "+error);
    }
  }

  addNewLoanModal = e => {
    console.log("make IOU");
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log('handleOk', e);
    this.setState({
      visible: false,
    });

    const userid = MyConsts.getTokens().userid;
    
    const add_data = {payee: userid, payor: this.state.add_payee, date:'2019-06-30', // date: this.state.add_date,
                    amount: this.state.add_amount, description: this.state.add_description, status:'P'}
    console.log('add_data: ' , add_data)

    try {
      const response = axios.post(MyConsts.API_URL + '/loans/', add_data)
        .then((data) => {
          console.log(data);
          message.success("saved");
        })
        .catch(function (error) {
          message.error("Axios backend users error: "+error);
        })
      console.log(response);
    }
    catch(error) {
      message.error("save error: "+error);
    }
    this.setState(prevState => ({
      loans: [...prevState.loans, add_data]
    }))
  };

  handleChange = e => {
    const { name,value } = e.target;
    console.log(name+'->'+value);
    this.setState({
      [name]: value   // adds new state dynamically for now
    })
  }

  // kind of annoying no 'name' property so have to split a new function
  handleAmountChange = e => {
    this.setState({
      add_amount: e,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  onSelectDate = e => {
    console.log('onselectDate: '+e);
    this.setState({
      'add_date': e,
    });
  };

  onSelectPayee = e => {
    console.log('onselectPayee: '+e);
    this.setState({
      'add_payee': e,
    });
  };

  render() {
    console.log('loanrender props',this.props);
    const data = this.state.loans;
    const columns = [
      {
        title: 'Payee',
        dataIndex: 'payee_email',
        key: 'payee_email',
        render: text => <a href="/loans/">{text}</a>,
      },
      {
        title: 'Payor',
        dataIndex: 'payor_email',
        key: 'payor_email',
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="/loans/">Action Loan {record.name}</a>
          </span>
        ),
      },
    ];

    return (
      <React.Fragment>
        <h1>Loans</h1>        
        <Button onClick={this.addNewLoanModal} >Make New IOU</Button>
        <Modal
          title="Make New IOU"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okButtonProps={{ disabled: false }}
          cancelButtonProps={{ disabled: false }}
        >
          <p>Enter new IOU...</p>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a Friend"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            onSelect={this.onSelectPayee}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {this.state.friends.map(({id, email2}) => (
                <Option name="selopt" value={id} >{email2}</Option>
            ))}
          </Select>
          <p></p>
          Loan Amount: <InputNumber placeholder="Enter Amount" onChange={this.handleAmountChange}/>
          Date: <DatePicker format="MM/DD/YYYY" name="add_date" showToday={true} onChange={this.onSelectDate} />
          <Input placeholder="Enter Description" name="add_description" onChange={this.handleChange}/>
          <p>Warning: Avoid Loan Sharks...</p>
        </Modal>
        <Table columns={columns} expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>} dataSource={data} />,
      </React.Fragment>
    )
  }
}

//ReactDOM.render(<Table columns={columns} dataSource={data} />, mountNode);

export default Loans;