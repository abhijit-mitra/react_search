import React,{useEffect, useState, memo} from 'react';

import {Search} from '../../organisms';
import {UserDetailsCard} from '../../molecules';
import {UserApis} from '../../../apis';

const Home = memo((props) => {
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    const callApi = async ()=>{
      const res =  await UserApis.getUsers();
      const res_json = await res.json();
      setUsers(res_json);
    };
    callApi();
  },[]);

  return(
  <div className="home">
    <Search
      searchBy={['id','name','items', 'address', 'pincode']}
      placeholder={'Search users by ID, address, name, ...'}
      options={users}
    >
      {(searchResult, cursor, setCursor, eventName)=>{
        return searchResult.map((elm, index)=>
        <UserDetailsCard
          key={elm.id}
          active={cursor===index}
          onHover={setCursor}
          index={index}
          eventName={eventName}
          {...elm } />)
      }}
    </Search>

  </div>
)});

export default Home;
