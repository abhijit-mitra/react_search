import React,{memo, useEffect, useRef} from 'react';

import './style.css';


const getHighlightedText = (value, query)=>{
  const sizeOfQuery = query.length;
  const sizeOfValue = value.length;
  const fromIndex = value.toLowerCase().indexOf(query.toLowerCase());
  if(fromIndex === -1){
    return value;
  }

  const toIndex = fromIndex+sizeOfQuery;
  return (
    <>
      {value.slice(0,fromIndex)}
      <span className='highlight'>{value.slice(fromIndex, toIndex)}</span>
      {value.slice(toIndex, sizeOfValue)}
    </>
  )
}

const UserDetailsCard = memo(({id, name, items, address, pincode, active, onHover, index, eventName, query}) => {
  const cardRef = useRef();
  useEffect(()=>{
    if(eventName!=='hover' && active){
      const block = eventName ==='keyUp'? 'start':'end';
      cardRef.current.scrollIntoView({block,behavior: "smooth"});
    }
  },[active, eventName]);

  const handleHover = ()=>{
    if(!eventName.includes('key') && !active){
      onHover(index);
    }
  }
  return(
  <div className={`p-3 border w-100 user-card ${active?'active':''}`} ref={cardRef} onMouseOver={handleHover}>
    <div className="mb-1">
      {getHighlightedText(id, query)}
    </div>
    <div className="mb-1">
      {getHighlightedText(name, query)}
    </div>
    {items.map((elm, index)=>(
            <div className="mb-1">
              {getHighlightedText(elm, query)}
            </div>
    ))
    }
    <div className="mb-1">
      {getHighlightedText(address, query)}
    </div>
    <div>
      {getHighlightedText(pincode, query)}
    </div>
  </div>
)});

export default UserDetailsCard;
