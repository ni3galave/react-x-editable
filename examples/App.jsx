import React, { Component } from 'react';
import {Label, Panel, Button} from 'react-bootstrap';
import Editable from '../libs/js/Editable';
import CustomComponent from './CustomComponent';
import './styles/plugin.css';
import './styles/demo.css';
import '../libs/css/editable.css';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      simpleTextField : false,
      emptyRequiredTextField : false,
      simpleTexareatField : false,
      simpleSelectCustomDisp : false,
      simpleCheckboxlist : false,
      customComponent : false,
      simpleTextWithDisabled : false,
      simpleTextFieldInline : false,
      emptyRequiredTextFieldInline : false,
      simpleTexareatFieldInline : false,
      simpleSelectCustomDispInline : false,
      simpleCheckboxlistInline : false,
      customComponentInline : false,
      showAll : false
    }
  }
  render(){
    return(
      <div className="demo">
          <h1>React X-editable Demo</h1>
          <hr/>
          <h2>Examples</h2>
          <b>Popup Mode: </b>(click to edit)
          <table id="user" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Type</th>
                <th>Example</th>
                <th>
                  <Button bsStyle="link" bsSize="xsmall" onClick={ ()=> {
                    const { showAll } = this.state;
                    this.setState({
                      simpleTextField : !showAll,
                      emptyRequiredTextField : !showAll,
                      simpleTexareatField : !showAll,
                      simpleSelectCustomDisp : !showAll,
                      simpleCheckboxlist : !showAll,
                      customComponent : !showAll,
                      simpleTextWithDisabled : !showAll,
                      simpleTextFieldInline : !showAll,
                      emptyRequiredTextFieldInline : !showAll,
                      simpleTexareatFieldInline : !showAll,
                      simpleSelectCustomDispInline : !showAll,
                      simpleCheckboxlistInline : !showAll,
                      customComponentInline : !showAll,
                      showAll : !showAll,
                    })
                  }
                  }>
                    <i className="fa fa-code" title="show/hide all"></i>
                  </Button>
                </th>
              </tr>
           </thead>
              <tbody>
                  <tr>
                      <td width="35%">Simple text field</td>
                      <td width="65%">
                        <Editable
                            name="username"
                            dataType="text"
                            mode="popup"
                            title="Please enter username"
                            value={"ni3galave"}
                            placement="right"
                            showButtons={true}
                          />
                        <Panel collapsible expanded={this.state.simpleTextField} >
                          <pre> {`<Editable
    name="username"
    dataType="text"
    mode="popup"
    title="Please enter username"
    value={"ni3galave"}
    placement="right"
    showButtons={true}
  />`}</pre>

                        </Panel>
                      </td>
                      <td width="65%">
                         <Button bsStyle="link" bsSize="xsmall" onClick={ ()=> this.setState({ simpleTextField: !this.state.simpleTextField })}>
                           <i className="fa fa-code" title="show/hide code"></i>
                         </Button>
                      </td>

                  </tr>
                  <tr>
                      <td>Empty text field, required</td>
                      <td>
                        <Editable
                          name="usernameRequired"
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
                      <Panel collapsible expanded={this.state.emptyRequiredTextField} >
                          <pre> {`<Editable
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
/>`}</pre>

                        </Panel>
                      </td>
                      <td width="65%">
                         <Button bsStyle="link" bsSize="xsmall" onClick={ ()=> this.setState({ emptyRequiredTextField: !this.state.emptyRequiredTextField })}>
                           <i className="fa fa-code" title="show/hide code"></i>
                         </Button>
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
                        <Panel collapsible expanded={this.state.simpleTexareatField} >
                              <pre> {`<Editable
    name="description"
    dataType="textarea"
    mode={"popup"}
    title="Enter description"
    placement="right"
    showButtons={true}
/>`}</pre>

                            </Panel>
                          </td>
                          <td width="65%">
                             <Button bsStyle="link"  bsSize="xsmall" onClick={ ()=> this.setState({ simpleTexareatField: !this.state.simpleTexareatField })}>
                               <i className="fa fa-code" title="show/hide code"></i>
                             </Button>
                          </td>
                  </tr>
                  <tr>
                      <td>Simple select with customizable display</td>
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
                        <Panel collapsible expanded={this.state.simpleSelectCustomDisp} >
                                <pre> {`<Editable
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
/>`}</pre>

                              </Panel>
                            </td>
                            <td width="65%">
                               <Button bsStyle="link" bsSize="xsmall" onClick={ ()=> this.setState({ simpleSelectCustomDisp: !this.state.simpleSelectCustomDisp })}>
                                 <i className="fa fa-code" title="show/hide code"></i>
                               </Button>
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
                      <Panel collapsible expanded={this.state.simpleCheckboxlist} >
                                <pre> {`<Editable
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
/>`}</pre>

                              </Panel>
                            </td>
                            <td width="65%">
                               <Button bsStyle="link" bsSize="xsmall" onClick={ ()=> this.setState({ simpleCheckboxlist: !this.state.simpleCheckboxlist })}>
                                 <i className="fa fa-code" title="show/hide code"></i>
                               </Button>
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
                      <Panel collapsible expanded={this.state.customComponent} >
                                  <pre> {`<Editable
    name="address"
    dataType="custom"
    mode="popup"
    title="Please enter address"
    customComponent={(props, state) =>{
      return( <CustomComponent {...props} {...state}/> );
    }}
/>`}</pre>

                                </Panel>
                              </td>
                              <td width="65%">
                                 <Button bsStyle="link" bsSize="xsmall" onClick={ ()=> this.setState({ customComponent: !this.state.customComponent })}>
                                   <i className="fa fa-code" title="show/hide code"></i>
                                 </Button>
                              </td>
                  </tr>
                  <tr>
                      <td width="35%">Simple text field with disable</td>
                      <td width="65%">
                          <Editable
                            name="usernameaa"
                            dataType="text"
                            mode={"popup"}
                            value="ni3galave"
                            disabled={true}
                          />
                        <Panel collapsible expanded={this.state.simpleTextWithDisabled} >
                                      <pre> {`<Editable
    name="username"
    dataType="text"
    mode={"inline"}
    value="ni3galave"
    disabled={true}
/>`}</pre>

                                    </Panel>
                                  </td>
                                  <td width="65%">
                                     <Button bsStyle="link" bsSize="xsmall" onClick={ ()=> this.setState({ simpleTextWithDisabled: !this.state.simpleTextWithDisabled })}>
                                       <i className="fa fa-code" title="show/hide code"></i>
                                     </Button>

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
                            name="usernameDD"
                            dataType="text"
                            mode={"inline"}
                            title="Enter username"
                            value="ni3galave"
                          />
                        <Panel collapsible expanded={this.state.simpleTextFieldInline} >
                                        <pre> {`<Editable
    name="username"
    dataType="text"
    mode={"inline"}
    title="Enter username"
    value="ni3galave"
/>`}</pre>

                                      </Panel>
                                    </td>
                          <td width="65%">
                             <Button bsStyle="link" bsSize="xsmall" onClick={ ()=> this.setState({ simpleTextFieldInline: !this.state.simpleTextFieldInline })}>
                               <i className="fa fa-code" title="show/hide code"></i>
                             </Button>
                          </td>
                  </tr>
                  <tr>
                      <td>Empty text field, required with no buttons</td>
                      <td>
                        <Editable
                          name="usernameInline"
                          dataType="text"
                          title="Enter username"
                          showButtons={false}
                          validate={(value) => {
                            if(!value){
                              return 'Required';
                            }
                          }}
                        />
                      <Panel collapsible expanded={this.state.emptyRequiredTextFieldInline} >
                                        <pre> {`<Editable
    name="username"
    dataType="text"
    title="Enter username"
    showButtons={false}
    validate={(value) => {
      if(!value){
        return 'Required';
      }
    }}
/>`}</pre>

                                      </Panel>
                                    </td>
                          <td width="65%">
                             <Button bsStyle="link" bsSize="xsmall" onClick={ ()=> this.setState({ emptyRequiredTextFieldInline: !this.state.emptyRequiredTextFieldInline })}>
                               <i className="fa fa-code" title="show/hide code"></i>
                             </Button>
                          </td>
                  </tr>
                  <tr>
                      <td>Simple textarea</td>
                      <td>
                        <Editable
                            name="descriptioInlinen"
                            dataType="textarea"
                            value="X editable using react bootstrap"
                            title="Enter description"
                          />
                        <Panel collapsible expanded={this.state.simpleTexareatFieldInline} >
                                            <pre> {`<Editable
    name="description"
    dataType="textarea"
    value="X editable using react bootstrap"
    title="Enter description"
/>`}</pre>

                                          </Panel>
                                        </td>
                            <td width="65%">
                               <Button bsStyle="link" bsSize="xsmall" onClick={ ()=> this.setState({ simpleTexareatFieldInline: !this.state.simpleTexareatFieldInline })}>
                                 <i className="fa fa-code" title="show/hide code"></i>
                               </Button>
                            </td>
                  </tr>
                  <tr>
                      <td>Simple select with customizable display</td>
                      <td>
                        <Editable
                          dataType="select"
                          name={"cityInline"}
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
                        <Panel collapsible expanded={this.state.simpleSelectCustomDispInline} >
                                              <pre> {`<Editable
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
/>`}</pre>

                            </Panel>
                          </td>
                          <td width="65%">
                             <Button bsStyle="link" bsSize="xsmall" onClick={ ()=> this.setState({ simpleSelectCustomDispInline: !this.state.simpleSelectCustomDispInline })}>
                               <i className="fa fa-code" title="show/hide code"></i>
                             </Button>
                          </td>
                  </tr>
                  <tr>
                      <td width="35%">Custom component</td>
                      <td width="65%">
                        <Editable
                          name="addressInline"
                          dataType="custom"
                          mode="inline"
                          title="Please enter address"
                          value={{city:'Mumbai',street:'LBS road',building: '202/12 Budha vihar'}}
                          customComponent={(props, state) =>{
                            return( <CustomComponent {...props} {...state}/> );
                          }}
                          display={function(value){
                            return (<span><b>{value.city}</b>, {value.street}, {value.building}</span>);
                          }}
                        />
                      <Panel collapsible expanded={this.state.customComponentInline} >
                                              <pre> {`<Editable
    name="address"
    dataType="custom"
    mode="inline"
    title="Please enter address"
    value={{city:'Mumbai',street:'LBS road',building: '202/12 Budha vihar'}}
    customComponent={(props, state) =>{
      return( <CustomComponent {...props} {...state}/> );
    }}
    display={function(value){
      return (<span><b>{value.city}</b>, {value.street}, {value.building}</span>);
    }}
/>`}</pre>

                          </Panel>
                        </td>
                        <td width="65%">
                          <Button bsStyle="link" bsSize="xsmall" onClick={ ()=> this.setState({ customComponentInline: !this.state.customComponentInline })}>
                             <i className="fa fa-code" title="show/hide code"></i>
                           </Button>
                        </td>
                  </tr>
              </tbody>
          </table>
      </div>
    )
  }
}
