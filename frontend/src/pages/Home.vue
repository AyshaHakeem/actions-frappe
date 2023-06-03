<template>
  <div class="mx-20">
    <div class="my-20">
      <h1 class="text-5xl text-900">Schedule</h1>
      
    </div>


    <div class="flex flex-row">
      <!--  items-center justify-between -->
      <h1 class="text-5xl text-900">Lists</h1>
      <Button icon-left="plus">New List</Button>
    </div>
    <div class="mt-2">
      <Card title="General" class="max-w-xl">
        <div>
          <ul>
            <li 
              class="space-y-2 flex flex-row items-center justify-between"
              v-for="action in actions.data"
              :key="action.title">
                <span> {{ action.title }} - {{ action.status }} </span>

                <router-link :to="`/actions/${action.name}`">{{ action.title }}</router-link>

                <Button icon="check" @click="completeAction(action.name)" />
            </li>
          </ul>
          <Button icon-left="plus" @click="showAddActionDialog = true">Add Action</Button>
        </div>
      </Card>
    </div>
    <Dialog 
      :options="{
        title: 'Add new action',
        actions: [
          {
            label: 'Add Action',
            appearance: 'primary',
            handler: ({ close }) => {
              addAction(action) // upon submitting the dialog box form
              close() // closes dialog
            },
          },
          { label: 'Cancel' },
        ]}" 
        v-model = "showAddActionDialog">
        <template #body-content>
          <div class="mt-4 text-lg">
            <Input v-model="action.title" label="Title" placeholder="Title" required />
            <Input v-model="action.category" label="Category" type='select' :options="categoryOptions" required />
            
            <Input label="Due Date" type="date"/>
          </div>
        </template>
    </Dialog>    
  </div>
</template>

<script setup>
import { Dialog, createListResource, Card, Input } from 'frappe-ui'
import {ref, reactive, computed} from 'vue';
// action document to be added
const action = reactive({
  title: '' ,
  category: ''
})
// dialog box to fill in action doc's fields
let showAddActionDialog = ref(false)
// submit the action doc
const addAction = actionDoc => {
  actions.insert.submit(actionDoc)
  console.log(actionDoc)

}
// get the action doctype and its records
const actions = createListResource({
  doctype: 'Action',
  fields: ['name','title', 'description','status','date', 'due_date'],
  filters: {
    status: 'ToDo'
  },
  limit: 10
})

actions.reload()
// get the Category doctype's records for users to choose a category whilst adding an action
const categories = createListResource({
  doctype: 'Category',
  fields: ['name', 'title'],
  // transform data before setting it
  transform(data){
    return data.map(d => ({label: d.title, value: d.name}) )
  }
})
categories.reload()
// options for category input tag
const categoryOptions = computed(()=>{
  if(categories.loading || !categories.data){
    return []
  }else{
    return categories.data
  }
})

// mark a particular actions's status as completed
const completeAction = docName =>{
  actions.setValue.submit({
    name: docName,
    status: 'Completed',
    onSuccess(){
      actions.reload()
    }
  })
}


</script>