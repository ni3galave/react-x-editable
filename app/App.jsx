import React, { Component } from 'react';
import Editable from 'src/Editable';
import 'styles/plugin.css';
import 'styles/demo.css';
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
                              mode={"popup"}
                              title="Enter username"
                              placement="right"
                              value="ni3galave"
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
                              return (<span>City: <b>{value}</b></span>);
                            }}
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
                              placement="right"
                              value="ni3galave"
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
                              return (<span>City: <b>{value}</b></span>);
                            }}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      )
    }
    render1() {
        return (
          <div>
            <h2>React x editable test</h2>
              <div><strong>Popup mode:</strong></div>
                <span>
                <Editable
                    name="username"
                    dataType="textarea"
                    mode={"popup"}
                    title="Enter username"
                    placement="right"
                    value="ni3galave"
                    validate={(value) => {
                      if(!value){
                        return 'Required';
                      }
                    }}
                    showButtons={true}
                  />
                  <Editable
                      name="username"
                      dataType="text"
                      mode={"popup"}
                      title="Enter username"
                      placement="right"
                      validate={(value) => {
                        if(!value){
                          return 'Required';
                        }
                      }}
                      showButtons={true}
                    />
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
                      return (<b>{value}</b>);
                    }}
                    validate={(value) => {
                      if(!value){
                        return 'Required';
                      }
                    }}
                    />
                </span>

                {/* INLINE ooooooooooooooooooooooooooooooooooooooooooooo */}
                <br />
                <br />
                <div>
                  <div><strong>Inline mode:</strong></div>
                  <Editable
                      name="username"
                      dataType="textarea"
                      mode={"inline"}
                      title="Enter username"
                      placement="right"
                      value="ni3galave"
                  validate={(value) => {
                        if(!value){
                          return 'Required';
                        }



                      }}
                      showButtons={true}
                    />
                    <Editable
                        name="username"
                        dataType="text"
                        mode={"inline"}
                        title="Enter username"
                        placement="right"
                        validate={(value) => {
                          if(!value){
                            return 'Required';
                          }



                        }}
                        showButtons={true}
                      />
                    Editable<Editable

                      dataType="select"
                      name={"city"}
                      value={2}
                      mode={"inline"}
                      title="Please select city"
                      placement="right"
                      showButtons={true}
                      options={[
                        {value : 1, text: "Mumbai"},
                        {value : 2, text: "Pune"},
                        {value : 3, text: "Nashik"}
                      ]}
                      display={function(value){
                        return (<b>{value}</b>);
                      }}
                      validate={(value) => {
                        if(!value){
                          return 'Required';
                        }
                      }}
                      />
                </div>
            </div>

        );
    }
}
