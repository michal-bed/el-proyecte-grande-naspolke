// @mui material components
import Icon from "@mui/material/Icon";

// website components
import SignInBasic from "./componentsInUse/login/index";
import Cockpit from "./componentsInUse/userPage/cockpit";
import useAuth from "./hooks/useAuth";
import RegistrationBasic from "./componentsInUse/registration";


function Routes(){

    let userRoutes = []
    const auth = useAuth()
    const obj = auth[Object.keys(auth)[0]]
  console.log(obj)
    const objArr = Object.values(obj)
    if (auth.user === "nie wybrano" || auth.user === "") {
      userRoutes =
        {
          name: "Konto",
          collapse: [
            {
              name: "Logowanie",
              route: "/login",
              component: <SignInBasic/>
            },
            {
              name: "Rejestracja",
              route: "/register",
              component: <RegistrationBasic/>
            },
          ],
        }

    }

    else {
      userRoutes =
        {
          name: "Konto",
          collapse: [
            {
              name : `Zalogowany jako: ${auth.user}`,
              textTransform: 'none'
            },
            {
              name: "Kokpit",
              description: `Zalogowany jako ${auth.user}`,
              route: "/userpanel",
              component: <Cockpit/>
            },
            {
              name: "Wyloguj",
              route: "/logout",
              component: <SignInBasic/>
            }
          ],
        }
    }


  return [
    {
      name: "Użytkownik",
      icon: <Icon>account_circle</Icon>,
      columns: 1,
      rowsPerColumn: 3,
      collapse: [userRoutes]
    },
    {
      name: "Informacje",
      icon: <Icon>help</Icon>,
      collapse: [
        {
          name: "O nas",
          href: "/#o_nas",

        },
        {
          name: "Usługi",
          href: "/#uslugi",
        },
        {
          name: "Oferta",
          href: "/#oferta",
        },
        {
          name: "Cennik",
          href: "/#cennik"
        },
        {
          name: "Dodaj spółkę",
          href: "/add-company",
        },
        {
          name: "FAQ",
          route: "/faq",
        },
        {
          name: "Regulamin",
          route: "/statute",
        },
      ],
    },
  ];
}


export default Routes
