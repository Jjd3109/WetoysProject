import { useDeferredValue, useEffect, useState } from "react";
import axios from "axios";

function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    async function login() {

        axios.post("api/v1/login", {
            email: email,
            password: password
        })
        .then(function (response) {
            // response
            console.log(response.data);
        }).catch(function (error) {
            // 오류발생시 실행
            console.log(error.response.data);

        })

    }




    return (
        <div className="g-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl grid-cols-2 font-bold tracking-tight text-gray-900 sm:text-4xl">회원 가입</h2>

                    <div className="mt-2 text-lg leading-8 text-gray-600 ">
                        <label className="mr-10">아이디</label>

                        <input className="border border-indigo-600"
                        type="text"
                        value={email}
                               onChange={(e) => setEmail(e.target.value)}
                        ></input>

                    </div>

                    <div className="mt-2 text-lg leading-8 text-gray-600 ">
                        <label className="mr-10">비밀번호</label>
                        <input className="border border-indigo-600"
                            type="password"
                            value={password}
                               onChange={(e) => setPassword(e.target.value)}
                        ></input>

                    </div>

                    <div>
                        <button className="ui-button" onClick={login}> 회원가입 </button>
                    </div>

                </div>
            </div>
        </div>    
    );
    
}

export default Login