<template>
    <div>
        <Header title="Write your Blogs" exitLink="/instructor/blogs" />
        <div class="blog-editor-container">
            <div class="container">
                <Editor @onEditorSaved="handleEditorSaved" />
            </div>
        </div>
    </div>
</template>

<script>
import Header from "~/components/shared/Header";
import Editor from "~/components/editor";

export default {
    layout: "instructor",
    components: {
        Header,
        Editor,
    },
    methods: {
        handleEditorSaved(blogData) {
            this.$store
                .dispatch("instructor/blog/createBlog", blogData)
                .then((blog) => {
                    this.$router.push(`/instructor/blog/${blog._id}/edit`);
                    this.$toasted.success(
                        "Your blog post created, you can publish it now",
                        { duration: 2000 }
                    );
                });
        },
    },
};
</script>
