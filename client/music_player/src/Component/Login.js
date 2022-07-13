import { useState } from "react";

const LoginPage = () => {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");


    const changeHandlerUserName = (e) => {
        setUserName(e.target.value);
    }

    const changeHandlerPassword = (e) => {
        setPassword(e.target.value);
    }

    const handlerLogin = (e) => {
        
    }

    return(
        <div>
            <div>
                <input name="username" type="text" placeholder="username"
                value={username} onChange={changeHandlerUserName} className="me-3"></input>
                <input name="password" type="password" placeholder="password"
                value={password} onChange={changeHandlerPassword} className="me-3"></input>
                <button className="btn btn-primary">LOGIN</button>
            </div>
        </div>
    )

}

export default LoginPage;