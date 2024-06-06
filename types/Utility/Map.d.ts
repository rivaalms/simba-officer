declare namespace Utility {
   namespace Map {
      type Student = {
         grade: number
         islam: number
         katolik: number
         kristen: number
         hindu: number
         buddha: number
         konghucu: number
         total: number
         year: string
      }

      type Teacher = {
         subject: string
         value: string | number
      }

      type DataCountItem = {
         name: string
         count: number
      }

      type DataCount = {
         total: number
         data_by_status: Array<DataCountItem>
         data_by_category: Array<DataCountItem & { data_by_type: Array<DataCountItem> }>
         start_year?: string | null
         end_year?: string | null
      }

      type UserCount = {
         total: number
         user_by_type: {
            school: number
            supervisor: number
            officer: number
            admin: number
         }
      }
   }
}