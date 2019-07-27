import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
import rootReducer from '../reducers';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(require('redux-logger').createLogger());
}

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares)
  // other store enhancers if any
);

const persistConfig = {
  key: 'root',
  storage
};

export default function configStore() {
  const store = createStore(persistReducer(persistConfig, rootReducer), enhancer);
  const persistor = persistStore(store);
  return { persistor, store };
}
