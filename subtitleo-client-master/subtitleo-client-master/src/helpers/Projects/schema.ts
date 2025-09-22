import * as yup from "yup";
export const updateProjectNameSchema = yup.object({
  newProjectName: yup
    .string()
    .required("Please write a new name for your project!"),
});
