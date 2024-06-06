export async function countUser () : Promise<Utility.Map.UserCount> {
   const response = await $api <API.Response<Utility.Map.UserCount>> (`/users/count`, {
      method: 'get'
   })

   return response.data
}