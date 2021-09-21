import React from 'react'
import Sidebar from './Sidebar';
import Header from './Header';
import {getAxios} from '../helpers/api'

class Referral extends React.Component {
    copyCodeToClipboard = () => {
        const el = this.textArea
        el.select()
        document.execCommand("copy")
    }
    constructor(props) {
        super(props);
        let link = `http://bugg.finance/?referrer=${this.props.address}`
        console.log("referral link", link)
       this.state = {
           info:{
                downlineCount:0,
               downlines:[],
               link:link
           }
       }


    } 
    async componentDidMount() {
        let {address} = this.props
        let data = await getAxios(`direct-downline`, {address})
        if (data.status=="ok"){

            this.setState({info:{downlines:data.downlines}})
            console.log("referral", this.state)
        }
       
       }
    
    render() {
        let  {downlines} = this.state.info
        return <>
     <div id="layoutSidenav">

                <Sidebar />

                <div id="layoutSidenav_content">
                    <div id="page-content-wrapper">
                        <div className="container-fluid px-4">
                            <div className="row mt-3 mb-4">
                                <h6>Referral</h6>
                    
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card mb-4">
                                <div className="card-header">
                                    <i className="fas fa-share me-1"></i>
                                    Referral link
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-9">
                                            <div>
                                                <input className="form-control" ref={(textarea) => this.textArea = textarea} value={this.state.info.link} />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <button className="btn  btn-info btn-info2 w-100" onClick={() => this.copyCodeToClipboard()}>
                                                Copy to Link
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-table me-1"></i>
                            DataTable
                        </div>
                        <div className="card-body">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>User Address</th>
                                        <th>Package</th> 
                                        <th>Status</th>
                                        <th>Directs</th>
                                        <th>Business Value</th>
                                        <th>Income Taken</th>
                                    </tr>
                                </thead>

                                <tbody>
                                   { downlines.map((d,i,a)=>{
                                         <tr>
                                         <td>{}</td>
                                        
                                     </tr>
                                   })
                                  
                                } </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                

        </>

    }

}


    export default Referral
