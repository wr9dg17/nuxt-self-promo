<template>
    <div class="course-create-wrapper">
        <div class="course-create-headerText">
            What category best fits the knowledge you'll share?
        </div>
        <h2 class="course-create-subtitle">
            If you're not sure about the right category, you can change it
            later.
        </h2>
        <form class="course-create-form">
            <div class="course-create-form-group">
                <div class="course-create-form-field">
                    <div class="select is-large">
                        <select v-model="form.category" @change="emitFormData">
                            <option key="default" value="default"
                                >Select Category</option
                            >
                            <option
                                v-for="category in categories"
                                :key="category._id"
                                :value="category._id"
                            >
                                {{ category.name }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
    data() {
        return {
            form: {
                category: "default",
            },
        };
    },
    validations: {
        form: {
            category: {
                required
            }
        }
    },
    computed: {
        ...mapGetters({
            categories: "category/getCategories",
        }),
        isValid() {
            return !this.$v.$invalid && this.form.category !== "default";
        },
    },
    methods: {
        emitFormData() {
            this.$emit("stepUpdated", {
                data: this.form,
                valid: this.isValid,
            });
        },
    },
    fetch({ store }) {
        return store.dispatch("category/fetchCategories");
    },
};
</script>
