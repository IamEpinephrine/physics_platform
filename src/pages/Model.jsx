import React, {Component} from 'react';
import Components from "../components/ComponentIndex";


    class Model extends Component {

        render() {
            var type = "ModelFiber04";
            const ComponentTORender = Components[type];
            return <ComponentTORender/>
        }

    }

export default Model;
