import React, { Component } from 'react';
import { FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
export default class Date extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }
  getValue = () => {
    return this.state.value;
  };
  setValue = e => {
    this.setState({ value: e.target.value });
    this.props.setValueToAnchor(e.target.value, e);
  };
  onBlur(e) {
    if (!this.props.showButtons) {
      this.setValue(e);
      this.props.onSubmit();
    }
  }
  handleKeyDown(target) {
    if (target.keyCode == 13) {
      this.setValue(target);
      this.props.onSubmit();
    } else if (target.keyCode == 27) {
      this.props.setEditable(false);
    }
  }
  render() {
    return (
      <FormGroup
        controlId="formBasicText"
        validationState={this.props.validation.type}
        key={'FormGroup' + this.props.name}
      >
        <FormControl
          key={'form-control' + this.props.name}
          type="date"
          placeholder="Select text"
          bsSize="sm"
          value={this.state.value || ''}
          onChange={this.setValue.bind(this)}
          onBlur={this.onBlur.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          autoFocus={this.props.autoFocus}
        />
        <HelpBlock key={'HelpBlock' + this.props.name}>
          {this.props.validation.msg}
        </HelpBlock>
      </FormGroup>
    );
  }
}
