import {
  Navigate,
  NavLink,
  Outlet,
  useParams,
  useRoutes,
} from "react-router-dom";

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "users",
      element: <UserLoyout />,
      children: [
        { index: true, element: <UserListPage /> },
        {
          path: ":userId",
          element: <Outlet />,
          children: [
            {
              path: "profile",
              element: <UserProfilePage />,
            },
            {
              path: "edit",
              element: <UserEditPage />,
            },
            { index: true, element: <Navigate to="./profile" /> },
            {
              path: "*",
              element: <Navigate to="../profile" />,
            },
          ],
        },
      ],
    },
    { path: "*", element: <Navigate to="/" /> },
  ]);
  return (
    <div className="App">
      <h1>APP страница</h1>;<NavLink to="/users">Лист Пользователей</NavLink>
      {routes}
    </div>
  );
}

function MainPage() {
  return <h1>Главная страница</h1>;
}
function UserLoyout() {
  return (
    <div>
      <NavLink to="/"> Главная </NavLink>
      <Outlet />
    </div>
  );
}
function UserProfilePage() {
  const { userId } = useParams();
  return (
    <div>
      <h1>Страница пользователя</h1>
      <div>
        <NavLink to="/users">Список пользователей</NavLink>
      </div>
      <div>
        {" "}
        <NavLink to={`/users/${userId}/edit`}>
          Редактировать пользователя
        </NavLink>
      </div>

      <p>Пользователь: {userId}</p>
    </div>
  );
}

function UserEditPage() {
  const { userId } = useParams();
  return (
    <div>
      <h1>Страница редактирования Пользователя</h1>;
      <ul>
        <li>
          <NavLink to={"/users/" + userId}>Страница пользователя</NavLink>
        </li>
        <li>
          <NavLink to={"/users/" + (+userId + 1)}>
            Редактировать след. пользователя
          </NavLink>
        </li>
        <li>
          <NavLink to={"/users"}>Список пользователей</NavLink>
        </li>
      </ul>
    </div>
  );
}
function UserListPage() {
  return (
    <div>
      <h1>Список пользователей</h1>
      <ul>
        {new Array(5).fill("").map((_, index) => (
          <li key={"user_component" + index}>
            <NavLink to={index + "/profile"}>Пользователь {index}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
