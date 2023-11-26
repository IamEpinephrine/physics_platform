import React, {createContext, useEffect, useState} from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem("accessToken"));
    const [role, setRole] = useState(localStorage.getItem("role"))
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [id, setId] = useState(localStorage.getItem('ID'));

    useEffect(() => {
            const fetchUser = async () => {
                const requestOptions = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                };
                const response = await fetch("http://localhost/8000/api/my-profile", requestOptions);

                if(!response.ok) {
                    setToken(null);
                    setRole(null);
                    setUsername(null);
                    setId(null);
                }
                localStorage.setItem("accessToken", token);
                const data = await response.json();
                localStorage.setItem("username", data.username);
                localStorage.setItem("ID", data.id);
                localStorage.setItem("role", data.role);
            };
            fetchUser();
        },
        [token]);

    return (
        <UserContext.Provider value={[token, setToken]}>
            {props.children}
        </UserContext.Provider>
    )
}