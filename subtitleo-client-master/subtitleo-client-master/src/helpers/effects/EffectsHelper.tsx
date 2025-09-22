import { RootState } from "app/store";
import { useSelector } from "react-redux";

const useEffectsHelper = () => {
  const isLoading = useSelector((state: RootState) => state.effects.isLoading);

  return { isLoading };
};

export default useEffectsHelper;
