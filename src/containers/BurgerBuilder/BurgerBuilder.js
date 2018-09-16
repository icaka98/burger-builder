import React, { Component } from 'react';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';

const INGREDIENT_PRICES = {
    salad: .5,
    meat: 1.3,
    cheese: .4,
    bacon: .7
};

class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false
    };

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients).map(igKey => {
           return ingredients[igKey];
        }).reduce((sum, el) => { return sum + el; }, 0);

        this.setState({
            purchasable: sum > 0
        });
    }

    addIngredientHandler = (type) => {
        const old = this.state.ingredients[type];
        const upd = old + 1;
        const updatedIngredients = { ...this.state.ingredients };

        updatedIngredients[type] = upd;
        const nTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({
           totalPrice: nTotalPrice,
           ingredients: updatedIngredients
        });

        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] === 0) return;

        const oldIngredients = { ...this.state.ingredients };
        oldIngredients[type] = this.state.ingredients[type] - 1;

        const nTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.setState({
            totalPrice: nTotalPrice,
            ingredients: oldIngredients
        });

        this.updatePurchaseState(oldIngredients);
    };

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }

        return (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    totalPrice={this.state.totalPrice}/>
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;