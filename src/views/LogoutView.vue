<script setup>
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
console.log('logout about to be called')
useAuthStore().logout()
router.push('/login')
</script>