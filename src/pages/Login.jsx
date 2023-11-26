import React, {useContext, useState} from "react";
import {UserContext} from "../components/UserContext";
import ErrorMessage from "../components/ErrorMessage";

const Login = () => {

    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [,setToken] = useContext(UserContext);

    const submitLogin = async () => {

        const urlencoded = new URLSearchParams();
        urlencoded.append("username", nickname);
        urlencoded.append("password", password);

        const requestOptions = {
            method: "POST",
            mode: "cors",
            body: urlencoded,
            redirect: "follow"
        };

        const response = await fetch("http://localhost/8000/api/login", requestOptions)
        const data = await response.json();

        if(!response.ok) {
            setErrorMessage(data.detail);
            alert("Error: " + data)
            console.log(response);
        } else
            setToken(data.access_token);
        alert("Success!");
        console.log(response);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitLogin();
    };

    return (
        <div className="column">
            <form className="box" onSubmit={handleSubmit}>
                <h1 className="title has-text-centered">Login</h1>
                <div className="field">
                    <label className="label">Nickname</label>
                    <div className="control">
                        <input
                            type="nickname"
                            placeholder="Provide nickname"
                            value={nickname}
                            onChange={(e)=>setNickname(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input
                            type="password"
                            placeholder="Provide password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                </div>
                <ErrorMessage message = {errorMessage}/>
                <br/>
                <button className="button is-primary" type="submit">Log in</button>
            </form>
        </div>
    )

}

export default Login;