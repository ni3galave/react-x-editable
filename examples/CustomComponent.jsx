import React, {Component} from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Checkbox,
  Form,
  Col
} from 'react-bootstrap';
import _ from 'lodash';

export default class CustomComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      value : props.value ? props.value : {},
    };
  }
  getValue = () =>{
    return this.state.value;
  }
  setValue = (e) =>{
    const { value } = this.state;
    value[e.target.id] = e.target.value;
    this.setState({ value });
    this.props.setValueToAnchor(value, e);
  }
  render(){
    return (
      <Form horizontal>
        <FormGroup controlId="city" validationState={this.props.validation.type}
          key={"form-text-city"+this.props.name}
          name={"city"}>
          <Col componentClass={ControlLabel} sm={3}>
            City
          </Col>
          <Col sm={8}>
            <FormControl
              autoFocus
              key={"formControl-city-"+this.props.name}
              type="text"
              bsSize="sm"
              value={this.state.value.city || ''}
              onChange={this.setValue.bind(this)}
            />
          </Col>
          {/*<FormControl.Feedback />*/}
          <HelpBlock key={"HelpBlock"+this.props.name}>{this.props.validation.msg}</HelpBlock>
        </FormGroup>
        <FormGroup controlId="street" validationState={this.props.validation.type} key={"form-text-street"+this.props.name}>
          <Col componentClass={ControlLabel} sm={3}>
            Street
          </Col>
          <Col sm={8}>
            <FormControl
              key={"FormControl-street-"+this.props.name}
              type="text"
              bsSize="sm"
              value={this.state.value.street || ''}
              onChange={this.setValue.bind(this)}
            />
          </Col>
          <HelpBlock key={"HelpBlock"+this.props.name}>{this.props.validation.msg}</HelpBlock>
        </FormGroup>
        <FormGroup controlId="building" validationState={this.props.validation.type} key={"form-text-building"+this.props.name}>
          <Col componentClass={ControlLabel} sm={3}>
            Building
          </Col>
          <Col sm={8}>
            <FormControl
              key={"FormControl-building-"+this.props.name}
              type="text"
              bsSize="sm"
              value={this.state.value.building || ''}
              onChange={this.setValue.bind(this)}
            />
          </Col>
          <HelpBlock key={"HelpBlock"+this.props.name}>{this.props.validation.msg}</HelpBlock>
        </FormGroup>
    </Form>

    );
  }
}
