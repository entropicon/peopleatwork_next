import { FormikErrors, FormikTouched } from "formik";

export const getLocalizedName = (
  obj: { name_en: string; name_az: string; name_ru: string } | undefined,
  lang: string
): string => {
  if (!obj) return "";
  return obj[`name_${lang}` as "name_en" | "name_az" | "name_ru"] || "";
};

export const screenPadding = {
  xs: "2%",
  s: "4%",
  md: "6%",
}

export function detectCardType(digits: string): "visa" | "mastercard" | undefined {
  if (!digits) return undefined;
  if (digits.startsWith("4")) return "visa";
  const firstTwo = parseInt(digits.slice(0, 2));
  const firstFour = parseInt(digits.slice(0, 4));
  if (
    (firstTwo >= 51 && firstTwo <= 55) ||
    (firstFour >= 2221 && firstFour <= 2720)
  ) {
    return "mastercard";
  }
  return undefined;
}

export function luhnValid(digits: string): boolean {
  if (digits.length !== 16) return false;
  let sum = 0;
  for (let i = 0; i < 16; i++) {
    let n = parseInt(digits[15 - i], 10);
    if (i % 2 === 1) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
  }
  return sum % 10 === 0;
}

export const dedectError = <T>(formik: { errors: FormikErrors<T>; touched: FormikTouched<T> }, field: keyof T) => {
  return formik.errors[field] && formik.touched[field] ? formik.errors[field] : null;
};

export const jobDetailsPaperStyles={
  borderRadius: 3,
  border: "1px solid rgba(15, 23, 42, 0.08)",
  backgroundColor: "var(--white)",
  boxShadow:
    "0 12px 30px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
  p: { xs: 2.5, md: 3 },
}