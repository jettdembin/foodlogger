import React, { createContext } from "react";
import useFoodState from "../hooks/useFoodState";

export const FoodItemContext = createContext();

export function FoodItemProvider(props) {
  const initialFoods = [];
  const { foods, addFood, removeFood, allowEdit } = useFoodState(initialFoods);
  return (
    <FoodItemContext.Provider value={{ foods, addFood, removeFood, allowEdit }}>
      {props.children}
    </FoodItemContext.Provider>
  );
}