<template>
    <div>
        <Hero
            :title="hero.title"
            :subtitle="hero.subtitle"
            :image="hero.image"
            :promoLink="hero.product.productLink"
        />
        <section class="section">
            <div class="container">
                <h1 class="title">Featured Courses</h1>
                <div class="columns is-multiline">
                    <div
                        class="column is-one-quarter"
                        v-for="course in courses"
                        :key="course._id"
                    >
                        <CourseCard :course="course" />
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <h1 class="title">Featured Articles</h1>
                <div class="columns is-multiline">
                    <div
                        class="column is-one-quarter"
                        v-for="blog in fBlogs"
                        :key="blog._id"
                    >
                        <BlogCard :blog="blog" />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Hero from "@/components/shared/Hero";
import CourseCard from "@/components/CourseCard";
import BlogCard from "@/components/BlogCard";
import { mapState } from "vuex";

export default {
    components: {
        Hero,
        CourseCard,
        BlogCard,
    },
    computed: {
        ...mapState({
            hero: (state) => state.hero.item,
            courses: (state) => state.course.items,
            fBlogs: (state) => state.blog.items.featured,
        }),
    },
    async fetch({ store }) {
        await store.dispatch("course/fetchCourses");
        await store.dispatch("blog/fetchFeaturedBlogs", {
            "filter[featured]": true,
        });
    },
};
</script>

<style scoped lang="scss">
.links {
    padding-top: 15px;
}
</style>
