import React,{memo, useEffect, useRef} from 'react';

import './style.css';

const UserDetailsCard = memo(({id, name, items, address, pincode, active, onHover, index, eventName}) => {
  const cardRef = useRef()
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
    <div className="mb-3">
      {id}
    </div>
    <div className="mb-3">
      {name}
    </div>
    <div className="mb-3">
      {address}
    </div>
    <div>
      {pincode}
    </div>
  </div>
)});

export default UserDetailsCard;
