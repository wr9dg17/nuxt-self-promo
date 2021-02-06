<template>
    <div class="full-page-takeover-window">
        <div class="full-page-takeover-page">
            <Header
                :title="`Step ${activeStep} of 2`"
                exitLink="/instructor/courses"
            />
            <div class="full-page-takeover-header-bottom-progress">
                <div
                    :style="{ width: progress }"
                    class="full-page-takeover-header-bottom-progress-highlight"
                ></div>
            </div>
            <div class="course-create full-page-takeover-container">
                <div class="container">
                    <keep-alive>
                        <component
                            :is="activeComponent"
                            ref="activeComponent"
                            @stepUpdated="mergeFormData"
                        />
                    </keep-alive>
                </div>
                <div class="full-page-footer-row">
                    <div class="container">
                        <div class="full-page-footer-col">
                            <div v-if="!isFirstStep">
                                <a
                                    @click.prevent="prevStep"
                                    class="button is-large"
                                    >Previous</a
                                >
                            </div>
                            <div v-else class="empty-container"></div>
                        </div>
                        <div class="full-page-footer-col">
                            <div>
                                <button
                                    v-if="!isLastStep"
                                    @click.prevent="nextStep"
                                    :disabled="!canProceed"
                                    class="button is-large float-right"
                                >
                                    Continue
                                </button>
                                <button
                                    v-else
                                    @click="onCourseCreate"
                                    :disabled="!canProceed"
                                    class="button is-success is-large float-right"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "~/components/shared/Header";
import CourseCreateStep1 from "@/components/instructor/CourseCreateStep1";
import CourseCreateStep2 from "@/components/instructor/CourseCreateStep2";

export default {
    layout: "instructor",
    components: { Header, CourseCreateStep1, CourseCreateStep2 },
    data() {
        return {
            activeStep: 1,
            steps: ["CourseCreateStep1", "CourseCreateStep2"],
            canProceed: false,
            form: {
                title: "",
                category: "",
            },
        };
    },
    methods: {
        prevStep() {
            this.activeStep -= 1;
            this.$nextTick(() => {
                this.canProceed = this.$refs.activeComponent.isValid;
            });
        },
        nextStep() {
            this.activeStep += 1;
            this.$nextTick(() => {
                this.canProceed = this.$refs.activeComponent.isValid;
            });
        },
        mergeFormData(step) {
            this.form = { ...this.form, ...step.data };
            this.canProceed = step.valid;
        },
        async onCourseCreate() {
            this.$store
                .dispatch("instructor/course/createCourse", this.form)
                .then(() => {
                    this.$router.push("/instructor/courses");
                });
        },
    },
    computed: {
        stepsLength() {
            return this.steps.length;
        },
        isFirstStep() {
            return this.activeStep == 1;
        },
        isLastStep() {
            return this.activeStep == this.stepsLength;
        },
        activeComponent() {
            return this.steps[this.activeStep - 1];
        },
        progress() {
            return `${(100 / this.stepsLength) * this.activeStep}%`;
        },
        ...mapGetters({
            categories: "category/getCategories",
        }),
    },
    fetch({ store }) {
        return store.dispatch("category/fetchCategories");
    },
};
</script>

<style lang="scss">
.float-right {
    float: right;
}
.empty-container {
    width: 1px;
    height: 1px;
}
.course-create {
    &-wrapper {
        margin-top: 60px;
        text-align: center;
    }
    &-headerText {
        font-weight: 500;
        line-height: 1.1;
        margin-top: 21px;
        margin-bottom: 10.5px;
        font-size: 36px;
        font-weight: 300;
    }
    &-subtitle {
        font-size: 24px;
        font-weight: 300;
        margin-top: 21px;
        margin-bottom: 10.5px;
    }
    &-form {
        margin-top: 60px;
        &-group {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        &-field {
            min-width: 552px;
        }
        .select {
            width: 100%;
            > select {
                width: 100%;
            }
        }
    }
}
</style>
