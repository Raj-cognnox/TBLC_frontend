import React from 'react'
import App from "./App";
import './App.css';
import Dashboard from "./componentss/Dashboard"
import Wallet from "./componentss/Wallet"
import Profile from './componentss/Profile';
import TotalIncome from './componentss/TotalIncome';
import LevelIncome from './componentss/LevelIncome';
import DirectIncome from './componentss/DirectIncome';
import Withdraw from './componentss/Withdraw';
import Buypackages from './componentss/Buypackages';
import Referral from './componentss/Referral';
import Reward from './componentss/Reward';


import {Switch, Link, Route} from 'react-router-dom'
class Front extends React.Component< any, any>{
    constructor (props:any)
    {
        super(props)
        this.state={
        }
        this.updateState = this.updateState.bind(this)
    }
    async updateState(state: any){
        this.setState(state)
        console.log("logging state", this.state)
    }
    public render = () => {
        let {web3} = this.state
            return(
                <Switch>
                    <Route exact path="/">
                        <div>
                            <App updateState={this.updateState}/>
                        </div>
                    </Route>
                    <Route exact path="/wallet">
                        <Wallet/>
                    </Route>

                    <Route exact path="/Dashboard">
                        <Dashboard address={"assdf"} web3={web3} />
                    </Route>

                    <Route exact path="/Profile">
                    <Profile/>
                   
                    </Route>
                    <Route exact path="/Buypackages">
                            <Buypackages />
                    </Route>
                    <Route exact path="/Referral">
                            <Referral />
                    </Route>
                    <Route exact path="/Withdraw">
                            <Withdraw />
                    </Route>
                    

                    <Route exact path="/TotalIncome">
                     <TotalIncome />
                    </Route>

                    
                    <Route exact path="/LevelIncome">
                      <LevelIncome />
                    </Route>

                    <Route exact path="/DirectIncome">
                        <DirectIncome />
                    </Route>

                    <Route exact path="/Reward">
                        <Reward />
                    </Route>


                </Switch>
            )
    }
}
export default Front