import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM, {findDOMNode} from 'react-dom';
import {
  Overlay,
  Popover,
  Button,
  Form
} from 'react-bootstrap';
import _ from 'lodash';
import Text from './Text';
import Textarea from './Textarea';
import Select from './Select';
import 'styles/editable.css';


export default class Editable extends Component {
  constructor(props){
      super(props);
      this.state = {
        mode : props.mode ? props.mode : "inline",
        validate : props.validate ? props.validate : undefined,
        showButtons : props.showButtons != undefined ? props.showButtons : true,
        dataType : props.dataType ? props.dataType : "text",
        name : props.name,
        display : props.display ? props.display : undefined,
        // only used when mode is popup
        title : props.title ? props.title : null,
        placement : props.placement ? props.placement : "top",
        //Input
        bsInputClass :props.bsInputClass ? props.bsInputClass : "",
        bsInputSize :props.bsInputSize ? props.bsInputSize : "sm",
        //Select
        options : props.options ? props.options : null,
        //for internal use
        editable: false,
        valueUpdated : false,
      };
      // this.value = props.value;
      // this.validation = {};
      this.setInitialValue();

  }
  setInitialValue = () => {
    const { dataType, options, value } = this.props;
    if(dataType == "select"){
      const option = _.find(options, {'value' : value});
      if(option && option.text) {
        this.value = option.text;
      }else {
        throw("No option found for specified value:"+ value)
      }
    }else {
      this.value = value;
    }
    this.validation = {};
    this.newValue = value;
  }
  setEditable = (editable) => {
    this.setState({editable});
  }
  onSubmit = () => {
    this.validation = this.getValidationState();
    if(this.validation.type === "error"){
      this.setState({ valueUpdated : false});
    }else {
      this.value = this.newValue;
      this.setEditable(false)
      this.setState({ valueUpdated : true});
    }
  }
  onCancel = () => {
    this.setEditable(false);
    //reset validation
    this.validation = {};
  }
  setValueToAnchor(value){
    this.newValue = value;
  }
  getValueForAnchor(){
    if(this.props.display){
      return this.props.display(this.value);
    }
    return this.value;
  }
  getValidationState(){
    if(this.props.validate){
      const validate = this.props.validate(this.newValue)
      if(validate){
        return {type : 'error', msg : validate };
      }
    }
    return {type : undefined, msg : undefined };
  }
  getButtons(){
    if(this.state.showButtons){
      return (
        <div className="editable-btn" key={this.props.name+"editable-btn"}>
          <Button bsStyle="success" bsSize="xsmall" onClick={this.onSubmit.bind(this)} key={"btn-success"+this.props.name}>
            <i className="fa fa-check" key={"icon-fa-check"+this.props.name}></i></Button>
          <Button bsStyle="danger" bsSize="xsmall" onClick={this.onCancel.bind(this)} key={"btn-danger"+this.props.name}>
              <i className="fa fa-times" key={"icon-fa-times"+this.props.name}></i>
          </Button>
        </div>
      )
    }
    return null;

  }
  getContent(){
    const { editable, title, validate, showButtons,
            defaultValue, dataType, placement, mode, name
          } = this.state;
    const content = [];
    if (editable) {
      if (dataType == 'text') {
        content.push(
          <Text
            key={"Text-"+this.state.name}
            setValueToAnchor={this.setValueToAnchor.bind(this)}
            value={ this.value || defaultValue }
            onSubmit={this.onSubmit.bind(this)}
            validation={this.validation}
            {...this.state}
          />
        );
      }else if (dataType == 'textarea') {
        content.push(
          <Textarea
            key={"Textarea-"+this.state.name}
            setValueToAnchor={this.setValueToAnchor.bind(this)}
            value={ this.value || defaultValue }
            onSubmit={this.onSubmit.bind(this)}
            validation={this.validation}
            {...this.state}
          />
        );
      }else if (dataType == 'select') {
        content.push(
          <Select
            key={"Select-"+this.state.name}
            setValueToAnchor={this.setValueToAnchor.bind(this)}
            value={ this.value || defaultValue }
            onSubmit={this.onSubmit.bind(this)}
            validation={this.validation}
            {...this.state}
          />
        );
      }
      content.push(this.getButtons());
      if(mode == 'popup'){
        return (
          <div>
            <Overlay show={editable} target={() => ReactDOM.findDOMNode(this.refs.target)} {...this.props}>
              <Popover id={"popover-positioned-"+placement} title={title} key={this.props.name}>
                {content}
              </Popover>
            </Overlay>
          </div>
        );
      }
      return content;
    }
  }

  render() {
    const { editable, title, validate, showButtons, defaultValue, dataType, mode} = this.state;
    return (
      <div className="editable-container" key={this.props.name}>
        { !(mode == 'inline' && editable)
            ? (<a ref="target"
                  onClick={this.setEditable.bind(this, true)}
                > { this.getValueForAnchor() || 'empty' }
                </a>
              )
            : null
        }
        {this.getContent()}
      </div>
    );
  }
}

Editable.defaultProps = {
  showButtons : true,
  dataType : "text",
  mode : "inline",
  //depend on mode
  placement : "top",
};

Editable.propTypes = {
    dataType : PropTypes.string.isRequired,
    name : PropTypes.string.isRequired,
    mode : PropTypes.string,
    validate : PropTypes.func,
    display: PropTypes.func,
    showButtons : PropTypes.bool,

    // only used when mode is popup
    title : PropTypes.string,
    placement : PropTypes.string,
    // for input type text
    bsInputClass :PropTypes.string,
    bsInputSize :PropTypes.string,
};
