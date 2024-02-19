<template>
   index page
</template>

<script setup lang="ts">
const store = useAppStore()
store.setPageTitle('Home')
store.setBreadcrumb([
   {
      label: 'Home',
   }
])
</script>