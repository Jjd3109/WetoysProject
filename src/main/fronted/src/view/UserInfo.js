import axios from "axios"
import { useEffect, useState } from "react";

export default function UserInfo(){

    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        axios.get("/api/v1/member")
        .then(function(res){
            setInfo(res);
            setLoading(false);
        })
        .catch(function(res){
            console.log("실패" + res);
        })

    }, []);


    return (
    <>
    {
        loading ? (
            <div>Loading...</div>
        ) : (
        <>
        <div className="bg-white py-24 sm:py-32">
            ??
            <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
                <img className="w-32 h-32 rounded-full mx-auto"  src={`image/${info.data.fileName}`} alt="Profile picture" />
                <h2 className="text-center text-2xl font-semibold mt-3">{info.data.username}</h2>
                <p className="text-center text-gray-600 mt-1">{info.data.info} / {info.data.position} </p>
                <div className="flex justify-center mt-5">
                <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">Twitter</a>
                <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">LinkedIn</a>
                <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">GitHub</a>
                </div>
                <div className="mt-5">
                {/*<h3 className="text-xl font-semibold">Bio</h3>*/}
                <p className="text-gray-600 mt-2">{info.data.about}</p>
                </div>
            </div>

        </div>
        <div className="bg-white max-w-lg mx-auto grid grid-cols-3 gap-4 text-center">
            <div className="col-span-1">
                테스트
            </div>
            <div className="col-span-1">
                테스트
            </div>
            <div className="col-span-1">
                테스트
            </div>
        </div>
        <div className="bg-white py-24 sm:py-32 max-w-lg mx-auto grid text-center">
            정보
        </div>   
        </>
       
        )
    }
       
    </>
    )
}


