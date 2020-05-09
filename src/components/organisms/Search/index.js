import React, { PureComponent } from 'react';

import {Input} from '../../atoms/';

class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query:'',
      searchResult:[]
    };
  }

  static defaultProps={
    children:()=><></>
  }

  handleChange=({target:{value}})=>{
    const {options, searchBy} = this.props;
    const searchResult = options.filter((eachOption)=>{
      for(let i=0;i<searchBy.length;i++){
        const fieldValue = eachOption[searchBy[i]];
        if(typeof(fieldValue) === 'string'){
          const isExist = fieldValue.toLowerCase().includes(value.toLowerCase());
          if(isExist){
            return true;
          }
        }else if(typeof(fieldValue) === 'object' && fieldValue.constructor === Array){
          const isExist = fieldValue.some((elm)=>(elm.toLowerCase().includes(value.toLowerCase())));
          if(isExist){
            return true;
          }
        }
      };
      return false;
    })
    this.setState({query: value, searchResult});
  }
  render() {
    const {placeholder, children} = this.props;
    const {searchResult, query} = this.state;
    return (
      <div className="search">
        <div className="row">
          <div className="col-12">
            <Input placeholder={placeholder} onChange={this.handleChange} value={query}/>
          </div>
          <div className="col-12">
            {
              searchResult.length>0 && query.length>0 &&
              <div className="overflow-auto border" style={{height:'400px'}}>
                {children(searchResult)}
              </div>
            }
          </div>
        </div>
      </div>
    );
  }

}

export default Search;
