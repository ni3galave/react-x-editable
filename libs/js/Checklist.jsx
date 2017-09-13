import React, {Component} from 'react';
import {
  FormGroup,
  Checkbox
} from 'react-bootstrap';
import _ from 'lodash';
export default class Checklist extends Component {
  constructor(props){
    super(props);
    this.state = {
      value : this.setInitialVal(),
      options : props.options
    };
  }
  setInitialVal = () => {
    const values = this.props.value ? this.props.value : [];
    return _.map(values, (val) => {
      return _.find(this.props.options, {'text' : val});
    })
  }
  getValue = (text) =>{
    const {value} = this.state;
    const isOptionFound = _.find(value, {'text' : text})
    return isOptionFound ? true : false;
  }
  setValue = (e) =>{
    const values = _.clone(this.state.value);
    if(e.target.checked){
      values.push({'text' :e.target.name, 'value' : e.target.value});
    }else {
      const existingVal = _.find(values, (obj) => {
        if(obj.value == e.target.value) return obj;
      });
      values.splice(_.indexOf(values, existingVal),1);
    }
    this.setState({ value : values});
    const texts = _.map(values, (val) => { return val.text})
    this.props.setValueToAnchor(texts);

  }
  onBlur(e){
    if( !this.props.showButtons ){
      this.props.onSubmit();
    }
  }
  getOptions(){
    const options = this.props.options.map( option =>
      ( <Checkbox
          name={option.text}
          key={option.value}
          value={option.value}
          checked={this.getValue(option.text)}
          onChange={this.setValue.bind(this)}
          onBlur={this.onBlur.bind(this)}
          inline={this.props.optionsInline}
          >
          {option.text}
        </Checkbox>
      )
    );
    return options;
  }
  render(){
    return (
      <FormGroup controlId="formChecklist" validationState={this.props.validation.type} key={"FormGroup"+this.props.name}>
       {this.getOptions()}
     </FormGroup>
    )
  }
}
