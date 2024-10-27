<template>
  <v-card-actions>
    <v-btn color="primary" variant="outlined" disabled outlined>Update Info</v-btn>
    <v-dialog v-model="isDialogOpen" max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn color="error" v-bind="activatorProps" variant="outlined" @click="openDeleteDialog">
          Delete WFM Account</v-btn>
      </template>
      <template v-slot:default>
        <v-card>
          <v-card-title>WFM Account Removal</v-card-title>
          <v-card-text>
            Do you really want to remove your Warframe.market account from your profile?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="outlined" @click="isDialogOpen = false">Cancel</v-btn>
            <v-btn color="error" variant="outlined" @click="confirmDelete">Remove Account</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <v-btn color="primary" variant="outlined" :to="{ name: 'userOrders' }" outlined>Show orders</v-btn>
  </v-card-actions>
</template>
<script setup>
import { authApi } from '@/api/axios'
import { computed, onMounted, ref } from 'vue'

const isDialogOpen = ref(false)

// Open delete confirmation dialog
const openDeleteDialog = () => {
  isDialogOpen.value = true
}

// Confirm delete WFM account
const confirmDelete = async () => {
  try {
    await deleteWfmAccount()
    isDialogOpen.value = false // Close the dialog
    wfmAccount.value = null // Clear WFM account after deletion
    hasWfmAccount.value = false
  } catch (error) {
    console.error('Error deleting WFM account:', error)
  }
}
// Function to delete WFM account
const deleteWfmAccount = async () => {
  let response = await authApi.delete(`http://localhost:8000/v1/user/wfmAccount?fetch=true`)
  console.log(response)
  let data = await response.data
  console.log(data)
  return data
}
</script>
