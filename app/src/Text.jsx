import React, {Component} from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap';
export default class Text extends Component {
  constructor(props){
    super(props);
    this.state = {
      value : props.value,
    };
  }
  getValue = () =>{
    return this.state.value;
  }
  setValue = (e) =>{
    this.setState({ value: e.target.value });
    this.props.setValueToAnchor(e.target.value);
  }
  onBlur(e){
    if( !this.props.showButtons ){
      this.setValue(e);
      this.props.onSubmit();
    }
  }
  render(){
    return (
      <FormGroup controlId="formBasicText" validationState={this.props.validation.type} key={"FormGroup"+this.props.name}>
        {/*<ControlLabel>Label</ControlLabel>*/}
        <FormControl
          key={"FormControl"+this.props.name}
          type="text"
          placeholder="Enter text"
          bsSize="sm"
          value={this.state.value}
          onChange={this.setValue.bind(this)}
          onBlur={this.onBlur.bind(this)}
        />
        {/*<FormControl.Feedback />*/}
        <HelpBlock key={"HelpBlock"+this.props.name}>{this.props.validation.msg}</HelpBlock>
      </FormGroup>

    );
  }
}
