import { createContext, useState } from "react";

// const addMealsHandler = (meal) => {};

const dummyData = [
  {
    id: "m1",
    amount: 0,
    description: "French Dish",
    title: "Scnitzel",
    price: 9.5,
  },
  {
    id: "m2",
    amount: 0,
    description: "Indian Dish",
    title: "McMaharaj",
    price: 11.99,
  },
  {
    id: "m3",
    amount: 0,
    description: "American Dish",
    title: "Barbeque Burger",
    price: 16.5,
  },
  {
    id: "m4",
    amount: 0,
    description: "Japanese Dish",
    title: "Sushi",
    price: 22.99,
  },
];

const MealContext = createContext({
  dummyMeals: dummyData,
  viewCart: null,
  cartList: [{}],
  cartControl: () => {},
  updateCartList: () => {},
  updateMealsAmount: () => {},
});

export default MealContext;

export const MealContextProvider = (props) => {
  const [viewCart, setViewCart] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [dummyMeals, setdummyMeals] = useState(dummyData);

  const cartControl = () => {
    setViewCart((prev) => !prev);
  };

  const updateCartList = (newOrder, cartIncDecFlag = false) => {
    setCartList((prev) => {
      let curInfo = null;
      const intermediate = prev.filter((o, i) => {
        if (o.id !== newOrder.id) {
          return true;
        }
        curInfo = prev[i];
        return false;
      });
      if (newOrder.amount > 0) intermediate.unshift(newOrder);
      //increement logic
      if (!cartIncDecFlag && curInfo && intermediate.length > 0)
        intermediate[0].amount += curInfo.amount;
      return intermediate;
    });
  };

  const updateMealsAmount = (meal, amount) => {
    setdummyMeals((prev) => {
      return prev.map((o) => {
        if (o.id === meal.id) {
          o.amount = amount;
        }
        return o;
      });
    });
  };

  return (
    <MealContext.Provider
      value={{
        dummyMeals,
        viewCart,
        cartList,
        updateMealsAmount,
        updateCartList,
        cartControl,
      }}
    >
      {props.children}
    </MealContext.Provider>
  );
};
