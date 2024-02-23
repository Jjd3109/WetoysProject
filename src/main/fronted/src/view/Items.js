import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Items() {
    const {id} = useParams();
    
    const [list , SetList] = useState([]);
   

    useEffect(() => {
        axios.get(`/api/v1/items/${id}`)
            .then(function(res){
                SetList(res.data);
               
            })
            .catch(function(error) {
                console.error("Error fetching item:", error);
            });
    }, [id]); // 빈 의존성 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

    console.log(list);

    return (
        <div className="grid place-items-center">
            {/* 제목 */}
            <div>
                {list[0].title}
            </div>

            {/* 모집상태 (ex: 완료, 진행중)*/}
            <div>
                {list[0].state}
            </div>

            {/* 모집역할 (ex: 프론트엔드 백엔드 등등)*/}
            <div>
                {list[0].job}
            </div>

            {/* 목적 (ex: 수입창출, 토이프로젝트)*/}
            <div>
                {list[0].job}
            </div>          

            {/* 참여 시간 */}
            <div>

            </div>

            {/* 내용 */}
            
            <div>
                {list[0].title}
            </div>

        </div>
    );
}

export default Items;