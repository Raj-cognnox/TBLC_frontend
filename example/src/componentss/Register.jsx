import React,{Component } from "react";
import styled from "styled-components";
import ConnectButton from "../components/ConnectButton";
import Column from "../components/Column";
import RegisterButton from "../components/RegisterButton"

const SLanding = styled(Column)`
    height: 350px;
    text-align: center;
    color: #fff;
    border-radius: 5px;
    padding: 5px;
    border: 1px solid #ddd;
    position: relative;
    top:50px;
  
`;
class Register extends Component {
    constructor(props){
        super(props)
        this.state ={}
    }
setReferrer(event){
    this.setState({ referrer: event.target.value })
}
   
    componentDidMount(){
        let referrerAddress = window.location.href.split("referrer=")[1]
        let referrerAddressInput = this.state.referrer
       this.setState({referrer:referrerAddress || referrerAddressInput})
    }
    
    render()
    {
        
        return(
            <SLanding center>
            <img className="w_100" src="./assets/logo.png" />
            <h3 className="font_20">{`Enter your referral ID`}</h3>
            <input placeholder="Enter your referrer's wallet" onChange={(event) => this.props.setReferrer(event)} value={this.state.referrer} className="text-white w-75 py-2 form-control" id="referrer" />
            <RegisterButton onClick={this.props.onRegistered} />
            <p> If you do not have a referral ID, you can have a default referral ID:0x34dcDACa3f36fcE81A915A13CcD655327B28dE91 </p>
          
          
          </SLanding>
        )
    }

}

export default Register;