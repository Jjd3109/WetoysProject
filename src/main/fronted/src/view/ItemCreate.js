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
    const [title, setTitle] = useState('');
    const [shortContent, setShortContent] = useState('');

    const create = () => {
    
        axios.post("/api/v1/project", {
            state : "state",
            title : title,
            shortContent : shortContent,
            content : editorRef.current.getInstance().getMarkdown()
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response){
            console.log(response.data);
            //성공시 /item으로 리다이렉트
            window.location.replace('/project');
            
        }).catch(function(error){
            console.log(error.response.data);
           
        })
    
    
    };

    return (
        <div className="edit_wrap  mx-auto max-w-7xl px-6 lg:px-8 g-white py-24 sm:py-10 max-w-7xl">
            
            <div className="mb-6 ">
                <label htmlFor="default-input" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">제목</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </input>
            </div>


            <div className="mb-6 ">
                <label htmlFor="message" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">요약</label>
                <textarea id="shortContent" value={shortContent} onChange={(e) => setShortContent(e.target.value)} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="요약할 내용을 적어주세요"></textarea>
            </div>
            
            
            <Editor
                initialValue=" "
                placeholder="내용을 입력해주세요."
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