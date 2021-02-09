import Vue from "vue";

export const state = () => ({
    items: {
        all: [],
        featured: [],
    },
    item: {},
    pagination: {
        count: 0, // count of all data
        pageCount: 0, // number of pages to show
        pageSize: 2, // number of items to show in page
        pageNum: 1, // active page number
    },
});

export const getters = {
    getAllBlogs(state) {
        return state.items.all;
    },
    getFeaturedBlogs(state) {
        return state.items.featured;
    },
    getBlog(state) {
        return state.item;
    },
    getPagination(state) {
        return state.pagination
    },
};

export const mutations = {
    setBlogs(state, { resource, blogs }) {
        state.items[resource] = blogs;
    },
    setBlog(state, blog) {
        state.item = blog;
    },
    setPagination(state, { count, pageCount }) {
        Vue.set(state.pagination, "count", count);
        Vue.set(state.pagination, "pageCount", pageCount);
    },
    setPage(state, currentPage) {
        Vue.set(state.pagination, "pageNum", currentPage);
    },
};

export const actions = {
    fetchBlogs({ state, commit }, filter) {
        const url = this.$applyParamsToUrl("/api/v1/blogs", filter);
        return this.$axios
            .$get(url)
            .then((data) => {
                const { blogs, count, pageCount } = data;
                commit("setBlogs", { resource: "all", blogs });
                commit("setPagination", { count, pageCount });
                return state.items.all;
            })
            .catch((error) => Promise.reject(error));
    },

    fetchFeaturedBlogs({ state, commit }, filter) {
        const url = this.$applyParamsToUrl("/api/v1/blogs", filter);
        return this.$axios
            .$get(url)
            .then((data) => {
                const { blogs } = data;
                commit("setBlogs", {
                    resource: "featured",
                    blogs,
                });
                return state.items.featured;
            })
            .catch((error) => Promise.reject(error));
    },

    fetchBlogBySlug({ state, commit }, slug) {
        return this.$axios
            .$get("/api/v1/blogs/s/" + slug)
            .then((blog) => {
                commit("setBlog", blog);
                return state.item;
            })
            .catch((error) => Promise.reject(error));
    },
};
