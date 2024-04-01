import "./App.css";
import IndexPage from "./pages/IndexPage.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import Layout from "./pages/Layout.js";
import CreatePost from "./pages/CreatePost.js";
import { UserContextProvider } from "./pages/UserContext.js";
import { Route, Routes } from "react-router-dom";
import PostPage from "./pages/PostPage.js";
import EditPost from "./pages/EditPost.js";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/create"} element={<CreatePost />} />
          <Route path={"/Register"} element={<RegisterPage />} />
          <Route path={"/Post/:id"} element={<PostPage />} />
          <Route path={"/edit/:id"} element={<EditPost/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
