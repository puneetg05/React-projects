import React from 'react';

const List = (props) => {
    return (
        <ul>
            {
                props && props.items.map((item,index) => <li key={index} onClick={() => { props.onClick(index) }}>{item}</li>)
            }
        </ul>
    )
}

export default List;
