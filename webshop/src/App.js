import { Route, Routes } from "react-router-dom";

import "./App.css";
import AdminHome from "./pages/admin/AdminHome";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import MaintainCategories from "./pages/admin/MaintainCategories";
import MaintainProducts from "./pages/admin/MaintainProducts";
import MaintainShops from "./pages/admin/MaintainShops";
import HomePage from "./pages/global/HomePage";
import Cart from "./pages/global/Cart";
import { ContactUs } from "./pages/global/ContactUs";
import Shops from "./pages/global/Shops";
import SingleProduct from "./pages/global/SingleProduct";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import NotFound from "./pages/global/NotFound";
import NavigationBar from "./components/NavigationBar";

function App() {

  return (
    <div className="App">
      <NavigationBar />

      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="cart" element={<Cart  />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="shops" element={<Shops />} />
        <Route path="product/:productId" element={<SingleProduct />} />
        <Route path="admin" element={<AdminHome />} />
        <Route path="admin/add-product" element={<AddProduct />} />
        <Route path="admin/edit-product/:productId" element={<EditProduct />} />
        <Route path="admin/maintain-categories" element={<MaintainCategories />} />
        <Route path="admin/maintain-products" element={<MaintainProducts />} />
        <Route path="admin/maintain-shops" element={<MaintainShops />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </div>
  );
}

export default App;

// 1. Muuta favicon + nimi
// 2. Muuta font
// 3. Panna Firebase-i üles

// Neljapäev 17.08: 9.00-12.15
// Tõlge: i18next   react-i18next
// Kujundus: bootstrap   react-bootstrap
// Võtame hunniku tooteid ja kuvame välja    ebay'st

// E, K
// 1. HomePages sorteerimine ja filtreerimine
// 2. MaintainProductsis kustutamine (refreshiga tulevad tagasi)
// 3. AddProduct lisamine
// 4. SingleProduct ühe toote vaatamine
// 5a. HomePages võimaldada ostukorvi lisada
// 5b. Cart.js lehel võimaldada ostukorvi sisu vaadata
//      ostukorvist kustutada, ostukorvi tühjendada, ostukorvi kogusummat vaadata
//      dünaamiline väljakuvamine (tühjendamine ja kogusumma peita kui tühi)
//              kui tühi, siis öelda, et on tühi
// 6. Mõnele kodusele projektile (nt uudised) peale ka tõlge ja Bootstrap
//          praegu on lihtsasti meelde tuletatav
//          2-3 kuu pärast on vaja uuesti teha
//          1h-2h et see peale panna kui on juba korra oma peaga läbi tehtud
// 7. React-toastify peale: kustutades, uut toodet lisades, ostukorvi lisades


// 1. 3-4s keel, chatgpt/openai alusel tõlkida
// 2. AddProducts.js - ID unikaalsuse kontroll

// 23.08:
// Poed: Leaflet
// Kontaktivorm: EmailJS
// Ostukorvis salvestamise localStorage

// 28.08
// Ostukorvis kogused
// Ostukorvis kujundus
// Pakiautomaatide võtmine

// 31.08
// Andmebaas  --> failid, kuidas andmebaasi panna

// 04.09
// Makse - EveryPay
// Kujundus - HomePage kui MaintainProducts
// CSS moodulid
// Loader
//--> kodus: Nortali proovitöö
//        Java(back-end) + Angular(front-end)
//        täpselt identselt üle Reacti

// 06.09  14. kohtumine
// Korra uurin Nortali proovitöö osas
// Kustutamine
// Editimise anomaalia

// Karusell-galerii Bootstrapist
// CSS moodulite jätk
// Komponendid

// 11.09  15.kohtumine
// Vaatame koos Nortali proovitöö üle
// FilterButtons KODUS, koos teeme Producti
// Context ---> ostukorvi summas navigationBaris
// Sisselogimise ja registreerumise juurde

// 14.09  16.kohtumine
// Vaatame FE proovitööd
// Sisselogimise-registreerumise jätk

// 20.09 - uuendame koos kuupäeva, sest nii kiiresti ei jõua proovitööd valmis
// Tic-tac toe proovitöö

// 27.09 - 10.00-11.30
// Trinidad Wiseman proovitöö 10.00-11.30

// 04.10  18.kohtumine 10.00-11.30
