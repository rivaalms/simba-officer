export async function getSchools(query: API.Request.Query.School) {
   const response = await $api <API.Response<Utility.DataTable<Model.School[]>>> ('/schools', {
      method: 'get',
      query
   })

   return response.data
}

export async function getSchoolDetails(id: number) {
   const response = await $api <API.Response<Model.School>> (`/school/${id}`, {
      method: 'get'
   })
   return response.data
}

export async function getStudents (payload: API.Request.Query.Student) : Promise <Model.Student[]> {
   const response = await $api <API.Response <Model.Student[]>> (`/school-students`, {
      method: 'get',
      query: payload
   })
   return response.data
}

export async function getStudentsGrowth (schoolId: number, payload: API.Request.Query.Growth) : Promise <Utility.Growth[]> {
   const response = await $api <API.Response<Utility.Growth[]>> (`/school-students/${schoolId}/growth`, {
      method: 'get',
      query: payload
   })
   return response.data
}

export async function getTeachers (payload: API.Request.Query.Teacher) : Promise <Model.Teacher[]> {
   const response = await $api <API.Response <Model.Teacher[]>> (`/school-teachers`, {
      method: 'get',
      query: payload
   })
   return response.data
}

export async function getTeachersGrowth (schoolId: number, payload: API.Request.Query.Growth) : Promise <Utility.Growth[]> {
   const response = await $api <API.Response<Utility.Growth[]>> (`/school-teachers/${schoolId}/growth`, {
      method: 'get',
      query: payload
   })
   return response.data
}