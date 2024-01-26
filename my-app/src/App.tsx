import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppView from "./components/AppView";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

function App() {
  return (
    <Provider store={store}>
    <GoogleOAuthProvider clientId={clientId ?? ''}>
        <AppView/>
    </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
