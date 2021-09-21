import React from 'react'
import Sidebar from './Sidebar';
import Header from './Header';

import { getAxios, getRefferal } from '../helpers/api';
class Referral extends React.Component {
    copyCodeToClipboard = () => {
        const el = this.textArea
        el.select()
        document.execCommand("copy")
    }
    constructor(props) {
        super(props);
        let link = `https://wallet.tblcexchange.com/Register?referrer=${this.props.address}`
        console.log("referral link", link)
        this.state = {
            info: {
                downlineCount: 0,
                downlines: [],
                link: link
            },
            userData:{}
        }


    }
    async componentDidMount() {
        let { address } = this.props
      //  address = '0xfb87121973e384B0dfe4FB6F55F345D35275FDa0'
        let data = await getAxios(`direct-downline`, { address })
        console.log("direct-downline", data)

        if (data.statusText == "OK") {
            console.log("direct-downline 2", data.data.downlines)
            this.setState({  downlines: data.data.downlines  })
        }
        let refer = await getRefferal(address);
        console.log(refer);
        this.setState({userData: refer[0]});  

    }

    render() {
        let { downlines } = this.state.downlines || []
        console.log(this.state)
        return <>
            <div id="layoutSidenav">

                <Sidebar />

                <div id="layoutSidenav_content">
                    <div id="page-content-wrapper">
                        <div className="container-fluid px-4">
                         <div className="row">
                           
                                    <div className="col-xl-12 mt-4">
                                        <div className="card mb-4">
                                            <div className="card-header">
                                                <i className="fas fa-share me-1"></i>
                                                Referral link
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-9">
                                                        <div>
                                                            <input className="form-controls" ref={(textarea) => this.textArea = textarea} value={this.state.info.link} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <button className="btn  btn-info btn-info2 w-100" onClick={() => this.copyCodeToClipboard()}>
                                                            Copy Link
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
                                        Referral History

                                    </div>
                                    <div className="card-body table-responsive">
                                        <table className="table table-striped ">
                                            <thead>
                                                <tr>
                                                    {/* <th>ID</th> */}
                                                    <th>User Address</th>
                                                    <th>Package</th>
                                                    <th>Status</th>
                                                    <th>Directs</th>
                                                    <th>Total Earning Till date</th>
                                                    <th>Level Income</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {/* {downlines.map((d, i, a) => {
                                                    <tr>
                                                        <td>{ }</td>
                                                    </tr>
                                                })
                                                } */}
                                                {this.state.downlines ?  this.state.downlines.map(( downline, i)=>{
                                                    console.log(downline)
                                                    return (<tr>
                                                    <td>{downline.userAddress}</td>
                                                    <td>{downline.package}</td>
                                                    <td> <span className="badge badge-danger">{downline.status}</span></td>
                                                    <td>{downline.directDownline}</td>
                                                    <td>{downline.totalEarning}</td>
                                                    <td>{downline.levelIncome}</td>
                                                </tr> )
                                                }): ""}

                                                 </tbody>
                                        </table>
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
