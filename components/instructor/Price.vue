<template>
    <div class="card manage-card">
        <header class="card-header card-section">
            <p class="card-header-title">Pricing</p>
        </header>
        <div class="card-content card-section">
            <div class="field">
                <label class="label">Price of the course</label>
                <div class="control">
                    <input
                        @input="($event) => emitFieldUpdate($event, 'price')"
                        :value="course.price"
                        class="input is-medium"
                        type="text"
                        placeholder="179.99"
                    />
                </div>
            </div>
            <div class="field">
                <label class="label">Discounted Price for the course</label>
                <div class="control">
                    <input
                        @input="($event) => emitFieldUpdate($event, 'discountedPrice')"
                        :value="course.discountedPrice"
                        class="input is-medium"
                        type="text"
                        placeholder="9.99"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        course: {
            type: Object,
            required: true,
        },
    },
    methods: {
        emitFieldUpdate(event, field) {
            const value = event.target.value;
            this.$emit("onCourseValueUpdate", { value, field });
        },
    },
};
</script>
