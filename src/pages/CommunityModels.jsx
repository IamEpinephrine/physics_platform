import React, {useState, useEffect} from 'react';
import ErrorMessage from "../components/ErrorMessage";
import Grid from "@mui/material/Grid";
import {Link} from "react-router-dom";
import "../styles/AddModel.css";

const CommunityModels = () => {
    const [id, setId] = useState(null);
    const [errorMessage, setErrorMessage] =useState("");
    const [models, setModels] = useState(null);

    const getModels = async() => {
        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        };
        const response = await fetch("http://localhost:8000/api/community-models", requestOptions);
        if (!response.ok){
            setErrorMessage("Models cannot be loaded.");
        } else {
            const data = await response.json();
            setModels(data);
        }
    };

    useEffect(() => {
        getModels();
    }, []);

        return(
            <>
                <div>
                    <ErrorMessage message ={errorMessage}/>
                    {models ? (
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {models.map((model) => (
                                    <Grid item key={model.id}>
                                        <div>
                                            <img src = {model.image_path}/>
                                        </div>
                                        <div>
                                            {model.name}
                                        </div>
                                        <div>
                                            <Link to={'/communitymodels/' + model.id}>Select</Link>
                                        </div>
                                    </Grid>
                                ))}
                        </Grid>
                    ):(<p>Loading...</p>)}
                </div>
            </>
    )

};

export default CommunityModels;