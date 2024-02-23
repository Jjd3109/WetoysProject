import axios from "axios";
import { useEffect, useState } from "react";

function Items() {

    const [list , SetList] = useState([]);

    useEffect(() => {
        // 실제 아이템 ID를 동적으로 전달하여 올바른 URL을 생성합니다.
        const itemId = 2; // 여기에 실제 아이템 ID를 지정하세요
        axios.get(`/api/v1/items/${itemId}`)
            .then(function(res){
                SetList(res.data);
                console.log(res.data);
                console.log(list);
                
            })
            .catch(function(error) {
                console.error("Error fetching item:", error);
            });
    }, []); // 빈 의존성 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

    return (
        <div>
            테스트
        </div>
    );
}

export default Items;