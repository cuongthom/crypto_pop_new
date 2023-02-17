import updater from "./updater";
import { QueryClient, QueryClientProvider } from "react-query";
import AllPops from "./components/AllPops";
import Attributes from "./components/Attributes";
import BuyBox from "./components/BuyBox";
import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import BuyNftAuction from "./components/BuyNft/BuyNftAuction";
import BuyNftMarket from "./components/BuyNft/BuyNftMarket";
// import DataOnMarket from "./components/page split/dataOnmarket";
const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AllPops/" element={<AllPops />}/>
          <Route path="/BuyBox" element={<BuyBox />} />
          <Route path="/Attributes" element={<Attributes />} />
          <Route path={"/BuyNftAuction/:idParams"} element={<BuyNftAuction />} />
          <Route path={"/BuyNftMarket/:idParams"} element={<BuyNftMarket />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>

    // <QueryClientProvider client={queryClient}>
    //   <button onClick={isActive ? deActivate : activate}>
    //     {isActive ? connection.address : "Connect"}
    //   </button>
    //   {isActive && (
    //     <UserNFT/>
    //   )}
    //   <Divider/>
    //   <Market/>
    //   <Toaster/>
    // </QueryClientProvider>
  );
}

export default updater(App);
