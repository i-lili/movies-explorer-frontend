import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children, loggedIn }) {
  const navigate = useNavigate();

  // Эффект для проверки логина пользователя и перенаправления
  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  // Отображение children (компонентов, доступных в защищенном роуте), если пользователь авторизован, иначе возвращение null
  return loggedIn ? children : null;
}

export default ProtectedRoute;
