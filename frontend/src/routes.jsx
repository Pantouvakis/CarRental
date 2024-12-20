import { Home, Profile, SignIn, SignUp } from "@/pages";

export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
    hidden: true
    },
  {
    name: "profile",
    path: "/profile",
      element: <Profile />,
      hidden: true
  },
  {
    name: "Sign In",
    path: "/sign-in",
      element: <SignIn />,
      hidden: true
  },
  {
    name: "Sign Up",
    path: "/sign-up",
      element: <SignUp />,
      hidden: true
  },
  {
    name: "Docs",
    href: "https://www.material-tailwind.com/docs/react/installation",
    target: "_blank",
      element: "",
      hidden: true
  },
];

export default routes;
