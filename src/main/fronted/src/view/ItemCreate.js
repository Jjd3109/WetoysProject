import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import {useDeferredValue, useEffect, useRef, useState} from "react";
import axios from "axios";

function ItemCreate() {

    const editorRef = useRef();

    const create = () => {
        console.log(editorRef.current.getInstance().getMarkdown());
    
        axios.post("/api/v1/items", {
            state : "state",
            title : "title",
            content : editorRef.current.getInstance().getMarkdown()
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response){
            console.log(response.data);
        });
    
    
    };

    return (
        <div className="edit_wrap grid place-items-center">
            <Editor
                initialValue="내용을 입력해주세요."
                previewStyle="vertical"
                height="600px"
                initialEditType="wysiwyg"
                useCommandShortcut={false}
                plugins={[colorSyntax]}
                ref={editorRef}
                language="ko-KR"
            />


            <button onClick={create}>생성</button>
        </div>
    );
}

export default ItemCreate;