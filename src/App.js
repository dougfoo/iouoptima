import 'antd/dist/antd.css';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink, Redirect } from 'react-router-dom';
import { Form, Layout, Menu, } from 'antd';
import axios from 'axios';

import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Loans from './pages/Loans';
import Users from './pages/Users';
import Profile from './pages/Profile';

const { Header, Footer, Content } = Layout;

// import uuid from 'uuid';
const API_URL = 'http://localhost:8000';

const BackendAPI = {
  loadUsers() {
    try {
      axios.get(API_URL + '/users/').then(response => response.data)
      .then((data) => {
        this.setState({ users: data })
        console.log(this.state.users)
       })
    } catch (error) {
      console.error(error);
    }
  },
  loadLoans() {
    return false;
  },
}

class App extends Component {
  state = {
    isAuthenticated: false,
    activeUsername: 'nobody',
    activeUser: {
      id: 1,
      firstName: 'doug',
      lastName: 'foo',
      phone: '650-629-9731',
      email: 'doug.foo@gmail.com',
      friends: [],
      password: 'abcd'
    },
    users: [
      {
        id: 1,
        firstName: 'doug',
        lastName: 'foo',
        phone: '650-629-9731',
        email: 'doug.foo@gmail.com',
        friends: [],
        password: 'abcd'
      },
      {
        id: 2,
        firstName: 'foxy',
        lastName: 'foo',
        phone: '519-629-9731',
        email: 'foxy.foo@gmail.com',
        friends: [],
        password: '1234'

      },
      {
        id: 3,
        firstName: 'rob',
        lastName: 'weber',
        phone: '81-800-6329-9731',
        email: 'rober@gmail.com',
        friends: [],
        password: 'ab12'
      }
    ],
    loans: [
      {
        id: 1,
        payee: 1,
        payor: 2,
        date: '2019-05-05',
        amount: '333.50',
        description: 'loan 1 long description blah blah blah',
        status: 'P'
      },
      {
        id: 2,
        payee: 2,
        payor: 3,
        date: '2019-06-05',
        amount: '100',
        description: 'loan 2',
        status: 'A'
      }
    ]
  };

  componentDidMount() {
    console.log('consolemount');
    BackendAPI.loadUsers();
    BackendAPI.loadLoans();
  }


  setRegister = (username) => {
    console.log('registering '+username);
  }

  setLogin = (username) => {
    if (username) {
      this.setState({isAuthenticated: true, activeUsername: username
      // set activeUser: ... ?
      });
    }
    else {
      this.setState({isAuthenticated: false, activeUsername: 'nobody', activeUser: ''});
    }
  }

  render() {
    const LoginForm = Form.create()(Login);   // can i put this in the Login.js
    const RegistrationForm = Form.create()(Register);  // can i put this in Register.js

    return (
      <BrowserRouter >
        <div>
          <Layout className="layout">
            <Header>
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }} >
                  <Menu.Item key="1"><NavLink to="/login" activeClassName="active">Login/Logout</NavLink></Menu.Item>
                  <Menu.Item key="2"><NavLink to="/loans" activeClassName="active">Loans</NavLink></Menu.Item>
                  <Menu.Item key="3"><NavLink to="/users" activeClassName="active">Friends</NavLink></Menu.Item>
                  <Menu.Item key="4"><NavLink to="/profile" activeClassName="active">My Profile</NavLink></Menu.Item>
                  <Menu.Item key="5"><NavLink to="/about" activeClassName="active">About</NavLink></Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
              <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                <Route exact path="/" render={() => ( <Redirect to="/about"/>)} />
                <Route path="/login" render={(props) => <LoginForm {...props} activeUser={this.state.activeUsername} loginCallback={this.setLogin} /> } />
                <Route path="/register" render={(props) => <RegistrationForm {...props} registerCallback={this.setRegister} /> } />
                <Route path="/loans" render={(props) => <Loans {...props} loans={this.state.loans} />} />
                <Route path="/users" render={(props) => <Users {...props} users={this.state.users} />} />
                <Route path="/profile" render={(props) => <Profile {...props} activeUser={this.state.activeUser} />} />
                <Route path="/about" component={About} />
              </div>
            </Content>
            <Content style={{ textAlign: 'center' }}>
              <div style={{  padding: 6, minHeight: 30 }}>
                  Logged In: {this.state.activeUsername}
              </div>
            </Content>
            <Footer style={{ background: '#ddd', textAlign: 'center' }}>©2018 Doug Foo</Footer>
          </Layout>
        </div>  
      </BrowserRouter>
    );
  }
}

export default App;

