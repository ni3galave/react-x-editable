import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Button,
  Overlay,
  Popover
} from 'react-bootstrap';
import {
  Popover as Popover4,
  PopoverBody,
  PopoverHeader
} from 'reactstrap';


import Text from './Text';
import Textarea from './Textarea';
import Select from './Select';
import Checklist from './Checklist';
import Date from './Date';
//import Radio from './Radio';

export default class Editable extends Component {
  constructor(props){
      super(props);
      this.state = {
        dataType : props.dataType ? props.dataType : "text",
        name : props.name,
        mode : props.mode ? props.mode : "inline",
        disabled : props.disabled ? props.disabled : false,
        showButtons : props.showButtons != undefined ? props.showButtons : true,
        validate : props.validate ? props.validate : undefined,
        display : props.display ? props.display : undefined,
        bootstrap4 : props.bootstrap4 ? props.bootstrap4 : false,

        // only used when mode is popup
        title : props.title ? props.title : null,
        placement : props.placement ? props.placement : "right",
        //Input
        bsInputClass :props.bsInputClass ? props.bsInputClass : "",
        bsInputSize :props.bsInputSize ? props.bsInputSize : "sm",
        //Select & checklist
        options : props.options ? props.options : null,
        //checklist
        optionsInline : props.inline ? props.inline : false,
        //Required for customize input
        customComponent :props.customComponent ? props.customComponent : null,
        onInputChange : props.onInputChange ?  props.onInputChange : null,
        //handle callback if provided
        handleSubmit : props.handleSubmit ? props.handleSubmit : null,
        //for internal use
        editable: false,
        valueUpdated : false,

      };
      this.setInitialValue(this.props);

  }
  componentWillReceiveProps(nextProps){
    if(nextProps.value != this.value){
        this.setInitialValue(nextProps);
    }
  }
  setInitialValue = (newProps) => {
    const { dataType, options, value } = newProps;
    if(dataType == "select" || dataType == "checklist"){
      if( options == null ) {
        throw("Please specify options for "+dataType+" data type");
      }
      if(value && _.isEmpty(value)){
        const option = _.find(options, {'value' : value});
        if(option && option.text) {
          this.value = option.text;
          this.newValue = option.text;;
        }else {
          throw("No option found for specified value:"+ value)
        }
      }else{
        this.value = value;
        this.newValue = value;
      }

    }else {
      this.value = value;
      this.newValue = value;
    }
    this.validation = {};

  }
  setEditable = (editable) => {
    if(!this.state.disabled) this.setState({editable});
  }

  onSubmit = () => {
    this.validation = this.getValidationState();
    if(this.validation.type === "error"){
      this.setState({ valueUpdated : false});
    }else {
      this.value = this.newValue;
      this.setEditable(false);
      this.setState({ valueUpdated : true}, this.state.handleSubmit ? () => this.state.handleSubmit(this) : null);
    }
  }
  onCancel = () => {
    this.setEditable(false);
    //reset validation and all the changes
    this.validation = {};
    this.newValue = this.value;
  }
  setValueToAnchor(value, event){
    this.newValue = value;
    //To trigger onInputChange event:user defined
    if(this.props.onInputChange){
      this.props.onInputChange(event);
    }
  }
  getValueForAnchor(){
    if(this.value){
      if(this.props.display){
        return this.props.display(this.value);
      } else if(this.props.seperator && _.isArray(this.value)){
        return _.join(this.value, this.props.seperator);
      }else if(_.isArray(this.value)){
        return _.join(this.value, ',');
      }else if(_.isObject(this.value)){
        let tmp = '';
        _.forOwn(this.value, function(value, key) {
          tmp += key +":"+ value +" ";
        } );
        return tmp;
      }
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
      let bs4Extra = (this.state.bootstrap4? "btn-sm" : "")
      return (
        <React.Fragment>
          <Button bsStyle="success" bsSize="xsmall" onClick={this.onSubmit.bind(this)} key={"btn-success"+this.props.name}
                  className={`${bs4Extra} ${(this.state.bootstrap4? "mx-1": "")}`}>
            <i className="fa fa-check" key={"icon-fa-check"+this.props.name}></i></Button>{' '}
          <Button bsStyle="danger" bsSize="xsmall" onClick={this.onCancel.bind(this)} key={"btn-danger"+this.props.name}
                  className={bs4Extra}>
              <i className="fa fa-times" key={"icon-fa-times"+this.props.name}></i>
          </Button>
        </React.Fragment>
      )
    }
    return null;
  }
  getContent(){
    const { editable, title, validate, showButtons,
            defaultValue, dataType, placement, mode, name, bootstrap4
          } = this.state;

    const componetProps = {
      key: "editable-name-"+this.state.name,
      bootstrap4: this.state.bootstrap4,
      setValueToAnchor: this.setValueToAnchor.bind(this),
      value: this.value || defaultValue ,
      onSubmit: this.onSubmit.bind(this),
      setEditable: this.setEditable.bind(this),
      validation: this.validation
    };
    const content = [];
    if (editable) {
      switch (dataType) {
        case 'text':
          content.push(<Text {...this.props} {...componetProps} {...this.state} buttons={this.getButtons()}/>);
          break;
        case 'textarea':
          content.push(<Textarea {...this.props} {...componetProps} {...this.state} />);
          content.push(this.getButtons());
          break;
        case 'select':
          content.push(<Select {...this.props} {...componetProps} {...this.state} />);
          content.push(this.getButtons());
          break;
        case 'checklist':
          content.push(<Checklist {...componetProps} {...this.state} />);
          content.push(this.getButtons());
          break;
        case 'date':
          content.push(<Date {...componetProps} {...this.state} />);
          content.push(this.getButtons());
          break;
        // case 'radio':
        //   content.push(<Radio {...componetProps} {...this.state} />);
        //   break;
        case 'custom':
          const customComponentContent = this.state.customComponent(componetProps, this.state)
          content.push(customComponentContent);
          content.push(this.getButtons());
          break;
        default: throw('Please set valid dataType:'+dataType)

      }

      if(mode == 'popup'){
        if(bootstrap4){
          return(
              <Popover4
                  placement={placement}
                  isOpen={editable}
                  target={() => ReactDOM.findDOMNode(this.editableAnchor)}>
                <PopoverHeader>{title}</PopoverHeader>
                <PopoverBody>{content}</PopoverBody>
              </Popover4>
          )
        }else{
          return (
              <Overlay
                  rootClose={true}
                  onHide={() => { this.setEditable(false) } }
                  show={editable}
                  target={() => ReactDOM.findDOMNode(this.editableAnchor)}
                  {...this.props}>
                <Popover id={"popover-positioned-"+placement} title={title} key={this.props.name}>
                  {content}
                </Popover>
              </Overlay>
          );
        }
      }
      return content;
    }
  }

  render() {
    const { editable, title, validate, showButtons,
            defaultValue, dataType, mode, disabled } = this.state;
    const editableContainerClass = (disabled) ? "editable-disabled" : "editable-container";
    return (
      <div className={editableContainerClass} key={this.props.name} >
        { !(mode == 'inline' && editable)
            ? (<a ref={ref => this.editableAnchor = ref}
                  onClick={this.setEditable.bind(this, true)}
                  href="javascript:;"
                >
                  { this.getValueForAnchor() || this.props.emptyValueText }
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
  disabled : false,
  emptyValueText : "empty",
  //depend on mode
  placement : "right",
};

Editable.propTypes = {
    dataType : PropTypes.string.isRequired,
    name : PropTypes.string.isRequired,
    mode : PropTypes.string,
    showButtons : PropTypes.bool,
    disabled : PropTypes.bool,
    validate : PropTypes.func,
    display: PropTypes.func,
    onInputChange : PropTypes.func,

    //handle callback if provided
    handleSubmit : PropTypes.func,

    // only used when mode is popup
    title : PropTypes.string,
    placement : PropTypes.string,
    // for input type text
    bsInputClass :PropTypes.string,
    bsInputSize :PropTypes.string,
};
