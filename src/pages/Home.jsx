import React from 'react';
import Grid from "@mui/material/Grid";
import {Link} from "react-router-dom";

function Home() {
    return (
        <div className='home'>
            <div align = 'center'>
                What do you want to do today?
                <div>
                    <Link to={'/models'}>Check out the existing models!</Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
