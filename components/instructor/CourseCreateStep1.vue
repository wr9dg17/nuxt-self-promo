<template>
    <div class="course-create-wrapper">
        <div class="course-create-headerText">
            Please choose title of your Course.
        </div>
        <h2 class="course-create-subtitle">
            No worries, you can change title later.
        </h2>
        <form class="course-create-form" @input="emitFormData">
            <div class="course-create-form-group">
                <div
                    class="field course-create-form-field control has-icons-right"
                >
                    <TextFieldWithCount
                        v-model="form.title"
                        :maxLength="50"
                    />
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import TextFieldWithCount from "@/components/form/TextInputWithCount";

export default {
    components: {
        TextFieldWithCount
    },
    data() {
        return {
            form: {
                title: ""
            }
        }
    },
    validations: {
        form: {
            title: {
                required
            }
        }
    },
    methods: {
        emitFormData() {
            this.$emit("stepUpdated", {
                data: this.form,
                valid: this.isValid
            });
        }
    },
    computed: {
        isValid() {
            return !this.$v.$invalid;
        }
    },
};
</script>
