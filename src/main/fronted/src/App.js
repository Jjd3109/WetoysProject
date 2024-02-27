import {useEffect, useState} from "react";
import axios from "axios";
import Header from "./Header";
import Example from "./view/Example";
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Item from "./view/ItemList";
import MemberJoin from "./view/MemberJoin";
import ItemCreate from "./view/ItemCreate";
import Items from './view/Items';
import QnA from "./view/QandA";
import Login from "./view/Login";



function App() {
  const [hello, setHello] = useState('');

  useEffect(() => {
    // axios.get('/api/test')
    //     .then((res) => {
    //       //setHello(res.data);
    //         const value = res.data;
    //         console.log(res.data);
    //         console.log(value['이름']);
    //         setHello(res.data);
    //
    //     })
  }, []);


  return (
      <div className="App">
          <Header />
          <Example />


        <Routes>
            <Route path="/Item" element={<Item />}></Route>
            <Route path="/MemberJoin" element={<MemberJoin />}></Route>
            <Route path="/ItemCreate" element={<ItemCreate />}></Route>
            <Route path="/Items/:id" element={<Items />}></Route>
            <Route path="/QnA" element={<QnA />}></Route>
            <Route path="/Login" element={<Login />}></Route>
        </Routes>


      </div>



  );
}

export default App;
