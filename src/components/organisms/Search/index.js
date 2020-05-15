import React, { PureComponent } from 'react';

import {Input, NoDataView} from '../../atoms/';

const SearchResultStyle ={
  'maxHeight':'400px'
}

class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query:'',
      searchResult:[],
      cursor: 0,
      eventName: 'hover',
      open:false
    };
    this.container_ref = React.createRef();
    this.timeOut = null;
  }

  static defaultProps={
    children:()=><></>
  }

  handleBlur = event => {
    this.setState({
      open: false,
    });
  };

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
    this.setState({query: value, searchResult, cursor:0, open: value.length>0});
  }

  handleKeyDown =(e)=>{
    const { cursor, searchResult } = this.state
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 38 && cursor > 0) {
      this.setState( prevState => ({
        ...prevState,
        cursor: prevState.cursor - 1,
        eventName:'keyUp'
      }))
    } else if (e.keyCode === 40 && cursor < searchResult.length - 1) {
      this.setState( prevState => ({
        ...prevState,
        cursor: prevState.cursor + 1,
        eventName:'keyDown'
      }))
    };
    clearTimeout(this.timeout);
    this.timeout = setTimeout(()=>{
      this.setState(prevState => ({
        eventName:'hover'
      }))
    }, 500);
  }
  setCursor = (index)=>{
    this.setState( prevState => ({
      ...prevState,
      cursor: index,
      eventName:'hover'
    }))
  }
  handleFocus = ()=>{
    this.setState((prevState)=>({
      ...prevState,
      open:prevState.query.length>0,
      cursor:0
    }))
  }

  render() {
    const {placeholder, children} = this.props;
    const {searchResult, query, cursor, eventName, open} = this.state;
    return (
      <div className="search">
        <div className="row">
          <div className="col-12">
            <Input
            placeholder={placeholder}
            onChange={this.handleChange}
            value={query}
            onKeyDown={this.handleKeyDown}
            onFocus={this.handleFocus}
            onBlur = {this.handleBlur}
            />
          </div>
          {
            open &&
            <div className="col-12" ref={this.container_ref}>
              {
                searchResult.length>0 ?
                <div className="overflow-auto border" style={SearchResultStyle}>
                  {children(searchResult, cursor, this.setCursor, eventName, query)}
                </div>:
                <div className="w-100 border" style={{'height':'400px'}}>
                  <NoDataView msg={'No User found'}/>
                </div>
              }
            </div>
          }
        </div>
      </div>
    );
  }

}

export default Search;
