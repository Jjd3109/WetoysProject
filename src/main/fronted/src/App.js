import {useEffect, useState} from "react";
import axios from "axios";
import Header from "./Header";
import Example from "./view/Example";
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Project from "./view/ProjectList";
import MemberJoin from "./view/MemberJoin";
import ItemCreate from "./view/ItemCreate";
import ProjectDetail from './view/ProjectDetail';
import QnA from "./view/QandA";
import Login from "./view/Login";
import ProjectCard from "./view/ProjectCard";
import ProjectCardView from "./view/ProjectCardView";



function App() {
  const [hello, setHello] = useState('');


  axios.interceptors.request.use(
    function(config) {
        // 요청을 보내기 전에 실행되는 코드
        config.headers['Authorization'] = `Bearer ` + localStorage.getItem("accessToken"); // 헤더에 AccessToken을 추가
        config.headers['RefreshToken'] = localStorage.getItem("refreshToken"); // 헤더에 AccessToken을 추가
        return config;
    },
    function(error) {
        // 요청이 실패했을 때 실행되는 코드
        return Promise.reject(error);
    }
);


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
            <Route path="/Project" element={<Project />}></Route>
            <Route path="/MemberJoin" element={<MemberJoin />}></Route>
            <Route path="/ItemCreate" element={<ItemCreate />}></Route>
            <Route path="/ProjectDetail/:id" element={<ProjectDetail />}></Route>
            <Route path="/QnA" element={<QnA />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/projectcard" element={<ProjectCard />}></Route>
            <Route path="/ProjectCardView" element={<ProjectCardView />}></Route>
        </Routes>


      </div>



  );
}

export default App;
