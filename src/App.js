import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store/store'
import MainRouter from './MainRouter'
import 'bootstrap/dist/js/bootstrap.bundle';
function App() {
  useEffect(() => {
    console.log("process.env.REACT_APP_API_URL:",process.env.REACT_APP_API_URL)
    window.addEventListener('unhandledrejection', (event) => {
      event.preventDefault();
      console.error('Unhandled Promise Rejection:', event.reason);
    });
  }, []);
  return (
    <div className="App">
      <Provider store={store}>
        <MainRouter />
      </Provider>
    </div>
  )
}
export default App

