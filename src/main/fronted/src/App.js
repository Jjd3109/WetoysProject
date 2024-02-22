import logo from './logo.svg';
import {useEffect, useState} from "react";
import axios from "axios";
import Header from "./Header";
import Example from "./view/Example";
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import ItemList from "./view/ItemList";
import Detail from "./view/Detail";
import MemberJoin from "./view/MemberJoin";
import ItemCreate from "./view/ItemCreate";



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
          {/*백엔드 데이터 : {hello['이름']}*/}
          {/*<div className="">*/}
          {/*    <h2 className="text-blue-500 text-xl font-bold">Hello, React!</h2>*/}
          {/*    <p className="text-lg font-medium">Hello, Typescript!</p>*/}
          {/*</div>*/}

        <Routes>
            <Route path="/itemList" element={<ItemList />}></Route>
            <Route path="/Detail/1" element={<Detail />}></Route>
            <Route path="/MemberJoin" element={<MemberJoin />}></Route>
            <Route path="/ItemCreate" element={<ItemCreate />}></Route>
        </Routes>


      </div>



  );
}

export default App;
