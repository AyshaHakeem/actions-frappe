<template>
    <div class="mx-20 my-5">
        <div class="flex flex-row items-center justify-between">
            <h1 class="text-5xl text-black-900" >ACTION DETAILS: {{ action.doc.title }}</h1>
            <Button icon-left="arrow-left" @click="router.back()">Go Back</Button>
            <Button 
                @click=""
                v-if="action.doc.status != 'Archived'"
                icon-left="trash">Delete</Button>
            <Button 
                @click="action.setValue.submit({status: 'Completed'})"
                icon-left="check"
                v-if="action.doc.status != 'Completed' || action.doc.status != 'Archived'"
            >Mark As Complete</Button>
        </div>
        <TextEditor
            editor-class="prose-sm border max-w-none rounded-b-lg p-3 overflow-auto h-64 focus:outline-none"
            :fixedMenu="true"
            :content="content"
            @change="(val) => (content = val)"
        />

    </div>

</template>
<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {createDocumentResource, TextEditor} from 'frappe-ui'

const router = useRouter()
const props = defineProps(['name'])

const action = createDocumentResource({
    doctype: 'Action',
    name: props.name
})
action.reload()

</script>