const apiEndpoints = {
  home: "/",

  // auth
  signup: "/auth/signup",
  signin: "/auth/signin",
  profile: "/auth/profile",
  resetToken: (token: string) => `/auth/reset/?token=${token}`,
  verify_magic_link: (token: string) => `/auth/verify-magic-link/?token=${token}`,
  google: "/auth/google",
  github: "/auth/github",

  // organizations
  getUsersOrganizations: "/organizations",
  getOrganizationByUniqueName: (unique_name: string) => `/organizations/${unique_name}`,
  createOrganization: "/organizations/new",
  validateOrganization: (unique_name: string) => `/organizations/${unique_name}/validate`,
  updateOrganization: (unique_name: string) => `/organizations/${unique_name}/update`,
  updateOrganizationPincode: (unique_name: string) => `/organizations/${unique_name}/update/pincode`,
  setOrganizationAsDefault: (unique_name: string) => `/organizations/${unique_name}/setAsDefault`,

  // types
  getOrgTypes: (org_id: number) => `/organizations/${org_id}/types`,
  createOrgType: (org_id: number) => `/organizations/${org_id}/types/new`,
  updateOrgType: (org_id: number, type_id: number) => `organizations/${org_id}/types/${type_id}/update`,
  deleteOrgType: (org_id: number, type_id: number) => `organizations/${org_id}/types/${type_id}/delete`,

  // clients
  getTodaysClients: (org_id: number) => `/organizations/${org_id}/clients/today`,
  createClient: (org_id: number) => `/organizations/${org_id}/clients/new`,
  checkClient: (org_id: number, client_id: number, diagnosis_id: number) => `/organizations/${org_id}/clients/${client_id}/check/${diagnosis_id}`,
  updateClient: (org_id: number, client_id: number) => `/organizations/${org_id}/clients/${client_id}/update`,
  deleteClient: (org_id: number, client_id: number) => `/organizations/${org_id}/clients/${client_id}/delete`,
  searchClients: (org_id: number, page: number, limit: number, name: string = "", surname: string = "", born_in?: number, type_id?: number) => `/organizations/${org_id}/clients/search/?page=${page}&limit=${limit}&name=${name}&surname=${surname}${born_in ? `&born_in=${born_in}` : ""}${type_id ? `&type_id=${type_id}` : ""}`,
  getClientsByDate: (org_id: number, date: string, page: number, limit: number) => `/organizations/${org_id}/clients/date/${date}/?page=${page}&limit=${limit}`,

  // uploads
  uploadAvatar: "/uploads/avatar",
  uploadBanner: "/uploads/banner",
  uploadLogo: "/uploads/logo",

  // users
  updateUser: "/user/update",
  getUserById: (id: number) => `/user/${id}`,
  getMyWorks: "/user/works",

  // vacancies
  getVacancyById: (id: number) => `/vacancy/${id}`,
  createVacancy: "/vacancy/create",
  getAllMyVacancies: "/vacancy/mine",
  updateVacancy: (id: number) => `/vacancy/${id}/update`,
  deleteVacancy: (id: number) => `/vacancy/${id}/delete`,
  searchVacancy: (origin: string, q: string, role:string | null, job: string | null, page: number, limit: number) => `/vacancy/search?origin=${origin}&q=${q}${role ? `&role=${role}` : ""}${job ? `&job=${job}` : ""}&page=${page}&limit=${limit}`,

  // workers
  hireWorker: (org_id: number, vacancy_id: number) => `/organizations/${org_id}/workers/${vacancy_id}/hire`,
  getAllWorkers: (org_id: number) => `/organizations/${org_id}/workers`,
  getWorkerById: (org_id: number, id: number) => `/organizations/${org_id}/workers/${id}`,
  deleteWorker: (org_id: number, id: number) => `/organizations/${org_id}/workers/${id}/delete`,
  updateWorker: (org_id: number, id: number) => `/organizations/${org_id}/workers/${id}/update`,

  // stats
  getClientStats: (org_id: number) => `/organizations/${org_id}/stats/clients`,
  getRevenueStats: (org_id: number) => `/organizations/${org_id}/stats/revenue`,

  // subscriptions
  generateCheckOut: (unique_name: string) => `/subscription/${unique_name}/checkout`
};

export default apiEndpoints;
