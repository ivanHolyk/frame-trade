<script setup>
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';


const userStore = useUserStore()
const { user } = storeToRefs(userStore)
import router from '@/router';
console.log(`we are about to redirect to /user/${user.value.ingame_name}`)

router.replace(`/user/${user.value.ingame_name}`)

</script>