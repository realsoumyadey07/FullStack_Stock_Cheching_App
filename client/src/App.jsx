import { Toaster } from "react-hot-toast";
import Navigation from "./Navigation/Navigation.jsx";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Navigation />
    </>
  );
}

export default App;
