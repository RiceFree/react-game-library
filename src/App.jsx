import FavoritesProvider from "./context/FavoritesProvider";
import SessionProvider from "./context/SessionProvider";
import Routing from "./routes/Routing";

function App() {

  return (
    <>
      <SessionProvider>
        <FavoritesProvider>
          <Routing />
        </FavoritesProvider>
      </SessionProvider>
    </>
  )
}

export default App
