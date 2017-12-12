import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, HelpBlock, Overlay, Popover} from 'react-bootstrap';
import _ from 'lodash';

const TagComponent = (props) => (
  <span className="editable_select2_wrapper">
    <span className="editable_select2_value">
      {props.text}
    </span>
    <span className="editable_select2_close" onClick={(e)=>{props.onRemoveItem(props.index)}}>
      <i className="fa fa-times"></i>
    </span>
  </span>
)

class ListPopover extends Component {
  constructor(props) {
    super(props);
  }

  getOptions = () => {
    let value = this.props.inputValue;
    let options = this.props.options;
    if(value !== ""){
      options = _.filter(this.props.options,(obj)=>{
        return obj.text.toLowerCase().match(value.toLowerCase())
      })
    }
    if(options.length > 0){
      return options.map((obj,i)=>{
        return (<option key={"options_" + obj.value} value={obj.value}>{obj.text}</option>)
      })
    } else {
      return (<option value="">No Records Found !!!</option>)
    }
  }

  onOptionClick = (e) => {
    let value = e.target.value;
    if(value !== ""){
      this.props.onValueSelect(value);
    }
  }

  render(){
    return(
      <Overlay
        show={this.props.showOptions}
        target={() => ReactDOM.findDOMNode(this.props.target)}
        placement="bottom"
        container={this.props.container}
        >
        <Popover id="select2_popover" className="select2_options_popover">
          <select multiple onClick={this.onOptionClick}>
            {
              this.getOptions()
            }
          </select>
        </Popover>
      </Overlay>
    )
  }
}

class InputBox extends Component {

  constructor(props){
    super(props);
    this.state = {
      value: "",
      showOptions: false
    }
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value,
      showOptions: true
    })
  }

  onInputKeyPress = (e) => {
    if(e.which === 13) {
      if(this.state.value !== ""){
        let options = _.filter(this.props.options,(obj)=>{
          return obj.text.toLowerCase().match(this.state.value.toLowerCase())
        })
        if(options.length !== 0){
          let value = options[0].value;
          this.setState({
            value: ""
          },()=>{
            this.context.select2.onValueSelect(value);
          })
        }
      }
    }
  }

  componentWillReceiveProps(){
    this.state.showOptions = true;
  }

  onInputClick = () => {
    this.setState({
      showOptions : !(this.state.showOptions)
    })
  }

  onValueSelect = (value) => {
    this.setState({
      showOptions: false
    },()=>{
      this.context.select2.onValueSelect(value);
    })
  }

  render(){
    return(
      <span>
        <input
          className="editable_select2_input"
          onClick={this.onInputClick}
          value={this.state.value}
          onKeyPress={this.onInputKeyPress}
          onChange={this.onChange}
        />
        {
          this.state.showOptions ?
            <ListPopover
              inputValue={this.state.value}
              options={this.props.options}
              showOptions={this.state.showOptions}
              target={this.context.select2.refs.target}
              container={this.context.select2}
              onValueSelect={this.onValueSelect}
            />
            :null
        }
      </span>
    )
  }
}

InputBox.contextTypes = {
  select2: React.PropTypes.object
}

export default class Select2 extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedValue: this.setSelectedValue(),
      optionsList: []
    }
  }

  setSelectedValue = () => {
    let values = [];
    let options = this.props.options;
    if(_.isArray(this.props.value)){
      _.map(this.props.value,(val)=>{
          let obj = _.find(options,{text: val});
          if(obj){
            values.push(obj)
          }
      })
    } else {
      let obj = _.find(options,{text: this.props.value});
      if(obj){
        values.push(obj)
      }
    }
    return values;
  }

  componentWillMount(){
    this.setValue(this.state.selectedValue);
  }

  getChildContext = () => {
    return {select2: this}
  }

  onValueSelect = (value) => {
    let selectedValue = this.state.selectedValue;
    let obj = _.find(this.props.options,(obj)=>{
      return obj.value == value;
    })
    if(obj){
      selectedValue.push(obj);
    }
    this.setValue(selectedValue);
  }

  getOptionsList = (selectedValue) => {
    let options = [];
    this.props.options.map((obj)=>{
      let option = _.find(selectedValue,{value:obj.value});
      if(!option){
        options.push(obj);
      }
    })
    return options;
  }

  onRemoveItem = (i) => {
    this.refs.input_box.setState({
      showOptions: false
    },()=>{
      let selectedValue = this.state.selectedValue;
      selectedValue.splice(i,1);
      this.setValue(selectedValue);
    })
  }

  setValue = (selectedValue) => {
    let optionsList = this.getOptionsList(selectedValue);
    this.setState({
      selectedValue: selectedValue,
      optionsList: optionsList
    },()=>{
      const texts = _.map(this.state.selectedValue, (val) => { return val.text})
      this.props.setValueToAnchor(texts);
    })
  }

  render(){
    return (
      <FormGroup controlId="formControlsSelect2" className="editable_control_select2" validationState={this.props.validation.type}>
        <div className="editable_select2" ref="target">
          {
            this.state.selectedValue.map((obj,i)=>{
              return (<TagComponent key={i} index={i} text={obj.text} onRemoveItem={this.onRemoveItem}/>)
            })
          }
          <InputBox ref="input_box" options={this.state.optionsList}/>
        </div>
        <HelpBlock key={"HelpBlock"+this.props.name}>{this.props.validation.msg}</HelpBlock>
      </FormGroup>
    )
  }
}

Select2.childContextTypes = {
  select2: React.PropTypes.object
}
