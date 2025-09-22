import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import useDispatch from "app/TypedUseDispatch";
import { RootState } from "app/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import React from "react";
import { toggleLoading } from "app/features/effects/effectsSlice";
import useSessionStorage from "utils/sessionStorage";
import { loginWithGoogle } from "app/features/auth/AuthSlice";
import { auth } from "../../../firebase";

const useGoogleLoginHelper = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const { setSessionStorageItem, navigate, getSessionStorageItem } =
    useSessionStorage();
  const dispatch = useDispatch();

  const provider = new GoogleAuthProvider();

  const authViaGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const user: any = result.user;
    dispatch(
      loginWithGoogle({
        googleAccessToken: user.accessToken,
        name: user.displayName,
        email: user.email,
      })
    );
  };

  //Loading & Success Case
  React.useEffect(() => {
    if (authState.provider === "google") {
      if (authState.loading) {
        dispatch(toggleLoading());
      }
      if (authState.user) {
        setSessionStorageItem("user", JSON.stringify(authState.user));
        setSessionStorageItem("token", authState.token);
        toast.success("Welcome, Happy Subtitling with SubtitleO.");
        dispatch(toggleLoading());
        if (getSessionStorageItem("token")) {
          (window as Window).location = "/dashboard/projects/create";
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState, dispatch, navigate]);

  // Error Case
  React.useEffect(() => {
    if (authState.provider === "google") {
      if (authState.error && !authState.loading) {
        toast.error(
          `${authState.errorMessage}` ||
            "There was an error logging in. Try again later."
        );
        dispatch(toggleLoading());
      }
    }
  }, [
    authState.error,
    authState.errorMessage,
    authState.loading,
    dispatch,
    authState.provider,
  ]);

  return {
    authViaGoogle,
  };
};

export default useGoogleLoginHelper;
