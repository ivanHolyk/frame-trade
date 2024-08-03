import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const baseUrl = '/api/v1'

export const useUserStore = defineStore('user', () => {
  const user = ref()
  function setUser(newUser) {
    user.value = newUser
    return user
  }
  const username = computed(() => user.value?.ingame_name)
  const haveAnyLinkendAccounts = computed(() => haveAnyLinkendAccountsByUser(user))
  const haveAnyLinkendAccountsByUser = (byUser) => {
    for (const key in byUser.linked_accounts) {
      if (byUser.linked_accounts[key] === true) {
        return true
      }
    }
  }
  return { user, setUser, username, haveAnyLinkendAccounts, haveAnyLinkendAccountsByUser }
})
