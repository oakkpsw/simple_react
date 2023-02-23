import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootReducer from "./reducers/index";

//thunk setup
import thunk from "redux-thunk";
import DevTools from "./DevTools";

const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(thunk),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument()
);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartReducer"], // ให้เก็บเฉพาะอะไรบ้าง
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  let store = createStore(persistedReducer, enhancer);
  let persistor = persistStore(store);
  return { store, persistor };
};
export default configureStore;
