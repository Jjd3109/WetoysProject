import axios from "axios";
import { useEffect } from "react";

function Items() {
    useEffect(() => {
        // 실제 아이템 ID를 동적으로 전달하여 올바른 URL을 생성합니다.
        const itemId = 1; // 여기에 실제 아이템 ID를 지정하세요
        axios.get(`/api/v1/items/${itemId}`)
            .then(function(res){
                const item = res.data; // 응답 데이터
                const title = item.title; // title 값
                console.log(item); // title 값 출력
                
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