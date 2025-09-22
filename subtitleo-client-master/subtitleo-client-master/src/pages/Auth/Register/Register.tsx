import { Grid } from "@mui/material";
import MainLogoDark from "assets/images/svg_based/MainLogoDark";
import SignUpImage from "assets/images/svg_based/SignUpImage";
import StandardButton from "components/shared/Buttons/StandardButton";
import StandardInputWithLabel from "components/shared/Inputs/StandardInputWithLabel";
import ErrorText from "components/shared/Typographies/ErrorText";
import useGoogleLoginHelper from "helpers/Auth/Google/GoogleLoginHelper";
import useRegisterHelper from "helpers/Auth/Register/RegisterHelper";
import AuthLayout from "layout/AuthLayout";
import { Link } from "react-router-dom";
import google_icon from "assets/icons/Google.png";
import { Helmet } from "react-helmet";
import MainLogoLight from "assets/images/svg_based/MainLogoWhite";


const Register = () => {
  const { formik, handleSubmit } = useRegisterHelper();
  const { authViaGoogle } = useGoogleLoginHelper();
  return (
    <AuthLayout vector={<SignUpImage height={700} width={700} />}>
      <Helmet>
        <title>Sign Up - SubtitleO</title>
      </Helmet>
      <Grid
        container
        className="text-center flex flex-col items-center justify-center"
      >
        <Grid item xs={12} sm={12} md={12}>
          <h1 className="flex items-center justify-center mb-4 sm:flex-col">
            <span className="text-primary font-rhd font-semibold leading-[63.5px] text-5xl sm:text-2xl lg:text-3xl dark:text-white">
              Sign up for{" "}
            </span>
            <div className="relative dark:hidden"><MainLogoDark /></div>
            <div  className="relative hidden dark:block"><MainLogoLight /></div>
          </h1>
        </Grid>
        <Grid item xs={12} sm={12} md={10}>
          <StandardInputWithLabel
            id="name"
            name="name"
            label="Full Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Enter your full name."
          />
          {formik.touched.name && formik.errors.name && (
            <ErrorText text={formik.errors.name} />
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={10}>
          <StandardInputWithLabel
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Enter your email."
          />
          {formik.touched.email && formik.errors.email && (
            <ErrorText text={formik.errors.email} />
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={10}>
          <StandardInputWithLabel
            id="password"
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            isPassword
            placeholder="Enter your password."
          />
          {formik.touched.password && formik.errors.password && (
            <ErrorText text={formik.errors.password} />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={10}
          className="flex items-center justify-center py-4"
        >
          <StandardButton text="Sign Up" onClick={handleSubmit} />
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={10}
          className="flex items-center justify-center py-4 !flex-col space-y-6"
        >
          <div className="text-[#7B7B7B] font-sora font-semibold text-2xl dark:text-white">
            or
          </div>

          <div
            className="flex items-center space-x-2 border-[1.4px] border-[#D2D2D2] py-[6px] px-[18px] rounded-lg cursor-pointer"
            onClick={authViaGoogle}
          >
            <img src={google_icon} alt="google icon" />
            <span className="font-sora text-[#7B7B7B] font-semibold text-[18px] sm:text-[12px] lg:text-[17px] md:text-[14px] dark:text-white">
              Sign up with Google
            </span>
          </div>
          <p className="text-lg sm:text-sm font-sora font-normal leading-[22.68px] text-[#7B7B7B] dark:text-white">
            By signing in you accept our{" "}
            <Link to="/" className="text-primary underline font-semibold">
              terms and conditions.
            </Link>
          </p>
          <p className="text-lg sm:text-sm  font-sora font-normal leading-[22.68px] text-[#7B7B7B] dark:text-white">
            Already have an account?{" "}
            <Link to="/" className="text-primary underline font-semibold">
              Log In
            </Link>
          </p>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};

export default Register;
