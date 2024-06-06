export async function getSupervisors (query: API.Request.Query.Supervisor) {
   const response = await $api <API.Response<Utility.DataTable<Model.Supervisor[]>>> (`/supervisors`, {
      method: 'get',
      query
   })
   return response.data
}

export async function getSupervisorDetails(id: number) {
   const response = await $api <API.Response<Model.Supervisor>> (`/supervisor/${id}`, {
      method: 'get'
   })
   return response.data
}