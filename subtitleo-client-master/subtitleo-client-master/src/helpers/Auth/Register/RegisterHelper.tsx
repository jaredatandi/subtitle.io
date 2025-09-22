import useDispatch from "app/TypedUseDispatch";
import { signUp } from "app/features/auth/AuthSlice";
import { RootState } from "app/store";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import schema from "./schema";
import { toast } from "react-toastify";
import React from "react";
import { toggleLoading } from "app/features/effects/effectsSlice";
import useSessionStorage from "utils/sessionStorage";

const useRegisterHelper = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const { setSessionStorageItem, navigate, getSessionStorageItem } =
    useSessionStorage();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(
        signUp({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      );
    },
  });

  console.log(auth);

  //Loading & Success Case
  React.useEffect(() => {
    if (auth.provider === "register") {
      if (auth.loading) {
        dispatch(toggleLoading());
      }
      if (auth.user) {
        setSessionStorageItem("user", JSON.stringify(auth.user));
        setSessionStorageItem("token", auth.token);
        toast.success("Welcome, Happy Subtitling with SubtitleO.");
        dispatch(toggleLoading());
        if (getSessionStorageItem("token")) {
          (window as Window).location = "/dashboard/projects/create";
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, dispatch, navigate]);

  // Error Case
  React.useEffect(() => {
    if (auth.provider === "register") {
      if (auth.error && !auth.loading) {
        toast.error(
          `${auth.errorMessage}` ||
            "There was an error signing up! Try again later."
        );
        dispatch(toggleLoading());
      }
    }
  }, [auth.error, auth.errorMessage, auth.loading, dispatch, auth.provider]);
  return {
    formik,
    handleSubmit: formik.handleSubmit,
    isLoading: auth.loading,
    isError: auth.error,
    errorMessage: auth.errorMessage,
  };
};

export default useRegisterHelper;
