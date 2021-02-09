<template>
    <div>
        <Header title="Manage your Blogs" exitLink="/" />
        <div class="instructor-blogs">
            <div class="container">
                <div class="section">
                    <div class="header-block">
                        <h2>Your Stories</h2>
                        <div class="title-menu">
                            <button
                                @click="$router.push('/instructor/blog/editor')"
                                class="button"
                            >
                                Write a story
                            </button>
                        </div>
                    </div>

                    <div class="tabs">
                        <ul>
                            <li @click="activeTab = 0">
                                <a :class="{ 'is-active': activeTab === 0 }"
                                    >Drafts</a
                                >
                            </li>
                            <li @click="activeTab = 1">
                                <a :class="{ 'is-active': activeTab === 1 }"
                                    >Published</a
                                >
                            </li>
                        </ul>
                    </div>

                    <div class="blogs-container">
                        <!-- Drafts -->
                        <template v-if="activeTab === 0">
                            <div v-if="drafts && drafts.length > 0">
                                <div
                                    v-for="dBlog in drafts"
                                    :key="dBlog._id"
                                    class="blog-card"
                                >
                                    <h2>{{ dBlog.title }}</h2>
                                    <div class="blog-card-footer">
                                        <span>
                                            Last Edited
                                            {{ dBlog.updatedAt | formatDate("LLLL") }}
                                        </span>
                                        <Dropdown
                                            @optionChanged="handleOptionChange($event, dBlog)"
                                            :items="draftOptions()"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div v-else class="blog-error">No Drafts :(</div>
                        </template>

                        <!-- Published -->
                        <template v-if="activeTab === 1">
                            <div v-if="published && published.length > 0">
                                <div
                                    v-for="pBlog in published"
                                    :key="pBlog._id"
                                    class="blog-card"
                                    :class="{featured: pBlog.featured}"
                                >
                                    <h2>{{ pBlog.title }}</h2>
                                    <div class="blog-card-footer">
                                        <span>
                                            Last Edited
                                            {{ pBlog.updatedAt | formatDate("LLLL") }}
                                        </span>
                                        <Dropdown
                                            @optionChanged="handleOptionChange($event, pBlog)"
                                            :items="publishedOptions(pBlog.featured)"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div v-else class="blog-error">
                                No Published Blogs :(
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
    commands,
    createPublishedOptions,
    createDraftOptions,
} from "~/pages/instructor/options";

import Header from "~/components/shared/Header";
import Dropdown from "~/components/shared/Dropdown";

export default {
    layout: "instructor",
    components: { Header, Dropdown },
    data() {
        return {
            activeTab: 0,
        };
    },
    computed: {
        ...mapGetters({
            drafts: "instructor/blog/getDraftBlogs",
            published: "instructor/blog/getPublishedBlogs",
        }),
    },
    methods: {
        setActiveTab(num) {
            this.activeTab = num;
        },

        publishedOptions(isFeatured) {
            return createPublishedOptions(isFeatured);
        },

        draftOptions() {
            return createDraftOptions();
        },

        handleOptionChange(command, blog) {
            if (command == commands.EDIT_BLOG) {
                this.$router.push(`/instructor/blog/${blog._id}/edit`);
            }
            if (command == commands.TOGGLE_FEATURE) {
                this.updateBlog(blog);
            }
            if (command == commands.DELETE_BLOG) {
                this.deleteBlog(blog);
            }
        },

        updateBlog(blog) {
            const featured = !blog.featured;
            this.$store
                .dispatch("instructor/blog/updateBlogPusblishedStatus", {
                    id: blog._id,
                    data: { featured },
                })
                .then(() => {
                    this.$toasted.success("Blog published status updated", {
                        duration: 2000,
                    });
                });
        },

        deleteBlog(blog) {
            const isConfirmed = confirm("Are you sure?");
            isConfirmed &&
                this.$store
                    .dispatch("instructor/blog/deleteBlog", blog)
                    .then(() => {
                        this.$toasted.success("Blog post deleted", {
                            duration: 2000,
                        });
                    });
        },
    },
    async fetch({ store }) {
        await store.dispatch("instructor/blog/fetchUserBlogs");
    },
};
</script>

<style scoped lang="scss">
.tabs {
    a.is-active {
        border-bottom-color: #363636;
        color: #363636;
    }
}
.blog-error {
    font-size: 35px;
}
.blog-card {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 20px 0;
    > h2 {
        font-size: 30px;
        font-weight: bold;
    }
    &-footer {
        color: rgba(0, 0, 0, 0.54);
    }
    &.featured {
        border-left: 5px solid #3cc314;
        padding-left: 20px;
        transition: border ease-out 0.2s;
    }
}
.header-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    > h2 {
        font-size: 40px;
        font-weight: bold;
    }
    .title-menu {
        margin-left: auto;
    }
}
</style>
