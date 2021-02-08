export const state = () => ({
    items: {
        all: [],
        featured: [],
    },
});

export const getters = {
    getAllBlogs(state) {
        return state.items.all;
    },
    getFeaturedBlogs(state) {
        return state.items.featured;
    },
};

export const mutations = {
    setBlogs(state, { resource, blogs }) {
        state.items[resource] = blogs;
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
};
