import React from 'react';
import './Investments.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


const Investments = (props) => {
    return (
        <div>
            <div className="display-flex">
                <p> {props.data} </p>
                <p className="width-p"> R${props.valor} </p>
                <div className="icon-trash">
                    <FontAwesomeIcon onClick={props.delete} icon={faTrash} />
                </div>
                
            </div>
        </div>
    )

}

export default Investments;