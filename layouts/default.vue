<template>
  <div>
    <Menu />
    <Navigation />
    <nuxt />
    <Navigation />
  </div>
</template>

<style>

</style>
<script>
import Menu from '~/components/Menu'
import Navigation from '@/components/Navigation'

export default {
  components: { Navigation, Menu }
}
</script>
