<template>
    <div class="d-flex flex-column">
        <slot>

        </slot>
        <div class="public-info">
            <div v-if="user.ingame_name" class="h3 me-3">
                <span class="me-2"><i class="bi bi-person"></i> {{ user.ingame_name }}</span>
                <span v-if="user.status" :style="setStatusClass(user.status)"> {{ user.status }} </span>
            </div>
            <div v-if="user.reputation" class="h5">
                <i class="bi bi-star-fill"></i> Rep: {{ user.reputation }}
            </div>
            <div v-if="user.locale || user.region">
                <i class="bi bi-geo-alt-fill"></i> Locale: {{ user.locale }}, Region: {{ user.region }}
            </div>
            <div v-if="user.id">
                <i class="bi bi-person-badge"></i> ID: {{ user.id }}
            </div>
            <div v-if="user.last_seen">Last seen: {{ useTimeAgo(user.last_seen) }}</div>
        </div>
        <div class="d-flex flex-wrap account-info">
            <div class="user-mail">
                <span v-if="user.has_mail !== undefined">
                    <i class="bi bi-envelope"></i> Has Mail: {{ user.has_mail ? 'Yes' : 'No' }}
                </span>
                <span v-if="user.unread_messages !== undefined">
                    Unread Messages: {{ user.unread_messages }}
                </span>
                <span v-if="user.written_reviews !== undefined">
                    <i class="bi bi-pencil-square">

                    </i> Written Reviews: {{ user.written_reviews }}
                </span>
            </div>

            <span v-if="user.banned">
                <i class="bi bi-slash-circle"></i> Banned: {{ user.banned ? 'Yes' : 'No' }}
                <span v-if="user.ban_reason">
                    Ban reason: {{ user.ban_reason }}
                </span>
            </span>
            <span v-if="user.anonymous !== undefined">
                <i class="bi bi-eye-slash">

                </i> Anonymous: {{ user.anonymous ? 'Yes' : 'No' }}
            </span>

            <span v-if="user.verification !== undefined">
                <i class="bi bi-check-circle">

                </i> Verified: {{ user.verification ? 'Yes' : 'No' }}
            </span>
            <span v-if="user.check_code">
                <i class="bi bi-key"></i> Check Code: {{ user.check_code }}
            </span>
            <span v-if="user.platform">
                <i class="bi bi-display">

                </i> Platform: {{ user.platform }}
            </span>

            <span v-if="userStore.haveAnyLinkendAccountsByUser(user)">
                <i class="bi bi-link-45deg">

                </i> Linked Accounts:
                <ul>
                    <li v-if="user.linked_accounts.steam_profile !== undefined">
                        <i class="bi bi-steam"></i> Steam: {{ user.linked_accounts.steam_profile ? 'Linked' : `Not
                        Linked`}}
                    </li>
                    <li v-if="user.linked_accounts.patreon_profile !== undefined">
                        <i class="bi bi-patreon">

                        </i> Patreon: {{ user.linked_accounts.patreon_profile ? 'Linked' : 'Not Linked' }}
                    </li>
                    <li v-if="user.linked_accounts.xbox_profile !== undefined">
                        <i class="bi bi-xbox"></i> Xbox: {{ user.linked_accounts.xbox_profile ? 'Linked' : `Not
                        Linked`}}
                    </li>
                    <li v-if="user.linked_accounts.discord_profile !== undefined">
                        <i class="bi bi-discord"></i> Discord: {{ user.linked_accounts.discord_profile ? 'Linked' :
                            `Not
                        Linked` }}
                    </li>
                    <li v-if="user.linked_accounts.github_profile !== undefined">
                        <i class="bi bi-github"></i> Github: {{ user.linked_accounts.github_profile ? 'Linked' :
                            `Not
                        Linked` }}
                    </li>
                </ul>

            </span>

            <span v-if="user.role">
                <i class="bi bi-person-rolodex"></i> Role: {{ user.role }}
            </span>
        </div>
    </div>
    <router-view />
</template>
<script setup>
import { RouterView } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useTimeAgo } from '@vueuse/core';
const props = defineProps(['user'])
const user = props.user

const userStore = useUserStore()


function setStatusClass(status) {
    let cssClass = {}
    switch (status) {
        case 'ingame':
            cssClass.color = 'purple'
            break;
        case 'online':
            cssClass.color = 'green'
            break;
        case 'offline':
            cssClass.color = 'red'
            break;
        default:
            break;
    }
    return cssClass
}
</script>
<style>
.public-info {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0.5rem;

}

.public-info>div {
    display: flex;

    margin-right: 1rem;
    align-items: center;
    margin-bottom: 0;

}

.account-info {
    justify-content: space-between;
}

.account-info>span {
    margin-right: 1rem;
}
</style>