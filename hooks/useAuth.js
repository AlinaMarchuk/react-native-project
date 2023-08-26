import { useSelector } from "react-redux";

const useAuth = () => {
  const user = useSelector((state) => state.user);
  if (user) {
    return {
      isAuth: true,
      email: user.email,
    };
  }
  return {
    isAuth: false,
    email: null,
  };
};

export default useAuth;
