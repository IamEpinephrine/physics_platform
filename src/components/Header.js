import React  from 'react';
import Navbar from "./Navbar";


const Header = () => {

    return (

        <div className="has-text-centered m-6">
            {
                    <h1 className="title" >
                        <div className="has-text-left">
                            <div className="columns" color="lightgrey">
                            </div>
                            <div className="columns is-" style={{position: "absolute", left: 10}}>
                                <Navbar/>
                            </div>
                            <div>
                                <img src={'/Miradouro_logo.png'}/>
                            </div>
                        </div>
                    </h1>
            }
        </div>
    );
};

export default Header;