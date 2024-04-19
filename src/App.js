import Chat from "./pages/Chat";
import { SocketContext, socket } from "./context/socket";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <CookiesProvider>
        <SocketContext.Provider value={socket}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </SocketContext.Provider>
      </CookiesProvider>
    </Router>
  );
}

export default App;
