import React, { Component } from 'react';
import {Label} from 'react-bootstrap';
// import Editable from '../libs/js/Editable';
import Editable from '../libs/js/Editable';
import CustomComponent from './CustomComponent';
import './styles/plugin.css';
import './styles/demo.css';
import '../libs/css/editable.css';

export default class App extends Component {
    render(){
      return(
        <div className="demo">
            <h1>React X-editable Demo</h1>
            <hr/>
            <h2>Example</h2>
            <b>Popup Mode: </b>(click to edit)
            <table id="user" className="table table-bordered table-striped">
                <tbody>
                    <tr>
                        <td width="35%">Simple text field</td>
                        <td width="65%">
                            <Editable
                              name="username"
                              dataType="text"
                              mode="popup"
                              title="Please enter username"
                              placement="right"
                              showButtons={true}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Empty text field, required</td>
                        <td>
                          <Editable
                            name="username"
                            dataType="text"
                            mode={"popup"}
                            title="Enter username"
                            placement="right"
                            showButtons={true}
                            validate={(value) => {
                              if(!value){
                                return 'Required';
                              }
                            }}
                          />
                        </td>
                    </tr>
                    <tr>
                        <td>Simple textarea</td>
                        <td>
                          <Editable
                              name="description"
                              dataType="textarea"
                              mode={"popup"}
                              title="Enter description"
                              placement="right"
                              showButtons={true}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Simple select with custumizable display</td>
                        <td>
                          <Editable

                            dataType="select"
                            name={"city"}
                            mode={"popup"}
                            value={2}
                            title="Please select city"
                            placement="right"
                            showButtons={true}
                            options={[
                              {value : 1, text: "Mumbai"},
                              {value : 2, text: "Pune"},
                              {value : 3, text: "Nashik"}
                            ]}
                            display={function(value){
                              return (<span><Label bsStyle="default">City:</Label><span>&nbsp;{value}</span></span>);
                            }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Simple checkbox list</td>
                        <td>
                          <Editable
                            name="check"
                            dataType="checklist"
                            title="Please select city"
                            mode={"popup"}
                            optionsInline={false}
                            value={["Nashik","Mumbai"]}
                            options={[
                              {value : 1, text: "Mumbai"},
                              {value : 2, text: "Pune"},
                              {value : 3, text: "Nashik"}
                            ]}
                          />
                        </td>
                    </tr>
                    <tr>
                        <td width="35%">Custom component</td>
                        <td width="65%">
                          <Editable
                            name="address"
                            dataType="custom"
                            mode="popup"
                            title="Please enter address"
                            customComponent={(props, state) =>{
                              return( <CustomComponent {...props} {...state}/> );
                            }}
                          />
                        </td>
                    </tr>
                    <tr>
                        <td width="35%">Simple text field with disable</td>
                        <td width="65%">
                            <Editable
                              name="username"
                              dataType="text"
                              mode={"inline"}
                              title="Enter username"
                              placement="right"
                              value="ni3galave"
                              showButtons={true}
                              disabled={true}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <b>Inline mode: </b>
            <table id="user" className="table table-bordered table-striped">
                <tbody>
                    <tr>
                        <td width="35%">Simple text field</td>
                        <td width="65%">
                            <Editable
                              name="username"
                              dataType="text"
                              mode={"inline"}
                              title="Enter username"
                              value="ni3galave"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Empty text field, required with no buttons</td>
                        <td>
                          <Editable
                            name="username"
                            dataType="text"
                            title="Enter username"
                            showButtons={false}
                            validate={(value) => {
                              if(!value){
                                return 'Required';
                              }
                            }}
                          />
                        </td>
                    </tr>
                    <tr>
                        <td>Simple textarea</td>
                        <td>
                          <Editable
                              name="description"
                              dataType="textarea"
                              value="X editable using react bootstrap"
                              title="Enter description"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Simple select with custumizable display</td>
                        <td>
                          <Editable
                            dataType="select"
                            name={"city"}
                            value={1}
                            title="Please select city"
                            options={[
                              {value : 1, text: "Mumbai"},
                              {value : 2, text: "Pune"},
                              {value : 3, text: "Nashik"}
                            ]}
                            display={function(value){
                              return (<span>City: <b>{value}</b></span>);
                            }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td width="35%">Custom component</td>
                        <td width="65%">
                          <Editable
                            name="address"
                            dataType="custom"
                            mode="inline"
                            title="Please enter address"
                            customComponent={(props, state) =>{
                              return( <CustomComponent {...props} {...state}/> );
                            }}
                          />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      )
    }
}
