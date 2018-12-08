import React from 'react';

const CoffeeList = props => {
    return (
        <div>
            <h2>coffee here</h2>
            <ul>
                {props.items.map((item, index) => {
                    return (
                        <li key={index}>
                            Coffee Order # {index + 1} : {item.size}{' '}
                            {item.coffee}
                            {item.flavor}
                            {item.strength} for{item.emailAddress}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CoffeeList;
