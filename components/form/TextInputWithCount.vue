<template>
    <div>
        <input
            @input="emitInputValue"
            :maxLength="maxLength"
            type="text"
            placeholder="e.g. Amazing Course in Flutter!"
            class="input is-large"
        />
        <span class="icon is-small is-right">{{
            maxLength - inputLength
        }}</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentValue: "",
        };
    },
    props: {
        maxLength: {
            type: Number,
            default: 50,
            required: true,
        },
        placeholder: {
            type: String,
            required: false,
        },
    },
    computed: {
        inputLength() {
            return this.currentValue.length || 0;
        },
    },
    methods: {
        emitInputValue($event) {
            this.currentValue = $event.target.value;
            this.$emit("input", this.currentValue);
        },
    },
};
</script>

<style></style>
