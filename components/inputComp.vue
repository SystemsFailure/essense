<template>
    <input class="input" type="text" v-model="value" :placeholder="props.placeholder">
</template>
<script setup lang="ts">
interface modelValue {
    modelValue: string | number;
    placeholder?: string
}
const props = defineProps<modelValue>()
const emit = defineEmits(['update:modelValue']);

const value = computed({
    get() {
        return props.modelValue;
    },
    set(newValue) {
        emit('update:modelValue', newValue);
    }
})

</script>