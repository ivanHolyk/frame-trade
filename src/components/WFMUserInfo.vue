<template>
  <div class="user-details">
    <slot></slot>

    <div class="public-info">
      <div v-if="user.ingame_name" class="user-name">
        <v-icon left>mdi-account</v-icon> {{ user.ingame_name }}
        <span v-if="user.status" :style="setStatusClass(user.status)">
          {{ user.status }}
        </span>
      </div>

      <div v-if="user.reputation" class="user-reputation">
        <v-icon left>mdi-star</v-icon> Rep: {{ user.reputation }}
      </div>

      <div v-if="user.locale || user.region" class="user-location">
        <v-icon left>mdi-map-marker</v-icon> Locale: {{ user.locale }}, Region: {{ user.region }}
      </div>

      <div v-if="user.id" class="user-id">
        <v-icon left>mdi-badge-account</v-icon> ID: {{ user.id }}
      </div>

      <div v-if="user.last_seen">Last seen: {{ useTimeAgo(user.last_seen) }}</div>
    </div>

    <div v-if="hasAdditionalInfo" class="additional-info">
      <div class="user-mail">
        <span v-if="user.has_mail !== undefined">
          <v-icon left>mdi-email</v-icon> Has Mail: {{ user.has_mail ? 'Yes' : 'No' }}
        </span>
        <span v-if="user.unread_messages !== undefined">
          Unread Messages: {{ user.unread_messages }}
        </span>
        <span v-if="user.written_reviews !== undefined">
          <v-icon left>mdi-pencil</v-icon> Written Reviews: {{ user.written_reviews }}
        </span>
      </div>

      <div class="account-info">
        <div v-if="user.banned">
          <v-icon left>mdi-block-helper</v-icon> Banned: {{ user.banned ? 'Yes' : 'No' }}
          <span v-if="user.ban_reason"> Ban reason: {{ user.ban_reason }} </span>
        </div>

        <span v-if="user.anonymous !== undefined">
          <v-icon left>mdi-eye-off</v-icon> Anonymous: {{ user.anonymous ? 'Yes' : 'No' }}
        </span>

        <span v-if="user.verification !== undefined">
          <v-icon left>mdi-check-circle</v-icon> Verified: {{ user.verification ? 'Yes' : 'No' }}
        </span>
        <span v-if="user.check_code">
          <v-icon left>mdi-key</v-icon> Check Code: {{ user.check_code }}
        </span>
        <span v-if="user.platform">
          <v-icon left>mdi-monitor</v-icon> Platform: {{ user.platform }}
        </span>

        <span v-if="userStore.haveAnyLinkendAccountsByUser(user)">
          <v-icon left>mdi-link</v-icon> Linked Accounts:
          <ul>
            <li v-if="user.linked_accounts.steam_profile">
              <v-icon left>mdi-steam</v-icon> Steam:
              {{ user.linked_accounts.steam_profile ? 'Linked' : 'Not Linked' }}
            </li>
            <li v-if="user.linked_accounts.patreon_profile">
              <v-icon left>mdi-patreon</v-icon> Patreon:
              {{ user.linked_accounts.patreon_profile ? 'Linked' : 'Not Linked' }}
            </li>
            <li v-if="user.linked_accounts.xbox_profile">
              <v-icon left>mdi-xbox</v-icon> Xbox:
              {{ user.linked_accounts.xbox_profile ? 'Linked' : 'Not Linked' }}
            </li>
            <li v-if="user.linked_accounts.discord_profile">
              <v-icon left>mdi-discord</v-icon> Discord:
              {{ user.linked_accounts.discord_profile ? 'Linked' : 'Not Linked' }}
            </li>
            <li v-if="user.linked_accounts.github_profile">
              <v-icon left>mdi-github</v-icon> Github:
              {{ user.linked_accounts.github_profile ? 'Linked' : 'Not Linked' }}
            </li>
          </ul>
        </span>

        <span v-if="user.role">
          <v-icon left>mdi-account-card-details</v-icon> Role: {{ user.role }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from '@/stores/user'
import { useTimeAgo } from '@vueuse/core'
import { computed } from 'vue'
const props = defineProps({
  user: {
    required: true
  }
})
const user = props.user
const userStore = useUserStore()

function setStatusClass(status) {
  let cssClass = {}
  switch (status) {
    case 'ingame':
      cssClass.color = 'purple'
      break
    case 'online':
      cssClass.color = 'green'
      break
    case 'offline':
      cssClass.color = 'red'
      break
    default:
      break
  }
  return cssClass
}
const hasAdditionalInfo = computed(() => {
  return (
    user.has_mail !== undefined ||
    user.unread_messages !== undefined ||
    user.written_reviews !== undefined ||
    user.banned ||
    user.anonymous !== undefined ||
    user.verification !== undefined ||
    user.check_code ||
    user.platform ||
    userStore.haveAnyLinkendAccountsByUser(user) ||
    user.role
  )
})
</script>

<style scoped>
.user-details {
  display: flex;
  flex-direction: column;
}

.public-info,
.account-info,
.user-mail {
  margin-bottom: 1rem;
}

.account-info span {
  display: block;
  margin-bottom: 0.5rem;
}
</style>
