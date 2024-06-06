<template>
   <div class="grid gap-4 grid-cols-12 place-items-start justify-items-stretch">
      <div class="col-span-3 grid gap-4">
         <u-card>
            <dialog-placeholder v-if="loading"></dialog-placeholder>

            <div v-else class="grid gap-4">
               <div class="flex flex-col items-center gap-4">
                  <img
                     :src="supervisor?.user?.profile_picture || 'https://avatars.githubusercontent.com/u/739984?v=4'"
                     class="rounded-full h-40 w-40 object-cover"
                  >

                  <div class="flex flex-col items-center justify-center">
                     <p class="text-gray-700">
                        {{ supervisor?.user?.name }}
                     </p>
                     <span class="text-gray-400 text-sm">
                        {{ supervisor?.user?.email }}
                     </span>
                  </div>
               </div>

               <u-divider></u-divider>

               <div class="grid gap-y-2 grid-cols-3 text-sm">
                  <p class="text-gray-500">NIP</p>
                  <p class="col-span-2">{{ supervisor?.employee_number }}</p>
               </div>
            </div>
         </u-card>
      </div>

      <div class="col-span-9 grid gap-4">
         <u-card>
            <div class="grid gap-4 place-items-start justify-items-stretch">
               <p>Sekolah Binaan</p>

               <data-table
                  :data="supervisor?.schools || []"
                  :headers="schoolHeaders"
                  :pagination="false"
                  :use-default-filter="false"
                  :total="(supervisor?.schools || []).length"
                  :loading="loading"
               >
                  <template #actions="{ row }">
                     <u-tooltip text="Lihat detail">
                        <u-button
                           :ui="{ rounded: 'rounded-full' }"
                           variant="ghost"
                           icon="i-heroicons-eye-16-solid"
                           :to="`/schools/${row.id}`"
                           exact
                        ></u-button>
                     </u-tooltip>
                  </template>
               </data-table>
            </div>
         </u-card>
      </div>
   </div>
</template>

<script setup lang="ts">
const supervisorId = computed(() => parseInt(useRoute().params.id as string))

const store = useAppStore()
store.setPageTitle('Detail Pengawas')
store.setBreadcrumb([
   { label: 'Home', to: '/' },
   { label: 'Pengawas', to: '/supervisors' },
   { label: 'Detail' }
])

const { data: supervisor, pending: loading, refresh } = await useLazyAsyncData('supervisor', () => getSupervisorDetails(supervisorId.value))

const schoolHeaders = computed(() => [
   { key: 'user.name', label: 'Nama' },
   { key: 'user.email', label: 'Email' },
   { key: 'type.name', label: 'Tipe' },
   { key: 'actions' }
])
</script>