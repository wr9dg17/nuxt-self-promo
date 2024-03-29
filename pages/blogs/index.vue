<template>
    <div>
        <div class="main-content">
            <div class="container">
                <div class="columns is-mobile">
                    <div class="column is-8">
                        <div
                            v-for="blog in pBlogs"
                            :key="blog._id"
                            class="section"
                        >
                            <div class="post">
                                <div
                                    @click="$router.push(`/blogs/${blog.slug}`)"
                                    class="post-header clickable"
                                >
                                    <h4 class="title is-4">{{ blog.title }}</h4>
                                    <h5 class="subtitle is-5">
                                        {{ blog.subtitle }}
                                    </h5>
                                </div>
                                <div class="post-content">
                                    {{ blog.author.name }}
                                    {{ blog.updatedAt | formatDate("LLLL") }}
                                </div>
                            </div>
                        </div>
                        <!-- Blog post -->

                        <div class="section">
                            <client-only placeholder="Loading...">
                                <paginate
                                    v-model="currentPage"
                                    :page-count="pagination.pageCount"
                                    :click-handler="onPaginationClick"
                                    :prev-text="'Prev'"
                                    :next-text="'Next'"
                                    :container-class="'paginationContainer'"
                                >
                                </paginate>
                            </client-only>
                        </div>
                        <!-- Pagination -->
                    </div>
                    <!-- Blog posts -->

                    <div class="column is-4 is-narrow">
                        <div class="section">
                            <div class="sidebar">
                                <div class="sidebar-header">
                                    <h4 class="title is-4">Featured Blogs</h4>
                                </div>
                                <div class="sidebar-list">
                                    <p v-for="blog in fBlogs" :key="blog._id">
                                        <nuxt-link :to="`/blogs/${blog.slug}`">
                                            {{ blog.title }}
                                        </nuxt-link>
                                    </p>
                                    <!-- Featured blog post -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Sidebar -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters({
            pBlogs: "blog/getAllBlogs",
            fBlogs: "blog/getFeaturedBlogs",
            pagination: "blog/getPagination",
        }),
        currentPage: {
            get() {
                return this.$store.state.blog.pagination.pageNum;
            },
            set(value) {
                this.$store.commit("blog/setPage", value);
            },
        },
    },
    methods: {
        setPaginationQueryParameters() {
            const { pageNum, pageSize } = this.pagination;
            this.$router.push({ query: { pageNum, pageSize } });
        },
        onPaginationClick() {
            this.$store
                .dispatch("blog/fetchBlogs", {
                    pageNum: this.pagination.pageNum,
                    pageSize: this.pagination.pageSize,
                })
                .then(() => this.setPaginationQueryParameters());
        },
    },
    async fetch({ store, query }) {
        const filter = {};
        const { pageNum, pageSize } = query;

        if (pageNum && pageSize) {
            filter.pageNum = parseInt(pageNum, 10);
            filter.pageSize = parseInt(pageSize, 10);
            store.commit("blog/setPage", pageNum);
        } else {
            filter.pageNum = store.state.blog.pagination.pageNum;
            filter.pageSize = store.state.blog.pagination.pageSize;
        }

        await store.dispatch("blog/fetchBlogs", filter);
        await store.dispatch("blog/fetchFeaturedBlogs", {
            "filter[featured]": true,
        });
    },
};
</script>

<style scoped>
.post-content {
    font-style: italic;
}
.pagination-content {
    display: flex;
    justify-content: flex-end;
}
.clickable {
    cursor: pointer;
}
#root {
    flex: 1 0 auto;
}
*:focus {
    outline: none;
}
a {
    transition: all 0.35s;
    color: #000;
}
.button:focus {
    border-color: #d74436;
    box-shadow: 0 0 0 0;
}
.input,
.textarea,
.input[type] {
    font-size: 1.1rem;
}
.input:focus,
.textarea:focus,
.input[type]:focus {
    border: 2px solid #d74436;
}
/* this is used when inline-styled content
   overlaps text backgrounds in a really ugly way */
.buffer {
    padding-bottom: 1.1rem;
}
/* navigation */
.nav {
    background-color: #0d0c0d;
}
.nav-left {
    padding-left: 2rem;
}
.nav-right,
.nav-center {
    padding-right: 2rem;
}
a.nav-item.is-tab {
    font-weight: 700;
    font-size: 13px;
    text-transform: uppercase;
    color: #fff;
    padding: 0.4rem;
}
a.nav-item:hover {
    color: #d74436;
}
a.nav-item.is-tab:hover {
    border-bottom: 4px solid #d74436;
}
/* main content */
.main-content {
    padding: 4rem 0 2rem 0;
    min-height: 800px;
}
.main-content .container {
    padding: 0 2rem 2rem 2rem;
}
/* section */
.section {
    padding: 0 0 2rem 0;
}
.section-header {
    padding-bottom: 3rem;
}
.section-header .title {
    text-transform: uppercase;
    color: #4a4a4a;
    font-size: 1.3rem;
}
.section-header a {
    color: #d74436;
    font-weight: 700;
}
.section-header a:hover {
    color: #e50076;
}
/* sidebar */
.sidebar-header {
    border-color: #d74436;
    padding-bottom: 1rem;
    border-bottom: 4px solid #d74436;
}
.sidebar-header .title,
.sidebar-header-single .title {
    font-weight: 700;
    text-transform: uppercase;
    font-size: 1.3rem;
}
.sidebar-list p,
.sidebar-list-single p {
    font-size: 1.1rem;
    font-weight: 300;
    padding-bottom: 0.8rem;
}
.sidebar-list a {
    color: #4a4a4a;
}
.sidebar-list,
.post-content,
.sidebar-list-single {
    padding-top: 1.4rem;
}
.sidebar-list-nav {
    padding-top: 1rem;
}
.sidebar-list-nav .is-tab {
    padding-right: 1rem;
}
.sidebar-footer-single {
    padding-top: 2rem;
}
.sidebar-footer-single a {
    color: #000;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 1.1rem;
    border-right: 4px solid #d74436;
    padding-right: 1rem;
}
.sidebar-footer-single a:hover {
    color: #363636;
}
/* post */
.post-header,
.sidebar-header-single {
    border-color: #d74436;
    padding-left: 1rem;
    border-left: 4px solid #d74436;
}
.post-header .title {
    font-weight: 700;
    font-size: 1.8rem;
    color: rgba(0, 0, 0, 0.84) !important;
    fill: rgba(0, 0, 0, 0.84) !important;
}
.post-header .subtitle,
.sidebar-header-single .subtitle {
    font-size: 1.1rem;
}
.post-content p,
.post-single-content p {
    margin-bottom: 0.8rem;
}
.post-content,
.post-single-content {
    font-size: 1.1rem;
    font-weight: 300;
}
/* override */
.post-single-content form p:nth-child(even) {
    border-right: 0;
}
.post-single-content form label {
    text-transform: uppercase;
    color: #4a4a4a;
    padding-bottom: 0.2rem;
}
.post-single-content form .input[type] {
    padding-top: 0.2rem;
}
.post-single-content p:nth-child(even) {
    border-right: 4px solid #d74436;
    padding-right: 1rem;
}
.post-content a {
    color: #d74436;
}
.card-content-form form {
    padding-top: 1.5rem;
}
.post-footer {
    padding: 1.5rem 0 0 0;
}
/* pagination */
.pagination-content {
    border-right: 4px solid #d74436;
    padding-right: 1rem;
}
.pagination-link.is-current {
    background-color: #d74436;
    border-color: #d74436;
}
</style>
