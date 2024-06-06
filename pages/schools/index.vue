<template>
   <u-card>
      <data-table
         :data="schools?.data"
         :headers="headers"
         :page="filter.page"
         :per-page="filter.per_page"
         :total="schools?.total"
         :loading="loading"
         :filter-count="filterCount"
         @update="onTableUpdate"
      >
         <template #filter>
            <div class="p-4 grid gap-4">
               <u-form-group label="Tipe">
                  <u-select-menu
                     v-model="filter.type"
                     :options="schoolTypeOptions || []"
                     value-attribute="value"
                     searchable
                     searchable-placeholder="Cari..."
                     :search-attribute="['label']"
                     @update:model-value="fetchSchools"
                  >
                     <template #label>
                        {{ displaySelectLabel(schoolTypeOptions as Utility.SelectOption[], (filter.type as number), 'Pilih tipe...') }}
                     </template>
                  </u-select-menu>
               </u-form-group>

               <u-form-group label="Pengawas">
                  <u-select-menu
                     v-model="filter.supervisor"
                     :options="supervisorOptions || []"
                     value-attribute="value"
                     searchable
                     searchable-placeholder="Cari..."
                     :search-attribute="['label']"
                     @update:model-value="fetchSchools"
                  >
                     <template #label>
                        {{ displaySelectLabel(supervisorOptions as Utility.SelectOption[], (filter.supervisor as number), 'Pilih pengawas...') }}
                     </template>
                  </u-select-menu>
               </u-form-group>

               <div class="flex items-center justify-end">
                  <u-button
                     color="black"
                     leading-icon="i-heroicons-arrow-path-16-solid"
                     @click.stop="resetFilter"
                  >
                     Atur Ulang
                  </u-button>
               </div>
            </div>
         </template>

         <template #header>
            <div class="flex gap-4 items-center">
               <u-button-group>
                  <u-input
                     v-model="filter.search"
                     placeholder="Cari..."
                     input-class="focus:ring-inset"
                     @keydown.enter="fetchSchools"
                  ></u-input>

                  <u-button
                     icon="i-heroicons-magnifying-glass-16-solid"
                     @click.stop="fetchSchools"
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
                  :to="`/schools/${row.id}`"
                  exact
               ></u-button>
            </u-tooltip>
         </template>
      </data-table>
   </u-card>
</template>

<script setup lang="ts">
const store = useAppStore()
store.setPageTitle('Sekolah')
store.setBreadcrumb([
   {
      label: 'Home',
      to: '/',
   },
   {
      label: 'Sekolah',
   }
])

const filter = ref<API.Request.Query.School>({
   page: 1,
   per_page: 10,
   supervisor: null,
   search: null,
   type: null
})

const filterCount = computed(() => {
   const { page, per_page, search, ...rest } = filter.value
   return Object.values(rest).filter(item => !!item).length
})

const headers = computed(() => [
   { key: 'user.name', label: 'Nama' },
   { key: 'user.email', label: 'Email' },
   { key: 'type.name', label: 'Tipe' },
   { key: 'supervisor.user.name', label: 'Pengawas' },
   { key: 'updated_at', label: 'Diperbarui' },
   { key: 'actions' }
])

const { data: schools, pending: loading, refresh: fetchSchools } = await useLazyAsyncData('schools', () => getSchools(filter.value))

const { data: supervisorOptions } = await useLazyAsyncData('supervisor-options', () => getSupervisorOptions())

const { data: schoolTypeOptions } = await useLazyAsyncData('school-type-options', () => getSchoolTypeOptions())

const onTableUpdate = async (emit: Wildcard) => {
   filter.value = {
      ...filter.value,
      ...emit
   }

   await fetchSchools()
}

const resetFilter = async () => {
   filter.value = {
      page: 1,
      per_page: 10,
      supervisor: null,
      search: null,
      type: null
   }

   await fetchSchools()
}
</script>