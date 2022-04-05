import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import useHttp from "../hooks/use-http";

const MealContext = createContext({
  dummyMeals: { id: "", title: "", amount: 0, description: "", price: 0 },
  viewCart: null,
  orderFormDisplay: false,
  mealFormDisplay: false,
  cartList: [{}],
  cartControl: () => {},
  updateCartList: () => {},
  emptyCartList: () => {},
  updateMealsAmount: () => {},
  showOrderForm: () => {},
  updateMeals: () => {},
  showMealForm: () => {},
});

export default MealContext;

export const MealContextProvider = (props) => {
  const [viewCart, setViewCart] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [dummyMeals, setdummyMeals] = useState([]);
  const [orderFormDisplay, setOrderFormDisplay] = useState(false);
  const [mealFormDisplay, setMealFormDisplay] = useState(false);

  const [isLoading, error, getMealsRequest] = useHttp();
  const request = useMemo(() => {
    return {
      url: "https://react-meals-de9d8-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
  }, []);

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

  const emptyLists = () => {
    setCartList([]);
    setdummyMeals((prev) =>
      prev.map((o) => {
        return { ...o, amount: 1 };
      })
    );
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

  const updateMeals = (newMeal) => {
    setdummyMeals((prev) => [...prev, { ...newMeal }]);
  };

  const showOrderForm = () => {
    setViewCart(false);
    setMealFormDisplay(false);
    setOrderFormDisplay((prev) => !prev);
  };

  const showMealForm = () => {
    setViewCart(false);
    setOrderFormDisplay(false);
    setMealFormDisplay((prev) => !prev);
  };

  const fetchMeals = useCallback((data) => {
    for (const key in data) {
      const fetchedData = {
        id: key,
        title: data[key].title,
        description: data[key].description,
        price: data[key].price,
        amount: data[key].amount,
      };
      updateMeals(fetchedData);
    }
  }, []);

  useEffect(() => {
    getMealsRequest(request, fetchMeals);
  }, [request, fetchMeals, getMealsRequest]);

  return (
    <MealContext.Provider
      value={{
        dummyMeals,
        viewCart,
        cartList,
        orderFormDisplay,
        mealFormDisplay,
        updateMealsAmount,
        updateCartList,
        emptyLists,
        cartControl,
        showOrderForm,
        updateMeals,
        showMealForm,
        isLoading,
        error,
      }}
    >
      {props.children}
    </MealContext.Provider>
  );
};
