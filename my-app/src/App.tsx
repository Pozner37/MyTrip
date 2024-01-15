import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppView from "./components/AppView";

function App() {
  return (
    <Provider store={store}>
    <GoogleOAuthProvider clientId="my-key">
        <AppView/>
    </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
