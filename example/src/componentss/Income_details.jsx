import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import {getAxios, apiGetLevelIncome } from '../helpers/api';
import axios from 'axios';

class Income_details extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            incomes: [{ userid: 0, fromLevel: 0, initiatedByAddress: 0, amount: 0, date: 0 }],
            Income_detailsData: '',
            selectedOption : '1'
        }
        this.changeOption = this.changeOption.bind(this)
    }
    async componentDidMount() {
       await this.getLevelIncome();
    }

    async getLevelIncome() {
        let { address } = this.props
        let Income_details = await apiGetLevelIncome(address, this.state.selectedOption)
        console.log(Income_details, address);
        this.setState({ Income_detailsData: Income_details });

        // let requestOptions = {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json'
        //   };
        //   await axios.get("https://backend.bpntoken.com" + `/filter-income-detail?address=0x7095d50ea6210655381551ba1033f8077bd42528&&type=1`, { headers: requestOptions })
        //     .then(response => {
        //         this.setState({levelIncomeData: response.data});
        //         console.log(response)
        //     })
        //     .catch(err => console.log(err));

    }

    async changeOption(event){
        await this.setState({selectedOption : event.target.value}, ()=> console.log(this.state.selectedOption))
        await this.getLevelIncome();
    }
    render() {
        return <>
            <div id="layoutSidenav">
                <Sidebar />
                <div id="layoutSidenav_content">
                    <div id="page-content-wrapper">
                        <div className="container-fluid px-4">
                            <div className="row mt-3 mb-4">
                                <div className="row">
                                    <div className="col-12 bg-infos">
                                    <div className="row">
                                        <div className="col-lg-6 col-12 col-md-6 text-left"> 
                                        <h6>Select income type</h6>
                                        </div>

                                        <div className="col-lg-6 col-12 col-md-6"> 
                                        <div class="form-group py-0 w-100">
                                           
                                            <select class="text-end Select-box" id="type" value={this.state.selectedOption} onChange={this.changeOption} >
                                                <option value="1">Direct Income</option>
                                                <option value="2">Level Income</option>
                                                <option value="3">Leadership Bonus</option>
                                                <option value="5">Royality Bonus</option>
                                                {/* <option value="6">Roi</option> */}
                                            </select>
                                        </div>
                                        </div>
                                        
                                    </div>
                                    </div>
                                    
                                </div>

                                <div className="col-lg-12">
                                    <div className="card mt-4 h-100">
                                        <div className="card-header">
                                            <i className="fas fa-users me-1"></i>
                                            Income Details
                                        </div>
                                        <div className="card-body_2">
                                            <div className="table-responsive">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>Sr.No</th>

                                                            <th>From Level</th>
                                                            <th>Amount </th>
                                                            <th>Inititated By</th>

                                                            <th>Date</th>
                                                        </tr>
                                                    </thead>
                                                    { <tbody>
                                                        {this.state.Income_detailsData ? this.state.Income_detailsData.map((item, index) => <tr>
                                                     <td>{index+1}</td>
                                                     <td>{item.fromLevel    }</td>
                                                     <td>{item.amount}</td>
                                                     <td>{item.initiatedByAddress}</td>
                                                    
                                                     <td>{item.date}</td>
                                                 </tr> ) : "" }
                                                    </tbody> }
                                                </table>
                                            </div>
                                        </div>
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
export default Income_details;