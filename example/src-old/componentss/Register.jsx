import React,{Component } from "react";
import styled from "styled-components";
import ConnectButton from "../components/ConnectButton";
import Column from "../components/Column";
import RegisterButton from "../components/RegisterButton"

const SLanding = styled(Column)`
height: 450px;
background-color: rgb(60, 55, 42);
text-align: center;
color: #fff;
border-radius: 10px;
padding:10px;
margin-top: 40px;
  
`;
class Register extends Component {
    constructor(props){
        super(props)
        this.state ={}
    }
    render(){
        return(
            <SLanding center>
            <img className="w_100" src="./assets/logo.png" />
            <h3 className="font_20">{`Enter your referral ID`}</h3>
            <input placeholder="Enter your referrer's wallet" onChange={(event) => this.props.setReferrer(event)} className="text-white w-75 py-2 form-control" id="referrer" />
            <RegisterButton onClick={this.props.onRegistered} />
            <p> If you do not have a referral ID, you can have a default referral ID: 0x412e920767c41a1d285a27fd4c0f62dfad2a95bf</p>
          </SLanding>
        )
    }

}

export default Register;