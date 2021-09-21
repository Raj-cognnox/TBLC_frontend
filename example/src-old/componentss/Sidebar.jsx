import React from 'react';
import { Link } from "react-router-dom";
import Header from './Header';
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.UserName = { props: "Admin" };
    this.userID = { props: "DF1323" };
    this.Userimg = { props: "https://image.flaticon.com/icons/png/512/149/149071.png" };
    this.Logo = { props: "" };
    this.state={
      
    }
    this.activeToggle = this.activeToggle.bind(this)
  }
  sidebarToggle(){
    document.body.classList.toggle('sb-sidenav-toggled');
     
  }
  componentDidUpdate(){
    // document.getElementById(this.state.activeMenuId).classList.add("active")
    // console.log(this.context)

  }
  activeToggle(event){
    console.log(event.target.id)
  // document.getElementById(this.state.activeMenuId).classList.remove("active")
   this.setState({activeMenuId:event.target.id})
  // document.getElementById(this.state.activeMenuId).classList.add("active")
  console.log(this.state.activeMenuId)
  }
  render() {
    return <>

      <div className="sidebaer" id="layoutSidenav_nav">
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-topnav00 text-end">
            <button className="btn btn-link_2 btn-sm" onClick={this.sidebarToggle} id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>
            </div>
               
              <br />

              <Link id="dashboard"  onClick={this.activeToggle} className={this.state.activeMenuId=="dashboard" ? "nav-link active":"nav-link"} to="/Dashboard">
                <div className="sb-nav-link-icon"><i className="fas fa-chalkboard-teacher"></i></div>
                Dashboard
              </Link>

              <Link id="profile"   onClick={this.activeToggle}  className={this.state.activeMenuId=="profile" ? "nav-link active":"nav-link"} to="/profile">
                <div className="sb-nav-link-icon"><i className="far fa-user-circle"></i></div>
                Profile
              </Link>

              <Link id="wallet"    onClick={this.activeToggle}  className={this.state.activeMenuId=="wallet" ? "nav-link active":"nav-link"} to="/wallet">
                <div className="sb-nav-link-icon"><i className="fas fa-wallet"></i></div>
                Wallet
              </Link>
            
              <Link id="referral"  onClick={this.activeToggle}  className={this.state.activeMenuId=="referral" ? "nav-link active":"nav-link"} to="/Referral">
                <div className="sb-nav-link-icon"><i className="fas fa-share-alt-square"></i></div>
                Referral
              </Link>
              <Link id="topup" onClick={this.activeToggle}  className={this.state.activeMenuId=="topup" ? "nav-link active":"nav-link"} to="/TopUp">
                <div className="sb-nav-link-icon"><i className="fas fa-user-edit"></i></div>
                TopUp
              </Link>
              <Link id="withdraw" onClick={this.activeToggle}  className={this.state.activeMenuId=="withdraw" ? "nav-link active":"nav-link"} to="/Withdraw">
                <div className="sb-nav-link-icon"><i className="fas fa-hand-holding-usd"></i></div>
                Withdrawls
              </Link>

              <Link id="levelIncome" onClick={this.activeToggle}  className={this.state.activeMenuId=="levelIncome" ? "nav-link active":"nav-link"} to="/LevelIncome">
                <div className="sb-nav-link-icon"><i className="fas fa-network-wired"></i></div>
                Level Income 
              </Link>

              {/* <Link onClick={this.activeToggle}  className={this.state.activeMenuId=="dashboard" ? "nav-link active":"nav-link"} to="/LevelIncome">
                <div className="sb-nav-link-icon"><i className="fas fa-wallet"></i>
                  Level Income 
                </div>
              </Link> */}
              {/* <Link onClick={this.activeToggle}  className={this.state.activeMenuId=="dashboard" ? "nav-link active":"nav-link"} to="#">
                <div className="sb-nav-link-icon"><i className="fas fa-wallet"></i></div>
                Withdraw Now
              </Link> */}
              {/* <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                Income Detils
                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
              </a>
              <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                <nav className="sb-sidenav-menu-nested nav">

                 <Link onClick={this.activeToggle} className="nav-link" to="/TotalIncome"> Total Income </Link>
                 <Link className="nav-link" to="/TotalIncome"> Total Income </Link>
                 <Link  className="nav-link" to="/LevelIncome">Level  Income</Link>
                 <Link  className="nav-link" to="/DirectIncome">Direct Income </Link>
            
                </nav>
              </div> */}

              {/* <Link className="nav-link" to="/Stakes">
                <div className="sb-nav-link-icon"><i className="fas fa-chart-bar"></i></div>
                Get started
              </Link> */}
{/* 
              <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                Get started
                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
              </a>
              <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                <nav className="sb-sidenav-menu-nested nav">

                  <Link className="nav-link" to="/Baypackages"> Bay  </Link>
                  <Link className="nav-link" to="/TotalIncome"> Refer </Link>
                  <Link className="nav-link" to="/TotalIncome"> Top-up </Link>
                  <Link className="nav-link" to="/LevelIncome">Withdraw  </Link>
                  <Link className="nav-link" to="/DirectIncome">Level Income Details </Link>

                </nav>
              </div> */}

              {/* <Link className="nav-link" to="/Tree">
                <div className="sb-nav-link-icon"><i className="fas fa-user"></i></div>
                Tree
              </Link> */}


              {/* <Link className="nav-link" to="/Reward">
                <div className="sb-nav-link-icon"><i className="fas fa-user"></i></div>
                Reward
              </Link> */}


              {/* <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                Rank
              </a> */}



            </div>
          </div>

        </nav>


      </div>


    </>
  }

}
export default Sidebar;