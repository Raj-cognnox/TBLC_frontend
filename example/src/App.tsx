import * as React from "react";
import styled from "styled-components";
import Web3 from "web3";
import { convertUtf8ToHex } from "@walletconnect/utils";

import Web3Modal, { themesList } from "web3modal";
// @ts-ignore
import WalletConnectProvider from "@walletconnect/web3-provider";
// @ts-ignore
import Fortmatic from "fortmatic";
import Torus from "@toruslabs/torus-embed";
import Authereum from "authereum";
import { Bitski } from "bitski";
import Button from "./components/Button";
import Column from "./components/Column";
import Wrapper from "./components/Wrapper";
import Withdraw from './componentss/Withdraw';

import Modal from "./components/Modal";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Referral from './componentss/Referral';
import TopUp from './componentss/TopUp';
import ModalResult from "./components/ModalResult";
import AccountAssets from "./components/AccountAssets";
import ConnectButton from "./components/ConnectButton";
import RegisterButton from "./components/RegisterButton";
import Login from "./componentss/Login";
import Register from "./componentss/Register";
import Dashboard from "./componentss/Dashboard"
import Wallet from "./componentss/Wallet"
import Profile from './componentss/Profile';
import TotalIncome from './componentss/TotalIncome';
// import LevelIncome from './componentss/LevelIncome';
import Income_details from './componentss/Income_details';
import Stakes from './componentss/Stakes';
import Reward from './componentss/Reward';
import { withRouter, RouteProps } from 'react-router';

import {Switch, Link, Route} from 'react-router-dom';

//import { apiGetAccountAssets } from "./helpers/api";
import {
  hashPersonalMessage,
  recoverPublicKey,
  recoverPersonalSignature,
  formatTestTransaction,
  getChainData
}from "./helpers/utilities";
import { IAssetData, IBoxProfile } from "./helpers/types";
import { fonts } from "./styles";
import { openBox, getProfile } from "./helpers/box";
import { DEPLOYER_ADDRESS, REACT_APP_BACKEND_URL } from "./constants/constants";
import {getAxios, postAxios, getFetch} from "./helpers/api"
import { number } from "prop-types";
import { getBalance } from "./helpers/bpntoken";
const SLayout = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  text-align: center;
`;

const SContent = styled(Wrapper)`
  width: 100%;
  height: 100%;
  padding: 0 16px;
`;

const SContainer = styled.div`
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  word-break: break-word;
`;

const SLanding = styled(Column)`
  height: 300px;
  border: 2px solid #ddd;
  position: relative;
  top:50px;
`;

const SModalContainer = styled.div`
  width: 100%;
  position: relative;
  word-wrap: break-word;
`;

const SModalTitle = styled.div`
  margin: 1em 0;
  font-size: 20px;
  font-weight: 700;
`;

const SModalParagraph = styled.p`
  margin-top: 30px;
`;

// @ts-ignore
const SBalances = styled(SLanding)`
  height: 100%;
  & h3 {
    padding-top: 30px;
  }
`;

const STestButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const STestButton = styled(Button)`
  border-radius: 8px;
  font-size: ${fonts.size.medium};
  height: 44px;
  width: 100%;
  max-width: 175px;
  margin: 12px;
`;

interface IAppState {
  fetching: boolean;
  address: string;
  web3: any;
  provider: any;
  connected: boolean;
  checked: boolean;
  register: boolean;
  connect: boolean;
  chainId: number;
  networkId: number;
  assets: IAssetData[];
  showModal: boolean;
  pendingRequest: boolean;
  result: any | null;
  referrer:any| "",
  referrerError:boolean;
  balance:number;
  hvrxBalance:number;
  referrerVerified:boolean
}

const INITIAL_STATE: IAppState = {
  fetching: false,
  address: "",
  web3: null,
  provider: null,
  connected: false,
  checked: false,
  register: true,
  connect: true,
  chainId: 1,
  networkId: 1,
  assets: [],
  showModal: false,
  pendingRequest: false,
  result: null,
  referrer:"",
  referrerError:false,
  balance :0,
  hvrxBalance: 0,
  referrerVerified:false
};

function initWeb3(provider: any) {
  const web3: any = new Web3(provider);

  web3.eth.extend({
    methods: [
      {
        name: "chainId",
        call: "eth_chainId",
        outputFormatter: web3.utils.hexToNumber
      }
    ]
  });

  return web3;
}

class App extends React.Component<any, any> {
  // @ts-ignore
  public web3Modal: Web3Modal;
  public state: IAppState;

  constructor(props: any) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      referrerVerified:false
    };

    this.web3Modal = new Web3Modal({
      network: this.getNetwork(),
      cacheProvider: true,
      providerOptions: this.getProviderOptions()
    });
    this.updateState = this.updateState.bind(this)
    this.callGetapi = this.callGetapi.bind(this)
    this.onBannerClick = this.onBannerClick.bind(this)
    this.onLogin = this.onLogin.bind(this)
    this.onRegister = this.onRegister.bind(this)
    this.setReferrer = this.setReferrer.bind(this)
  }
  async updateState(state: any){
    this.setState(state)
    console.log("logging state", this.state)
  }
  public componentDidMount() {
    let referrerAddress = window.location.href.split("referrer=")[1]
    this.setState({referrer:referrerAddress})
    if (this.web3Modal.cachedProvider) {
      this.onConnect();
    }
    
  }

  public onConnect = async () => {
  //  let value = document.getElementById("referrer").value

  //   if (!(/^(0x)?[0-9a-f]{40}$/i.test(value))) {
  //     // Check if it has the basic requirements of an address
  //     alert("Invalid Wallet Address");
  //     return
  // }
  let referrerAddress = window.location.href.split("referrer=")[1]
  let referrerAddressInput = this.state.referrer
 this.setState({referrer:referrerAddress || referrerAddressInput})
   
      const provider = await this.web3Modal.connect();

    await this.subscribeProvider(provider);

    const web3: any = initWeb3(provider);

    const accounts = await web3.eth.getAccounts();

    const address = accounts[0];

    const networkId = await web3.eth.net.getId();

    const chainId = await web3.eth.chainId();

    await this.setState({
      web3,
      provider,
      connected: true,
      address,
      chainId,
      networkId
    });
    let check = await this.checkId(address, this.state.referrer);
    if (check.data) {
      this.setState({ checked: true, register: false, connect: false });
    } else {
      this.setState({ checked: false, register: false, connect: true })
    }
    await this.updateState(this.state)
      await this.getAccountAssets();
      await this.urgentData.bind(this)
    
  };

  // on click login
  public onLogin = async () => {
    //  let value = document.getElementById("referrer").value
  
    //   if (!(/^(0x)?[0-9a-f]{40}$/i.test(value))) {
    //     // Check if it has the basic requirements of an address
    //     alert("Invalid Wallet Address");
    //     return
    // }
    let referrerAddress = window.location.href.split("referrer=")[1]
    let referrerAddressInput =  this.state.referrer
   this.setState({referrer:referrerAddress || referrerAddressInput})
      const provider = await this.web3Modal.connect();
  
      await this.subscribeProvider(provider);
  
      const web3: any = initWeb3(provider);
  
      const accounts = await web3.eth.getAccounts();
  
      const address = accounts[0];
  
      const networkId = await web3.eth.net.getId();
  
      const chainId = await web3.eth.chainId();
  
      await this.setState({
        web3,
        provider,
        connected: true,
        address,
        chainId,
        networkId
      });
      let check = await this.checkId(address, this.state.referrer);
      if (check.data) {
        this.setState({ checked: true, register: false, connect: false });
      } else {
        this.setState({ checked: false, register: true, connect: false });
        this.props.history.push("/Register")
      }
        // await this.registerId(address, this.state.referrer);
        await this.updateState(this.state)
        await this.getAccountAssets();
        await this.urgentData.bind(this)
      
    };
  
    public onRegister = async () => {
       let value = document.getElementById("referrer").value!
    
        if (!(/^(0x)?[0-9a-f]{40}$/i.test(value))) {
          alert("Invalid Wallet Address");

          // Check if it has the basic requirements of an address
          return
      }
      let referrerAddress = window.location.href.split("referrer=")[1]
      let referrerAddressInput = this.state.referrer
     this.setState({referrer:referrerAddress || referrerAddressInput})
       
          const provider = await this.web3Modal.connect();

        await this.subscribeProvider(provider);
    
        const web3: any = initWeb3(provider);
    
        const accounts = await web3.eth.getAccounts();
    
        const address = accounts[0];
    
        const networkId = await web3.eth.net.getId();
    
        const chainId = await web3.eth.chainId();
    
        await this.setState({
          web3,
          provider,
          connected: true,
          address,
          chainId,
          networkId
        });
        let check = await this.registerId(address, this.state.referrer, true);
        if (check) {
          this.setState({ checked: true, connect: false, register: false })
        } else {
          this.setState({ checked: false, connect: false, register: true })
    
        }
          await this.updateState(this.state)
          await this.getAccountAssets();
          await this.urgentData.bind(this)
          if(check)
          this.props.history.push("/Dashboard")
      };
    // to check the user
  public checkId = async (address: any, referrer:any) =>{
    console.log("called registerid")
    var data = {address, referrer}
    var url = process.env.BACKEND_URL || `${REACT_APP_BACKEND_URL}/user-check`
    console.log("dashboard.jsx/231", url)
    let response = await this.callGetapi('user-check', data)
    console.log("data", response)

    if(!response.data) this.props.history.push(`/Register?referrer=${this.state.referrer}`)
    console.log(response);
    //  let result = await response.json()
    return  response
   
  }

  // to register the user
  
  public registerId = async (address: any, referrer:any, require) =>{
    console.log("called registerid")
    var data = {address, referrer, require}
    var url = process.env.BACKEND_URL || `${REACT_APP_BACKEND_URL}/register`
    console.log("dashboard.jsx/231", url)
    let response = await this.callGetapi('register', data)

    //  let result = await response.json()
    return  response
   
  }
  public urgentData = async (web3:any, address:any) =>{
    let balance = await web3.eth.getBalance(address)/1000000000000000000
     this.setState({balance})
 }
  public callGetapi = async (url:any, data:any) =>{
    let response =
    //  await fetch(url, {
    //   method:"GET",  
    //   mode: 'no-cors',
    //   headers: {
    //   'Content-Type': 'application/json'
    //   // 'Content-Type': 'application/x-www-form-urlencoded',
    //   }    })
    await getAxios(url, data)
    return response 
  }
  public subscribeProvider = async (provider: any) => {
    if (!provider.on) {
      return;
    }
    provider.on("close", () => this.resetApp());
    provider.on("accountsChanged", async (accounts: string[]) => {
      await this.setState({ address: accounts[0] });
      await this.getAccountAssets();
    });
    provider.on("chainChanged", async (chainId: number) => {
      const { web3 } = this.state;
      const networkId = await web3.eth.net.getId();
      await this.setState({ chainId, networkId });
      await this.getAccountAssets();
    });

    provider.on("networkChanged", async (networkId: number) => {
      const { web3 } = this.state;
      const chainId = await web3.eth.chainId();
      await this.setState({ chainId, networkId });
      await this.getAccountAssets();
    });
  };

  public getNetwork = () => getChainData(this.state.chainId).network;

  public getProviderOptions = () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.REACT_APP_INFURA_ID
        }
      },
      torus: {
        package: Torus
      },
      fortmatic: {
        package: Fortmatic,
        options: {
          key: process.env.REACT_APP_FORTMATIC_KEY
        }
      },
      authereum: {
        package: Authereum
      },
      bitski: {
        package: Bitski,
        options: {
          clientId: process.env.REACT_APP_BITSKI_CLIENT_ID,
          callbackUrl: window.location.href + "bitski-callback.html"
        }
      }
    };
    return providerOptions;
  };

  public getAccountAssets = async () => {
    const { address, chainId } = this.state;
    this.setState({ fetching: true });
    try {
      // get account balances
     // const assets = await apiGetAccountAssets(address, chainId);
      const assets = ['DAI', 'TEST']
      console.log("getaccountassets", assets) 
      await this.setState({ fetching: false, assets });
    } catch (error) {
      console.error(error); // tslint:disable-line
      await this.setState({ fetching: false });
    }
  };

  public toggleModal = () =>
    this.setState({ showModal: !this.state.showModal });

  public testSendTransaction = async () => {
    const { web3, address, chainId } = this.state;

    if (!web3) {
      return;
    }

    const tx = await formatTestTransaction(address, chainId);

    try {
      // open modal
      this.toggleModal();

      // toggle pending request indicator
      this.setState({ pendingRequest: true });

      // @ts-ignore
      function sendTransaction(_tx: any) {
        return new Promise((resolve, reject) => {
          web3.eth
            .sendTransaction(_tx)
            .once("transactionHash", (txHash: string) => resolve(txHash))
            .catch((err: any) => reject(err));
        });
      }

      // send transaction
      const result = await sendTransaction(tx);

      // format displayed result
      // const formattedResult = {
      //   action: ETH_SEND_TRANSACTION,
      //   txHash: result,
      //   from: address,
      //   to: address,
      //   value: "0 ETH"
      // };

      // display result
      // this.setState({
      //   web3,
      //   pendingRequest: false,
      //   result: formattedResult || null
      // });
    } catch (error) {
      console.error(error); // tslint:disable-line
      this.setState({ web3, pendingRequest: false, result: null });
    }
  };

  public testSignMessage = async () => {
    const { web3, address } = this.state;

    if (!web3) {
      return;
    }

    // test message
    const message = "My email is john@doe.com - 1537836206101";

    // hash message
    const hash = hashPersonalMessage(message);

    try {
      // open modal
      this.toggleModal();

      // toggle pending request indicator
      this.setState({ pendingRequest: true });

      // send message
      const result = await web3.eth.sign(hash, address);

      // verify signature
      const signer = recoverPublicKey(result, hash);
      const verified = signer.toLowerCase() === address.toLowerCase();

      // format displayed result
      const formattedResult = {
        // action: ETH_SIGN,
        // address,
        signer,
        verified,
        result
      };

      // display result
      this.setState({
        web3,
        pendingRequest: false,
        result: formattedResult || null
      });
    } catch (error) {
      console.error(error); // tslint:disable-line
      this.setState({ web3, pendingRequest: false, result: null });
    }
  };

  public testSignPersonalMessage = async () => {
    const { web3, address } = this.state;

    if (!web3) {
      return;
    }

    // test message
    const message = "My email is john@doe.com - 1537836206101";

    // encode message (hex)
    const hexMsg = convertUtf8ToHex(message);

    try {
      // open modal
      this.toggleModal();

      // toggle pending request indicator
      this.setState({ pendingRequest: true });

      // send message
      const result = await web3.eth.personal.sign(hexMsg, address);

      // verify signature
      const signer = recoverPersonalSignature(result, message);
      const verified = signer.toLowerCase() === address.toLowerCase();

      // format displayed result
      const formattedResult = {
        // action: PERSONAL_SIGN,
        address,
        signer,
        verified,
        result
      };

      // display result
      this.setState({
        web3,
        pendingRequest: false,
        result: formattedResult || null
      });
    } catch (error) {
      console.error(error); // tslint:disable-line
      this.setState({ web3, pendingRequest: false, result: null });
    }
  };

  public getBpnBalance = async ()=>{
    let {address, chainId, web3} = this.state;
    const result = await getBalance(address, chainId, web3,[address]);
      console.log("BPN balance in app.tsx", result)
  }

  public resetApp = async () => {
    const { web3 } = this.state;
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }
    await this.web3Modal.clearCachedProvider();
    this.setState({ ...INITIAL_STATE });
    this.props.history.push("/")
  };
  setReferrer(event :any){
    console.log("event in set referrere", event.target.value)
    this.setState({referrer: event.target.value})

    if (/^(0x)?[0-9a-f]{40}$/i.test(event.target.value)) {
      // Check if it has the basic requirements of an address
      this.setState({referrerVerified:true})
      return false;
  }
  }

  // on click register in login page
  onBannerClick(){
    console.log("banner clicked")
    this.props.history.push(`/Register?referrer=${this.state.referrer}`)
    this.setState({ checked: false, register: true, connect: false });
  }
  public render = () => {
    const {
      assets,
      address,
      connected,
      checked,
      register,
      connect,
      chainId,
      fetching,
      showModal,
      pendingRequest,
      result, 
      web3, referrerError, referrer
    } = this.state;
    return (
      <div>
        <div className="headertop">
          <Header
            connected={connected}
            address={address}
            chainId={chainId}
            killSession={this.resetApp}
            checked={checked}
          />
        </div>
        {fetching && checked ? (
          <Column maxWidth={1000} spanHeight>
            <SContent>
              <Column center>
                <SContainer>
                  <Loader />
                </SContainer>
              </Column>
            </SContent>
          </Column>
        ) : !!assets && !!assets.length && checked ? (
          // <SBalances>
          //   <h3>Actions</h3>
          //   <Column center>
          //     <STestButtonContainer>
          //       <STestButton left onClick={this.testSendTransaction}>
          //         {ETH_SEND_TRANSACTION}
          //       </STestButton>

          //       <STestButton left onClick={this.testSignMessage}>
          //         {ETH_SIGN}
          //       </STestButton>

          //       <STestButton left onClick={this.testSignPersonalMessage}>
          //         {PERSONAL_SIGN}
          //       </STestButton>
          //       <STestButton
          //         left
          //         onClick={() => this.getBalance(DAI_BALANCE_OF)}
          //       >
          //         {DAI_BALANCE_OF}
          //       </STestButton>

          //       <STestButton
          //         left
          //         onClick={() => this.getBalance(DAI_TRANSFER)}
          //       >
          //         {DAI_TRANSFER}
          //       </STestButton>

          //       <STestButton left onClick={this.testOpenBox}>
          //         {BOX_GET_PROFILE}
          //       </STestButton>
          //     </STestButtonContainer>
          //   </Column>
          //   <h3>Balances</h3>
          //   <AccountAssets chainId={chainId} assets={assets} />{" "}
          // </SBalances>
          <Switch>
            <Route exact path="/">
              <div>
               <Dashboard chainId={chainId} web3={web3} address={address} updateState={this.updateState} />
              </div>
            </Route>

            <Route exact path="/Wallet">
              <Wallet web3={web3} chainId={chainId} address={address}/>
            </Route>
            {/* <Route exact path="/Buypackages">

              <Buypackages />
            </Route> */}
            <Route exact path="/Dashboard">
              <Dashboard chainId={chainId} address={address} web3={web3} />
            </Route>
              <Route exact path="/Profile">
              <Profile address={address}/>

            </Route>


            <Route exact path="/Referral">
              <Referral address={address} />
            </Route>

            <Route exact path="/Withdraw">
              <Withdraw address={address} web3={web3}/>
            </Route>

            {/* <Route exact path="/LevelIncome">
              <LevelIncome address={address} web3={web3} chainId={chainId} />
            </Route> */}

            <Route exact path="/Income_details">
              <Income_details address={address} web3={web3} chainId={chainId} />
            </Route>


            
            <Route exact path="/Stakes">
              <Stakes />
            </Route>
            
            <Route exact path="/Topup">
            <TopUp address={address} web3={web3}/>

            </Route>
            
           <Route exact path="/TotalIncome">
            <TotalIncome />
            </Route>

            {/* <Route exact path="/LevelIncome">
            <LevelIncome />
            </Route> */}

            <Route exact path="/Reward">
              <Reward />
            </Route>

            <Route exact path="/RegisterByReferral">
              <Register onRegistered={this.onRegister} setReferrer={this.setReferrer}/>
            </Route>
          </Switch>) : connect ? (
            <div>
            
          <SLanding center>
            <img className="w_100" src="./assets/logo.png" />
            <h3 className="font_20">{`Login with MetaMask`}</h3>
            {/* {<input placeholder="Enter your Referrer's Wallet" onChange={(event) => this.setReferrer(event)} value={this.state.referrer} className="text-white w-75 py-2 form-control" id="referrer" />} */}
            <ConnectButton onClick={this.onLogin} />
            {/* <RegisterButton onClick= {this.onBannerClick} /> */}
          </SLanding>
          </div>
        ) : register&& (
          <Switch>
              <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/Login">
              <Login onClickLogin={this.onLogin} onClickRegister={this.onBannerClick}/>
            </Route>
            <Route exact path="/Register">
              <Register onRegistered={this.onRegister} setReferrer={this.setReferrer}/>
            </Route>
            </Switch>
        )}
        <Modal show={showModal} toggleModal={this.toggleModal}>
          {pendingRequest ? (
            <SModalContainer>
              <SModalTitle>{"Pending Call Request"}</SModalTitle>
              <SContainer>
                <Loader />
                <SModalParagraph>
                  {"Approve or reject request using your wallet"}
                </SModalParagraph>
              </SContainer>
            </SModalContainer>
          ) : result ? (
            <SModalContainer>
              <SModalTitle>{"Call Request Approved"}</SModalTitle>
              <ModalResult>{result}</ModalResult>
            </SModalContainer>
          ) : (
            <SModalContainer>
              <SModalTitle>{"Call Request Rejected"}</SModalTitle>
            </SModalContainer>
          )}
        </Modal>
      </div>
    );
  };
}

export default withRouter(App);
