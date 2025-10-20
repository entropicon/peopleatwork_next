const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://entropicon-test-backend-036a4d9733b7.herokuapp.com";
export default BASE_URL;
export const FRONT_URL = process.env.NEXT_PUBLIC_FRONT_URL;

// ACCOUNTS
export const INDUSTRIES = `${BASE_URL}/accounts/industries`;
export const COMPANIES = `${BASE_URL}/accounts/companies`;
export const COMPANY = `${BASE_URL}/accounts/company/`;
export const COMPANIESFORAUTOCOMPLETE = `${BASE_URL}/accounts/companies-for-autocomplete`;
export const COMPANY_IMAGES = `${BASE_URL}/accounts/company-images/`;
export const COMPANY_TEAM = `${BASE_URL}/accounts/company-team`;
export const LANGUAGES = `${BASE_URL}/accounts/language/`;

//JOBS
export const HOME_PAGE = `${BASE_URL}/jobs/home-page`;
export const COMPANY_JOBS_FOR_FILTER = `${BASE_URL}/jobs/company-jobs-for-filter`;
export const JOBS = `${BASE_URL}/jobs/jobs`;
export const JOB_DETAILS = `${BASE_URL}/jobs/job/`;
export const EMPLOYMENTTYPE = `${BASE_URL}/jobs/employmenttype`;
export const JOBCATEGORY = `${BASE_URL}/jobs/jobcategory`;
export const SIMILAR_JOBS = `${BASE_URL}/jobs/similar-jobs/`;
export const MYJOBS = `${BASE_URL}/jobs/job/`;
export const BENEFITS = `${BASE_URL}/jobs/benefits`;
export const SKILLS = `${BASE_URL}/jobs/skills`;
export const JOB_REQUIREMENTS = `${BASE_URL}/jobs/job-requirements/`;

// PAYMENT

export const CREATE_PAYMENT = `${BASE_URL}/payment/create/`;
