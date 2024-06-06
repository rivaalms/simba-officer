<template>
   <u-card>
      <data-table
         :data="supervisors?.data"
         :headers="headers"
         :page="filter.page"
         :per-page="filter.per_page"
         :total="supervisors?.total"
         :loading="loading"
         :use-default-filter="false"
         @update="onTableUpdate"
      >
         <template #header>
            <div class="flex gap-4 items-center">
               <u-button-group>
                  <u-input
                     v-model="filter.search"
                     placeholder="Cari..."
                     input-class="focus:ring-inset"
                     @keydown.enter="fetchSupervisors"
                  ></u-input>

                  <u-button
                     icon="i-heroicons-magnifying-glass-16-solid"
                     @click.stop="fetchSupervisors"
                  ></u-button>
               </u-button-group>
            </div>
         </template>

         <template #actions="{ row }">
            <u-tooltip text="Lihat detail">
               <u-button
                  :ui="{ rounded: 'rounded-full' }"
                  variant="ghost"
                  icon="i-heroicons-eye-16-solid"
                  :to="`/supervisors/${row.id}`"
                  exact
               ></u-button>
            </u-tooltip>
         </template>
      </data-table>
   </u-card>
</template>

<script setup lang="ts">
const store = useAppStore()
store.setPageTitle('Pengawas')
store.setBreadcrumb([
   {
      label: 'Home',
      to: '/',
   },
   {
      label: 'Pengawas',
   }
])

const filter = ref<API.Request.Query.Supervisor>({
   page: 1,
   per_page: 10,
   search: null,
})

const headers = computed(() => [
   { key: 'user.name', label: 'Nama' },
   { key: 'user.email', label: 'Email' },
   { key: 'employee_number', label: 'NIP' },
   { key: 'updated_at', label: 'Diperbarui' },
   { key: 'actions' }
])

const { data: supervisors, pending: loading, refresh: fetchSupervisors } = await useLazyAsyncData('supervisors', () => getSupervisors(filter.value))

const onTableUpdate = async (emit: Wildcard) => {
   filter.value = {
      ...filter.value,
      ...emit
   }

   await fetchSupervisors()
}

const resetFilter = async () => {
   filter.value = {
      page: 1,
      per_page: 10,
      search: null,
   }

   await fetchSupervisors()
}
</script>