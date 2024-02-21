import logo from './logo.svg';
import {useEffect, useState} from "react";
import axios from "axios";
import Header from "./Header";
import Example from "./Example";

function App() {
  const [hello, setHello] = useState('');

  useEffect(() => {
    axios.get('/api/test')
        .then((res) => {
          //setHello(res.data);
          console.log();
        })
  }, []);


  return (


      <div className="App">
          <Header />
          <Example />

          {

          }

        백엔드 데이터 : {hello}
          <div className="">
              <h2 className="text-blue-500 text-xl font-bold">Hello, React!</h2>
              <p className="text-lg font-medium">Hello, Typescript!</p>
          </div>
      </div>

  );
}

export default App;
