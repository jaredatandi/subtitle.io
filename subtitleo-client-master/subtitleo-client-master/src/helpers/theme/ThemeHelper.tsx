import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "app/features/theme/ThemeSlice";
import { RootState } from "app/store";

const useThemeHelper = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("class", theme);
  }, [theme]);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return {
    handleThemeToggle,
  };
};

export default useThemeHelper;
