import React, { Component } from 'react';
import CoffeeList from './CoffeeList';

class Coffeeform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coffee: '',
            email: '',
            size: '',
            flavor: '',
            strength: '',
            list: []
        };
    }

    componentDidMount() {
        fetch('https://dc-coffeerun.herokuapp.com/api/coffeeOrders')
            .then(r => r.json())
            .then(cofArr => {
                console.table(Object.values(cofArr));
                console.log(cofArr);
                this.setState({
                    list: Object.values(cofArr)
                });
            });
    }

    render() {
        return (
            <div>
                <h1>coffee here please</h1>
                <form onSubmit={this._onSubmit}>
                    <label>
                        Coffee:
                        <input
                            value={this.state.coffee}
                            onChange={this._onChangeCoffee}
                            type="text"
                            name="coffee"
                            placeholder="Ex. Black"
                            required
                        />
                    </label>
                    <label>
                        Email:{' '}
                        <input
                            value={this.state.email}
                            onChange={this._onChangeEmail}
                            type="email"
                            name="email"
                            placeholder="Ex. bob@aol.com"
                            required
                        />
                    </label>
                    <label>
                        Size:{''}
                        <input
                            value={this.state.size}
                            onChange={this._onChangeSize}
                            type="text"
                            name="size"
                            placeholder="Ex. SM/MED/LARGE"
                        />
                    </label>
                    <label>
                        Flavor:{''}
                        <input
                            value={this.state.flavor}
                            onChange={this._onChangeFlavor}
                            type="text"
                            name="flavor"
                            placeholder="Ex. Chocolate"
                            required
                        />
                    </label>
                    <label>
                        Strength:{''}
                        <input
                            value={this.state.strength}
                            onChange={this._onChangeStrength}
                            min="0"
                            max="100"
                            type="number"
                            name="strength"
                            placeholder="0-99"
                            required
                        />
                    </label>
                    <input type="submit" />
                </form>
                <CoffeeList items={this.state.list} />
            </div>
        );
    }
    _onChangeCoffee = e => {
        console.log(e);
        this.setState({
            coffee: e.target.value
        });
    };
    _onChangeEmail = e => {
        console.log(e);
        this.setState({
            email: e.target.value
        });
    };
    _onChangeSize = e => {
        console.log(e);
        this.setState({
            size: e.target.value
        });
    };
    _onChangeFlavor = e => {
        console.log(e);
        this.setState({
            flavor: e.target.value
        });
    };
    _onChangeStrength = e => {
        console.log(e);
        this.setState({
            strength: e.target.value
        });
    };
    _onSubmit = e => {
        e.preventDefault();

        fetch('https://dc-coffeerun.herokuapp.com/api/coffeeOrders', {
            method: 'POST',
            body: JSON.stringify({
                coffee: this.state.coffee,
                emailAddress: this.state.email,
                flavor: this.state.flavor,
                size: this.state.size,
                strength: this.state.strength
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(r => r.json())
            .then(theCoffeeInfo => {
                let newItem = {
                    coffee: theCoffeeInfo.coffee,
                    emailAddress: theCoffeeInfo.emailAddress,
                    flavor: theCoffeeInfo.flavor,
                    size: theCoffeeInfo.size,
                    strength: theCoffeeInfo.strength
                };
                this.setState({
                    list: [...this.state.list, newItem],
                    coffee: '',
                    email: '',
                    flavor: '',
                    size: '',
                    strength: ''
                });
            });
    };
}
export default Coffeeform;
