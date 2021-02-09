<template>
    <div class="blog-editor-container">
        <div class="container">
            <div class="blog-section-user">
                <UserTile
                    :name="blog.author.name"
                    :avatar="blog.author.avatar"
                    :date="blog.createdAt | formatDate"
                />
            </div>
            <div class="blog-content">
                <EditorView :initialContent="blog.content" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserTile from "@/components/shared/UserTile";
import EditorView from "@/components/editor/EditorView.vue";

export default {
    components: {
        UserTile,
        EditorView,
    },
    computed: {
        ...mapGetters({
            blog: "blog/getBlog",
        }),
    },
    async fetch({ store, params }) {
        await store.dispatch("blog/fetchBlogBySlug", params.slug);
    },
};
</script>

<style scoped lang="scss">
.blog-content,
.blog-section-user {
    max-width: 800px;
    margin: 10px auto 30px auto;
}
</style>
