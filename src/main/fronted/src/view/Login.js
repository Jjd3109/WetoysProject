import { useDeferredValue, useEffect, useState } from "react";
import axios from "axios";
import MemberJoin from "./MemberJoin";

function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    


    async function login() {

        axios.post("api/v1/login", {
            email: email,
            password: password,
            
        })
        .then(function (response) {
            // response
            console.log(response.data);
            console.log(response.data.accessToken);
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            document.location.href = '/project';
            
          
        }).catch(function (error) {
            // 오류발생시 실행
            console.log(error.response.data);

        })

    }

    function MemberJoin(){
        document.location.href = '/MemberJoin';
    }

    function kakaoLogin(){
        document.location.href = 'https://kauth.kakao.com/oauth/authorize';
    }




    return (

    
        <div className="g-white py-24 sm:py-32 mx-auto max-w-2xl px-6 lg:px-8">
            
            <h2 className="text-3xl mb-10 font-bold tracking-tight text-gray-900 sm:text-4xl">로그인</h2>
            <div className="mb-6 ">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
            </div> 
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" id="password" value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               placeholder="비밀번호 입력"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
            </div>
            <div>
                <button type="button" className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={login}> 로그인 </button>
            </div>
            <div>
                <button type="button" className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={MemberJoin}> 회원가입 </button>
            </div>
            <div>
                <a href="http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000&mode=login">
                    <button>Kakao Login</button>
                </a>
            </div>
            
           
        </div>
  

    );
    
}

export default Login