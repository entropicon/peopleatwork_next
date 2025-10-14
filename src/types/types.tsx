export interface Company {
	skills: Array<{
		id: string;
		name_en: string;
		name_az: string;
		name_ru: string;
	}>;
	headline: string;
	id: string;
	profile_picture: string;
	cover_picture: string;
	date_of_birth: string;
	first_name: string;
	last_name: string;
	gender: string;
	bio: string;
	applicants: number;
	name: string;
	logo: string;
	industry: {
		id: string;
		name_en: string;
		name_az: string;
		name_ru: string;
	};
	employee_count: string;
	founded: string;
	position: string;
	description: string;
	contact: {
		email: string;
		phone: string;
		address: string;
		location: string;
		website: string;
		twitter: string;
		facebook: string;
		linkedin: string;
		instagram: string;
	};
	cv: string;
	jobs: number;
}

export interface Industry {
	id: number | string;
	name_en?: string;
	name_az?: string;
	name_ru?: string;
	count?: number;
	code?: string;
}
export interface JobCardProps {
	deadline: string;
	is_guest_job: boolean;
	id: number;
	description: string;
	owner: {
		logo: string;
		name: string;
		location: string;
	};
	employment_type: {
		color: string;
		name_en: string;
		name_az: string;
		name_ru: string;
	};
	title: string;
	category: {
		name_en: string;
		name_az: string;
		name_ru: string;
	};
	applicants: number;
	applied: boolean;
	openings: number;
	hired: number;
	is_company_confidential: boolean;
	min_salary: number;
	max_salary: number;
	currency: string;
	post_date: {
		time: string;
		ago: string;
	};
}

type IdValue = number | "";

export interface JobPostFormValues {
	title: string;
	employment_type: IdValue;
	category: IdValue;
	job_level: string;
	min_salary: number | "";
	max_salary: number | "";
	currency: string;
	is_salary_hidden: boolean;
	description: string;
	responsibilities: string;
	who_you_are: string;
	nice_to_have: string;
	key_objectives: string;
	measurable_outcomes: string;
	certification: string;
	industry_spesific_knowledge: string;
	skills: string[];
	benefits: string[];
	experience: string;
	education: string;
	openings: number | "";
	is_company_confidential: boolean;
	owner_name: string;
	owner_email: string;
	owner_phone_number: string;
}
export interface JobQueryParams {
	page?: number;
	sort?: string;
	query?: string;
	employment_type?: string;
	category?: string;
	job_level?: string;
}

export interface JobRequirementsProps {
	id: string;
	requirement: string;
	request: {
		id: string;
		option: string;
		price: string;
	};
	options: {
		id: string;
		option: string;
		price: string;
	}[];
}

export interface StandartType {
	id: number;
	name_en: string;
	name_az: string;
	name_ru: string;
}

export interface Category {
	id: number;
	name_en: string;
	name_az: string;
	name_ru: string;
	count: number;
}

export interface EmployeesTypes {
	id: string;
	department?: string;
	division?: string;
	sub_division?: string;
	position: string;
	full_name: string;
	public_profile: boolean;
	applicant_profile: boolean;
	employee_profile: boolean;
	employment_status: string;
	hire_date: Date;
	sign_off_date: Date;
	is_active: boolean;
}

export interface ConstantsProps {
	id: string;
	name_en: string;
	name_az: string;
	name_ru: string;
	color?: string;
}

export interface JobOwner {
	logo: string;
	name: string;
	description: string;
	id: number;
}
export interface Job {
	is_guest?: boolean;
	title: string;
	category: ConstantsProps;
	experience: string;
	key_objectives: string;
	measurable_outcomes: string;
	industry_spesific_knowledge: string;
	education: string;
	certification: string;
	employment_type: ConstantsProps;
	status: boolean;
	is_public: boolean;
	description: string;
	responsibilities: string;
	who_you_are: string;
	nice_to_have: string;
	benefits: Array<ConstantsProps>;
	post_date: string;
	deadline: string;
	salary: string;
	currency: string;
	skills: Array<ConstantsProps>;
	id: string;
	job_level: number;
	owner: JobOwner;
	applied: boolean;
	applicants: number;
	is_salary_hidden: boolean;
	hitcount: {
		hits: number;
		last_day_hits: number;
		last_day_increase_percentage: number;
		status: string;
		last_7_days_array: Array<number>;
	};
	is_active: boolean;
	is_company_confidential: boolean;
}

export interface MemberCardProps {
	id: string;
	member: {
		id: string;
		full_name: string;
		profile_picture: string;
		instagram: string;
		linkedin: string;
		twitter: string;
		facebook: string;
	};
	position: string;
}

export interface CompanyProfileTypes {
	id: string;
	name: string;
	logo: string;
	industry: Industry;
	employee_count: string;
	founded: Date;
	description: string;
	contact: {
		email: string;
		phone: string;
		address: string;
		location: string;
		website: string;
		twitter: string;
		facebook: string;
		linkedin: string;
		instagram: string;
	};
	cv: string;
	team: MemberCardProps[];
	jobs: JobCardProps[];
	images: {
		id: string;
		image: string;
	}[];
}