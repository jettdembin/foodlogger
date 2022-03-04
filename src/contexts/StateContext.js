import React, { useState, useEffect, createContext } from "react";
import useFormDigitState from "../hooks/useFormDigitState";

export const StateContext = createContext();

export function StateProvider(props) {
  const adjustments = [
    {
      carbAdjusted: 0,
      proteinAdjusted: 0,
      fatAdjusted: 0,
      caloriesAdjusted: 0,
    },
  ];
  const initialTotalsMacros = [
    {
      carb: 0,
      protein: 0,
      fat: 0,
    },
  ];
  //set remaining amt storage to be passed down to all components
  const initialRemaining = [{ Carb: 0, Protein: 0, Fat: 0 }];
  const initialRemainingOption = () => {
    if (window.localStorage.getItem("remaining") !== null) {
      return JSON.parse(window.localStorage.getItem("remaining"));
    } else {
      return JSON.stringify(initialRemaining);
    }
  };
  //set totals in localstorage
  const initialTotals = [
    {
      Carb: 0,
      Protein: 0,
      Fat: 0,
      Goal: 0,
      Weight: 0,
    },
  ];
  const initialTotalsOption = () => {
    if (window.localStorage.getItem("storedTotals") !== null) {
      return JSON.parse(window.localStorage.getItem("storedTotals"));
    } else {
      return JSON.stringify(initialTotals);
    }
  };

  //set total percentages in storage
  const initialPercentages = [
    {
      Carbpercent: 0,
      Proteinpercent: 0,
      Fatpercent: 0,
    },
  ];
  const initialPercentagesOption = () => {
    if (window.localStorage.getItem("storedPercentages") !== null) {
      return JSON.parse(window.localStorage.getItem("storedPercentages"));
    } else {
      return JSON.stringify(initialPercentages);
    }
  };
  const [isInitialLoad, setInitialLoad] = useState(true);
  const [weight, handleChange] = useFormDigitState("");
  const [goal, setGoal] = useState("");
  const [calories, handleCalculation] = useState(0);
  const [adjustedMacros, adjustMacros] = useState(adjustments);
  const [totals, setTotals] = useState(initialTotalsMacros);
  const [remaining, setRemaining] = useState(initialRemainingOption);
  const [storedTotals, setStoredTotals] = useState(initialTotalsOption);
  const [storedPercentages, setStoredPercent] = useState(
    initialPercentagesOption
  );

  const toggleGoal = (goal) => {
    switch (goal) {
      case 12:
        setGoal("Cut");
        break;
      case 15:
        setGoal("Maintain");
        break;
      case 18:
        setGoal("Bulk");
        break;
      default:
        break;
    }
  };
  //2
  const updateCal = (id) => {
    handleCalculation(Number(weight) * id);
  };

  //3
  const updateMacros = (carb, protein, fat, meals) => {
    adjustMacros([
      {
        carbAdjusted: Math.round(carb / meals),
        proteinAdjusted: Math.round(protein / meals),
        fatAdjusted: Math.round(fat / meals),
        caloriesAdjusted: Math.round(calories / meals),
      },
    ]);
  };

  //4
  const updateAll = (total, macro) => {
    if (initialTotalsMacros[0].hasOwnProperty(macro)) {
      initialTotalsMacros[0][`${macro}`] = total;
      setTotals(initialTotalsMacros);
    }
  };

  //Beginning of Storage States
  //5
  const handleMacro = (totalRemaining, macro) => {
    console.log("in remaining");
    if (initialRemaining[0].hasOwnProperty(macro)) {
      initialRemaining[0][`${macro}`] = totalRemaining;
      setRemaining(initialRemaining);
    }
  };
  useEffect(() => {
    JSON.stringify(remaining) === remaining
      ? window.localStorage.setItem("remaining", remaining)
      : window.localStorage.setItem("remaining", JSON.stringify(remaining));
  }, [remaining]);

  //6
  const handleStoredTotal = (total, macro) => {
    if (initialTotals[0].hasOwnProperty(macro)) {
      initialTotals[0][`${macro}`] = total;
      setStoredTotals(initialTotals);
    }
  };
  useEffect(() => {
    JSON.stringify(storedTotals) === storedTotals
      ? window.localStorage.setItem("storedTotals", storedTotals)
      : window.localStorage.setItem(
          "storedTotals",
          JSON.stringify(storedTotals)
        );
  }, [storedTotals]);

  //7
  const handleStoredPercent = (percent, macro) => {
    if (initialPercentages[0].hasOwnProperty(macro)) {
      initialPercentages[0][`${macro}`] = percent;
      setStoredPercent(initialPercentages);
    }
  };
  useEffect(() => {
    JSON.stringify(storedPercentages) === storedPercentages
      ? window.localStorage.setItem("storedPercentages", storedPercentages)
      : window.localStorage.setItem(
          "storedPercentages",
          JSON.stringify(storedPercentages)
        );
  }, [storedPercentages]);

  return (
    <StateContext.Provider
      value={{
        isInitialLoad,
        weight,
        calories,
        adjustedMacros,
        totals,
        remaining,
        storedTotals,
        storedPercentages,
        setInitialLoad,
        handleChange,
        toggleGoal,
        updateCal,
        updateMacros,
        updateAll,
        handleMacro,
        handleStoredTotal,
        handleStoredPercent,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
}