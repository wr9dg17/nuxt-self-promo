<template>
    <div>
        <!-- Send a label through props -->
        <label class="label">{{ label }}</label>
        <!-- Iterate lines here -->
        <div
            v-for="(line, index) in lines"
            :key="line.index"
            class="multi-field field"
        >
            <div class="control multi-control">
                <div class="multi-input-container">
                    <input
                        @input="emitUpdate($event, index)"
                        :value="line.value"
                        type="text"
                        class="input is-medium multi-input"
                        placeholder="'Add Something Nice (:'"
                    />
                </div>
                <div class="btn-container">
                    <!-- Delete the line -->
                    <button
                        @click.prevent="emitRemove(index)"
                        type="button"
                        class="button is-danger multi-button"
                        :disabled="!canDeleteLine"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
        <!-- Add the Line -->
        <button
            @click="emitAdd"
            type="button"
            class="m-b-lg button is-medium is-link is-outlined"
            :disabled="!canAddLine"
        >
            Add an answer
        </button>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true,
        },
        lines: {
            type: Array,
            required: true,
        },
    },
    computed: {
        lastLine() {
            return this.lines[this.lines.length - 1];
        },
        hasLines() {
            return this.lines.length > 0;
        },
        hasLastLineValue() {
            return this.lastLine && this.lastLine.value !== "";
        },
        canDeleteLine() {
            return this.lines.length > 1;
        },
        canAddLine() {
            return !this.hasLines || this.hasLastLineValue;
        },
    },
    methods: {
        emitAdd() {
            this.canAddLine && this.$emit("onAddClicked");
        },
        emitRemove(index) {
            this.canDeleteLine && this.$emit("onRemoveClicked", index);
        },
        emitUpdate(event, index) {
            const value = event.target.value;
            this.$emit("onInputUpdate", { value, index });
        },
    },
};
</script>

<style scoped lang="scss">
.multi-input {
    float: left;
    width: 100%;
}
.multi-button {
    height: inherit;
}
.multi-input-container {
    display: flex;
    flex: 1;
}
.btn-container {
    display: flex;
    opacity: 0;
}
.multi-control {
    display: flex;
    &:hover > .btn-container {
        opacity: 1;
    }
}
</style>
