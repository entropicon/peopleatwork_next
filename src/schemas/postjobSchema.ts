import * as Yup from "yup";

const postJobSchema = Yup.object({
  title: Yup.string().required("form.error.required"),
  owner_email: Yup.string()
    .email("form.error.invalidEmail")
    .required("form.error.required"),
  min_salary: Yup.number()
    .typeError("form.error.mustBeNumber")
    .min(0, "form.error.cantBeNegative")
    .required("form.error.required"),
  max_salary: Yup.number()
    .typeError("form.error.mustBeNumber")
    .min(0, "form.error.cantBeNegative")
    .required("form.error.required")
    .test(
      "max-greater-than-min",
      "form.error.maxGreaterThanMin",
      function (value) {
        const { min_salary } = this.parent as { min_salary?: number };
        if (value == null || min_salary == null) return true;
        return Number(value) >= Number(min_salary);
      }
    ),
  currency: Yup.string().required("form.error.required"),
  description: Yup.string().required("form.error.required"),
  responsibilities: Yup.string().notRequired(),
  who_you_are: Yup.string().notRequired(),
  nice_to_have: Yup.string().notRequired(),
  skills: Yup.array().of(Yup.string()).required("form.error.required"),
  benefits: Yup.array().of(Yup.string()).required("form.error.required"),
  experience: Yup.string().notRequired(),
  education: Yup.string().notRequired(),
  openings: Yup.number()
    .typeError("form.error.mustBeNumber")
    .min(1, "form.error.atLeastOne")
    .required("form.error.required"),
  is_company_confidential: Yup.boolean().required(),
  owner_name: Yup.string().required("form.error.required"),
  owner_phone_number: Yup.string().notRequired(),
  job_level: Yup.string().required("form.error.required"),
  key_objectives: Yup.string().notRequired(),
  measurable_outcomes: Yup.string().notRequired(),
  certification: Yup.string().notRequired(),
  industry_specific_knowledge: Yup.string().notRequired(),
  employment_type: Yup.string().required("form.error.required"),
  category: Yup.string().required("form.error.required"),
  is_salary_hidden: Yup.boolean().required(),
});

export default postJobSchema;