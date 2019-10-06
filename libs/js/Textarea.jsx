import React, { Component } from 'react';
import { FormGroup, FormControl, HelpBlock } from 'react-bootstrap';

export default class Textarea extends Component {
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
      if (this.props.submitOnReturn) {
        this.props.onSubmit();
      }
    }else if(target.keyCode == 27){
      this.props.setEditable(false)
    }
  }
  render() {
    return (
      <FormGroup
        controlId="formBasicTextarea"
        validationState={this.props.validation.type}
      >
        <FormControl
          style={{ height: '200px' }}
          componentClass="textarea"
          bsSize="sm"
          value={this.state.value || ''}
          placeholder={this.props.placeholder}
          onChange={this.setValue.bind(this)}
          onBlur={this.onBlur.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          autoFocus={this.props.autoFocus}
        />
        <HelpBlock>{this.props.validation.msg}</HelpBlock>
      </FormGroup>
    );
  }
}

Textarea.defaultProps = {
  placeholder: 'Enter text'
};
