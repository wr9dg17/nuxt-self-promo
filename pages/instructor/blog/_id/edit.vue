<template>
    <!-- Finish handling of URL -->
    <div>
        <Header title="Write your blog" exitLink="/instructor/blogs">
            <template v-if="blog.status === 'active'" #actionMenu>
                <div class="full-page-takeover-header-button">
                    <Modal
                        @opened="checkBlogValidity"
                        @submitted="publishBlog"
                        openTitle="Publish"
                        openBtnClass="button is-success is-medium is-inverted is-outlined"
                        title="Review Details"
                    >
                        <div>
                            <div class="title">
                                Once you publish blog you cannot change url to a
                                blog.
                            </div>
                            <div v-if="!publishError">
                                <div class="subtitle">Current Url is:</div>
                                <article class="message is-success">
                                    <div class="message-body">
                                        <strong>{{ slug }}</strong>
                                    </div>
                                </article>
                            </div>
                            <article v-else class="message is-danger">
                                <div class="message-body">
                                    {{ publishError }}
                                </div>
                            </article>
                        </div>
                    </Modal>
                </div>
            </template>
            <template v-else #actionMenu>
                <div class="full-page-takeover-header-button">
                    <Modal
                        @submitted="unpublishBlog"
                        openTitle="Unpublish"
                        openBtnClass="button is-success is-medium is-inverted is-outlined"
                        title="Unpublish Blog">
                        <div>
                            <div class="title">Unpublish blog so it's no longer displayed in blogs page</div>
                        </div>
                    </Modal>
                </div>
            </template>
        </Header>

        <div class="blog-editor-container">
            <div class="container">
                <Editor
                    @editorMounted="initBlogContent"
                    @onEditorSaved="handleEditorSaved"
                    :isSaving="isSaving"
                    ref="editor"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import slugify from "slugify";

import Editor from "~/components/editor";
import Header from "~/components/shared/Header";
import Modal from "~/components/shared/Modal";

export default {
    layout: "instructor",
    components: {
        Header,
        Modal,
        Editor,
    },
    data() {
        return {
            slug: "",
            publishError: "",
        };
    },
    computed: {
        ...mapGetters({
            blog: "instructor/blog/getBlog",
            isSaving: "instructor/blog/isSaving",
        }),
    },
    methods: {
        initBlogContent(initFn) {
            if (this.blog && this.blog.content) {
                initFn(this.blog.content);
            }
        },

        handleEditorSaved(blogData) {
            if (!this.isSaving) {
                this.$store
                    .dispatch("instructor/blog/updateBlog", {
                        data: blogData,
                        id: this.blog._id,
                    })
                    .then(() => {
                        this.$toasted.success(
                            "Your blog post updated, you can publish it now",
                            { duration: 2000 }
                        );
                    })
                    .catch(() => {
                        this.$toasted.error("Blog cannot be saved", {
                            duration: 2000,
                        });
                    });
            }
        },
        
        publishBlog({ closeModal }) {
            const blogContent = this.$refs.editor.getContent();
            blogContent.status = "published";

            this.$store
                .dispatch("instructor/blog/updateBlog", {
                    data: blogContent,
                    id: this.blog._id,
                })
                .then(() => {
                    closeModal();
                    this.$toasted.success(
                        "You blog has been published",
                        { duration: 2000 }
                    );
                })
                .catch(() => {
                    closeModal();
                    this.$toasted.error("Blog cannot be published", {
                        duration: 2000,
                    });
                });
        },

        unpublishBlog() {
            const blogContent = this.$refs.editor.getContent();
            blogContent.status = "active";

            this.$store
                .dispatch("instructor/blog/updateBlog", {
                    data: blogContent,
                    id: this.blog._id,
                })
                .then(() => {
                    closeModal();
                    this.$toasted.success(
                        "You blog has been unpublished",
                        { duration: 2000 }
                    );
                })
                .catch(() => {
                    closeModal();
                    this.$toasted.error("Blog cannot be unpublished", {
                        duration: 2000,
                    });
                });
        },

        checkBlogValidity() {
            this.slug = "";
            this.publishError = "";
            const title = this.$refs.editor.getNodeValueByName("title");

            if (title && title.length > 15) {
                this.slug = this.slugify(title);
            } else {
                this.publishError =
                    "Cannot publish. Title needs to be longer that 24 characters";
            }
        },

        slugify(text) {
            return slugify(text, {
                replacement: "-",
                remove: null,
                lower: true,
            });
        },
    },
    async fetch({ store, params }) {
        await store.dispatch("instructor/blog/fetchBlogById", params.id);
    },
};
</script>
