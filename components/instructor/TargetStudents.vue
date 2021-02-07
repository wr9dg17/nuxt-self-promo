<template>
    <div class="card manage-card">
        <header class="card-header card-section">
            <p class="card-header-title">
                Target your Students
            </p>
        </header>
        <div class="card-content card-section">
            <form>
                <MultilineTextInput
                    @onAddClicked="addLine('wsl')"
                    @onRemoveClicked="removeLine($event, 'wsl')"
                    @onInputUpdate="updateLine($event, 'wsl')"
                    :lines="course.wsl"
                    label="What will students learn"
                />
                <MultilineTextInput
                    @onAddClicked="addLine('requirements')"
                    @onRemoveClicked="removeLine($event, 'requirements')"
                    @onInputUpdate="updateLine($event, 'requirements')"
                    :lines="course.requirements"
                    label="What are the requirements"
                />
            </form>
        </div>
    </div>
</template>

<script>
import MultilineTextInput from "@/components/form/MultilineTextInput";

export default {
    components: { MultilineTextInput },
    props: {
        course: {
            type: Object,
            required: true,
        },
    },
    methods: {
        addLine(field) {
            this.$store.commit("instructor/course/addLine", field);
        },
        removeLine(index, field) {
            this.$store.commit("instructor/course/removeLine", {
                index,
                field,
            });
        },
        updateLine({ value, index }, field) {
            this.$store.dispatch("instructor/course/updateLine", {
                field,
                index,
                value,
            });
        },
    },
};
</script>
