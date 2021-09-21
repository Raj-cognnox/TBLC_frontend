import * as React from "react";
import styled from "styled-components";
import * as PropTypes from "prop-types";
import Blockie from "./Blockie";
import Banner from "./Banner";
import { ellipseAddress, getChainData } from "../helpers/utilities";
import { transitions } from "../styles";


const SHeader = styled.div`
  margin-top: -1px;
  margin-bottom: 1px;
  width: 100%;
  height: 84px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding:0px 16px;
  background-color: #1d1e25!important;
  box-shadow: 15px 0 40px 0 rgb(0 0 0 / 50%);

`;

const SActiveAccount = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  font-weight: 500;
`;

const SActiveChain = styled(SActiveAccount)`
  flex-direction: column;
  text-align: left;
  width:60%;
  align-items: flex-start;
  & p {
    font-size: 0.8em;
    margin-left: 25px;
    margin-top: -2px;
    padding: 0;
  }
  & p:nth-child(2) {
    font-weight: bold;
  }
`;

const SBlockie = styled(Blockie)`
margin-right: 73px;
position: relative;
width: 35px;
display: flex;
  
`;

interface IHeaderStyle {
  connected: boolean;
}

const SAddress = styled.p<IHeaderStyle>`
  transition: ${transitions.base};
  font-weight: bold;
  margin: ${({ connected }) => (connected ? "-2px auto 0.7em" : "0")};
`;

const SDisconnect = styled.div<IHeaderStyle>`
  transition: ${transitions.button};
  font-size: 12px;
  font-family: monospace;
  position: absolute;
  right: 0;
  top: 20px;
  opacity: 0.7;
  cursor: pointer;
  width:40%;

  opacity: ${({ connected }) => (connected ? 1 : 0)};
  visibility: ${({ connected }) => (connected ? "visible" : "hidden")};
  pointer-events: ${({ connected }) => (connected ? "auto" : "none")};

  &:hover {
    transform: translateY(-1px);
    opacity: 0.5;
  }
`;

interface IHeaderProps {
  killSession: () => void;
  connected: boolean;
  address: string;
  chainId: number;
  checked: boolean;
}



const Header = (props: IHeaderProps) => {
  const { connected, address, chainId, killSession, checked } = props;
  const chainData = chainId ? getChainData(chainId) : null;


  function sidebarToggle() {
    document.body.classList.toggle('sb-sidenav-toggled');

  }

  return (
    <SHeader {...props}>
      {connected && chainData && checked ? (

        
        <SActiveChain>
         
            <div className="logo_header"> <a className="bar_btn" href="#" onClick={sidebarToggle}><i className="fas fa-bars"></i></a> <span>TBLC Exchange</span>  </div>
             {/* <p className="blink_me ml-5"> {chainData.name} </p> */}
         
          
        </SActiveChain>
      ) : (
        <Banner />
      )}
      {address && checked ? (
        <SActiveAccount>
          <SBlockie address={address} />
          
        
          <SDisconnect connected={connected} onClick={killSession}>
         <p className="logout">{"LogOut"}</p>
          </SDisconnect>
        </SActiveAccount>
      ) : ""}
    </SHeader>
  );
};

Header.propTypes = {
  killSession: PropTypes.func.isRequired,
  address: PropTypes.string,
};


export default Header;
