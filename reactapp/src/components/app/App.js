import { Fragment, useState, useEffect } from 'react';
import './App.css';
import Header from "../appHeader/Header";
import Home from "../appHome/Home";
import Login from "../appLogin/Login";
import ToastMsg from "../appToastMsg/ToastMsg";
import useWebSocket from 'react-use-websocket';
import {API_URL, WS_URL} from "../../index.js";
import axios from "axios";
import getCookie from "../../utils.js";

function App() {
  const [loading, setLoading] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [formUsername, setFormUsername] = useState()
  const [formPassword, setFormPassword] = useState()
  const [ students, setStudents] = useState([])
  const [ error, setError] = useState()
  const [showToast, setShowToast] = useState(false)
  const [toastMsg, setToastMsg] = useState("")
  const csrftoken = getCookie('csrftoken')
  const [socketUrl, setSocketUrl] = useState(null);

  useWebSocket(socketUrl, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
    onMessage: (e) => {
      const msg = JSON.parse(e.data);
      if (msg["type"] === 'refresh') {
          setToastMsg("Refreshing list")
          setShowToast(true)
          resetState();
      }
    }
  });

  useEffect(() => {
    if (isLoggedIn) {
        setSocketUrl(WS_URL);
    } else {
        setSocketUrl(null);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
        fetch(API_URL + "/students/", {headers: {'Content-Type': 'application/json;charset=utf-8'}})
          .then(response => {
            if (response.ok) {
              return response.json()
            } else if (response.status === 403) {
              throw Error("Access denied")
            } else {
              throw Error(`Something went wrong: code ${response.status}`)
            }
          }).then(responseData => {
            setStudents(responseData)
          })
          .catch(error => {
            console.log(error)
            if (error.message !== "Access denied") setError('Ошибка, подробности в консоли')
            setIsLoggedIn(false)
          })
    }
  }, [isLoggedIn])

  const submitHandler = e => {
    e.preventDefault();
    setLoading(true);
    fetch(
      API_URL + "/login",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
          username: formUsername,
          password: formPassword,
        })
      }
    )
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw Error(`Something went wrong: code ${response.status}`)
        }
      })
      .then(({key}) => {
          setIsLoggedIn(true)
          setError(null)
          setToastMsg("Successfully logged in")
          setShowToast(true)
          setSocketUrl(WS_URL)
      })
      .catch(error => {
        console.log(error)
        setToastMsg("Network error. Check console")
        setShowToast(true)
      })
      .finally(setLoading(false))
    }

  const resetState = () => {
      axios.get(API_URL + "/students/").then(data => setStudents(data.data))
  };

  return (
    <Fragment>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <ToastMsg show={showToast} setShow={setShowToast} msg={toastMsg}/>
        {error? <p>{error}</p> : null}
        {isLoggedIn?
            error?
                null
            :
                <div>
                    <Home students={students} setStudents={setStudents} resetState={resetState}/>
                </div>
          :
            loading? "Загрузка..." :
            <Login onSubmit={submitHandler} setFormUsername={setFormUsername} setFormPassword={setFormPassword}/>
        }
    </Fragment>
  );

}

export default App;
