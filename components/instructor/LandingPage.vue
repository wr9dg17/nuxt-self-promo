<template>
    <div class="card manage-card">
        <header class="card-header card-section">
            <p class="card-header-title">
                Course Landing Page
            </p>
        </header>
        <div class="card-content card-section">
            <form>
                <div class="field">
                    <label class="label">Course title</label>
                    <div class="control">
                        <input
                            :value="course.title"
                            @input="
                                ($event) => emitFieldUpdate($event, 'title')
                            "
                            class="input is-medium"
                            type="text"
                            placeholder="Dart and Flutter From Zero to Hero "
                        />
                    </div>
                </div>
                <div class="field">
                    <label class="label">Course subtitle</label>
                    <div class="control">
                        <input
                            :value="course.subtitle"
                            @input="
                                ($event) => emitFieldUpdate($event, 'subtitle')
                            "
                            class="input is-medium"
                            type="text"
                            placeholder="Build real mobile Application for Android and iOS."
                        />
                    </div>
                </div>
                <div class="field">
                    <label class="label">Course description</label>
                    <div class="control">
                        <textarea
                            :value="course.description"
                            @input="
                                ($event) =>
                                    emitFieldUpdate($event, 'description')
                            "
                            class="textarea is-medium"
                            type="text"
                            placeholder="Write something catchy about the course"
                            rows="7"
                        >
                        </textarea>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Category</label>
                    <div class="select is-medium">
                        <select
                            :value="course.category._id"
                            @input="
                                ($event) => emitFieldUpdate($event, 'category')
                            "
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
                <div class="field">
                    <label class="label">Course Image</label>
                    <div class="columns">
                        <div class="column">
                            <figure class="image is-4by2">
                                <img :src="course.image" />
                            </figure>
                        </div>
                        <div class="column centered">
                            <div class="control">
                                <input
                                    :value="course.image"
                                    @input="
                                        ($event) =>
                                            emitFieldUpdate($event, 'image')
                                    "
                                    class="input is-medium"
                                    type="text"
                                    placeholder="https://images.unsplash.com/photo-1498837167922-ddd27525d352"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Course Link</label>
                    <div class="control">
                        <input
                            :value="course.productLink"
                            @input="
                                ($event) =>
                                    emitFieldUpdate($event, 'productLink')
                            "
                            class="input is-medium"
                            type="text"
                            placeholder="https://www.udemy.com/vue-js-2-the-full-guide-by-real-apps-vuex-router-node"
                        />
                    </div>
                </div>
                <div class="field">
                    <label class="label">Course Video Link</label>
                    <div class="control">
                        <input
                            :value="course.promoVideoLink"
                            @input="
                                ($event) =>
                                    emitFieldUpdate($event, 'promoVideoLink')
                            "
                            class="input is-medium"
                            type="text"
                            placeholder="https://www.youtube.com/watch?v=WQ9sCAhRh1M"
                        />
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    props: {
        course: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters({
            categories: "category/getCategories",
        }),
    },
    methods: {
        emitFieldUpdate(event, field) {
            const value = event.target.value;

            if (field === "category") {
                return this.emitCategoryUpdate(value, field);
            }
            return this.$emit("onCourseValueUpdate", { value, field });
        },
        emitCategoryUpdate(categoryId, field) {
            const foundCategory = this.categories.find((c) => {
                return c._id === categoryId;
            });
            this.$emit("onCourseValueUpdate", {
                value: foundCategory,
                field,
            });
        },
    },
};
</script>
