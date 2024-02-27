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
            <div className='mt-10'>
            <button type="button" onClick={create} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">create</button>
            </div>


        </div>
    );
}

export default ItemCreate;