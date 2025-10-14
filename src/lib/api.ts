import { BENEFITS, COMPANIES, COMPANY, EMPLOYMENTTYPE, HOME_PAGE, INDUSTRIES, JOB_DETAILS, JOB_REQUIREMENTS, JOBCATEGORY, JOBS, SIMILAR_JOBS, SKILLS } from "@/constants/apiRoutes";
import { JobQueryParams, JobRequirementsProps } from "@/types/types";
import axios from "axios";

export const getCompanies = async (page: number, search: string, industryArray: string[], sort: string) => {
  try {
    const response = await axios.get(
      COMPANIES +
      `?page=${page}` +
      (search ? `&query=${search}` : "") +
      (industryArray.length ? `&industry=${industryArray.join(",")}` : "") +
      `&sort=${sort}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getIndustries = async () => {
  try {
    const response = await axios.get(INDUSTRIES);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getCompanyById = async (id: string) => {
  try {
    const response = await axios.get(COMPANY + id);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getHomePageData = async () => {
  const response = await axios.get(HOME_PAGE);
  return response.data;
};

export const getEmploymentTypes = async () => {
  const response = await axios.get(EMPLOYMENTTYPE);
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(JOBCATEGORY);
  return response.data;
};

export const getJobs = async ({
  page = 1,
  sort = '',
  query = '',
  employment_type = '',
  category = '',
  job_level = '',
}: JobQueryParams) => {
  const response = await axios.get(JOBS, {
    params: {
      sort,
      page,
      query,
      employment_type,
      category,
      job_level,
    },
  });

  return response.data;
};


export async function getJobById(id: string) {
  const res = await axios.get(`${JOB_DETAILS}${id}`);
  if (res.status === 404) {
    return null;
  }
  if (res.status !== 200) {
    throw new Error('Network response was not ok');
  }
  const data = await res.data;
  return data;
}

export const fetchRequirements = async (jobId?: string): Promise<JobRequirementsProps[]> => {
  if (!jobId) return [];

  const response = await axios.get(JOB_REQUIREMENTS + jobId);
  return response.data;
};


export const getSimilarJobs = async (id: string) => {
  try {
    const response = await axios.get(SIMILAR_JOBS + id);
    return response.data;
  } catch (e) {
    console.error(e);
    return []
  }
};

export const getBenefits = async () => {
  const response = await axios.get(BENEFITS)
  return response.data;
}

export const getSkills = async () => {
  const response = await axios.get(SKILLS);
  return response.data;
}