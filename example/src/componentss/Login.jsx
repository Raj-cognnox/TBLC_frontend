import React,{Component } from "react";
import styled from "styled-components";
import ConnectButton from "../components/ConnectButton";
import Column from "../components/Column";
import RegisterButton from "../components/RegisterButton"

const SLanding = styled(Column)`
  height: 600px;
`;
class Login extends Component { 
    constructor(props){
        super(props)
        this.state ={}
    }
    render(){
        return(
            <SLanding center>
            <img className="w_100" src="./assets/logo.png" />
            <h3 className="font_20">{`Enter your referral ID`}</h3>
            <ConnectButton onClick={this.props.onClickLogin} />
            <RegisterButton onClick={this.props.onClickRegister} />
          
          </SLanding>
        )
    }

}

export default Login;