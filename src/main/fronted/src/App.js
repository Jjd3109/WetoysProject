import {useEffect, useState} from "react";
import axios from "axios";
import Header from "./Header";
import Example from "./view/Example";
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import ItemList from "./view/ItemList";
import MemberJoin from "./view/MemberJoin";
import ItemCreate from "./view/ItemCreate";
import Items from './view/Items';



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
            <Route path="/itemList" element={<ItemList />}></Route>
            <Route path="/MemberJoin" element={<MemberJoin />}></Route>
            <Route path="/ItemCreate" element={<ItemCreate />}></Route>
            <Route path="/Items/:id" element={<Items />}></Route>
        </Routes>


      </div>



  );
}

export default App;
