export const state = () => ({
    items: {
        all: [],
        featured: [],
    },
    item: {},
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
};

export const mutations = {
    setBlogs(state, { resource, blogs }) {
        state.items[resource] = blogs;
    },
    setBlog(state, blog) {
        state.item = blog;
    },
};

export const actions = {
    fetchBlogs({ state, commit }) {
        return this.$axios
            .$get("/api/v1/blogs")
            .then((data) => {
                const { blogs } = data;
                commit("setBlogs", {
                    resource: "all",
                    blogs,
                });
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
