import React, { Component } from 'react'
import {Navbar,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'

const axios=require('axios').default

const {REACT_APP_URL} = process.env;

class navbar extends Component {

    constructor(props){
        super(props);
        this.state={
            uname : null
        }
    }

    async componentDidMount(){
        const resp = await axios.get(REACT_APP_URL+'/users/me',{
            headers: {
                'Authorization': localStorage.getItem('token')
              }
        })

        if(resp.status==200){
            this.setState({uname : `Hi, ${resp.data.name}`});
        }
    }

    async handleLogout(event){
        const {history}=this.props;
        event.preventDefault();
        this.setState({uname : null})
        localStorage.setItem('token','')
        history.push("/");
    }

    render() {
        if(this.state.uname){
            return(
                <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='p-0 m-0'>
                <Navbar.Brand href="/" className="p-0 m-0"><img src = "/images/logo.png" className="p-0 m-0" width="125px" height="55px" alt="logo"/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="p-0 m-0" />
                <Navbar.Collapse id="responsive-navbar-nav" className="p-0 m-0">
                    <Nav className="mr-auto p-0 m-0">
                    <Nav.Link href="/" className="ml-3">Home</Nav.Link>
                    </Nav>
                    <Nav className="mr-5">
                    <NavDropdown title={this.state.uname} id="basic-nav-dropdown">
                        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link className="ml-3" onClick = {this.handleLogout.bind(this)}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                </div>
            )
        }
        else{
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='p-0 m-0'>
                <Navbar.Brand href="/" className="p-0 m-0"><img src = "/images/logo.png" className="p-0 m-0" width="125px" height="55px" alt="logo"/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="p-0 m-0" />
                <Navbar.Collapse id="responsive-navbar-nav" className="p-0 m-0">
                    <Nav className="mr-auto p-0 m-0">
                    <Nav.Link href="/" className="ml-3">Home</Nav.Link>
                    </Nav>
                    <Nav className="mr-5">
                    <Nav.Link href="/Login" className="ml-3">Login</Nav.Link>
                    <Nav.Link href="/Signup" className="ml-3">Signup</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </div>    
        )
    }
 }
}

export default withRouter(navbar);