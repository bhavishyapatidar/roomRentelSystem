import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./routes/homePage/homePage";
import ListPage from "./routes/listPage/listPage";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import About from "./routes/aboutPage/AboutPage.jsx";
import { Layout, RequireAuth } from "./routes/layout/layout";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";
import ContactPage from "./routes/contactPage/ContactPage.jsx";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: ":id",
          element: <SinglePage />,
          loader: singlePageLoader,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "contact",
          element: <ContactPage />, // Add route for contact page
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />, // Protect profile and post routes
      children: [
        {
          path: "profile",
          element: <ProfilePage />,
          loader: profilePageLoader,
        },
        {
          path: "profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "add",
          element: <NewPostPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
