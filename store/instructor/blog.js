export const state = () => ({
    item: {},
    items: {
        drafts: [],
        published: [],
    },
    isSaving: false,
});

export const getters = {
    getBlog(state) {
        return state.item;
    },
    getDraftBlogs(state) {
        return state.items.drafts;
    },
    getPublishedBlogs(state) {
        return state.items.published;
    },
    isSaving(state) {
        return state.isSaving;
    },
};

export const mutations = {
    setBlog(state, blog) {
        state.item = blog;
    },
    deleteBlog(state, { res, index }) {
        state.items[res].splice(index, 1);
    },
    setBlogs(state, { resource, items }) {
        state.items[resource] = items;
    },
    setSaving(state, isSaving) {
        state.isSaving = isSaving;
    },
};

export const actions = {
    createBlog({ commit }, blogData) {
        commit("setSaving", true);
        return this.$axios
            .$post("/api/v1/blogs", blogData)
            .then((blog) => {
                commit("setSaving", false);
                return blog;
            })
            .catch((error) => Promise.reject(error));
    },

    fetchUserBlogs({ commit }) {
        return this.$axios.$get("/api/v1/blogs/me").then((blogs) => {
            const { drafts, published } = separateBlogs(blogs);
            commit("setBlogs", {
                resource: "drafts",
                items: drafts,
            });
            commit("setBlogs", {
                resource: "published",
                items: published,
            });
            return { drafts, published };
        });
    },

    fetchBlogById({ state, commit }, blogId) {
        return this.$axios
            .$get("/api/v1/blogs/" + blogId)
            .then((blog) => {
                commit("setBlog", blog);
                return state.item;
            })
            .catch((error) => Promise.reject(error));
    },

    updateBlog({ state, commit }, { data, id }) {
        commit("setSaving", true);
        return this.$axios
            .$patch("/api/v1/blogs/" + id, data)
            .then((blog) => {
                commit("setBlog", blog);
                commit("setSaving", false);
                return state.item;
            })
            .catch((error) => Promise.reject(error));
    },

    deleteBlog({ state, commit }, blog) {
        return this.$axios
            .$delete("/api/v1/blogs/" + blog._id)
            .then(() => {
                const res = blog.status == "active" ? "drafts" : "published";
                const index = state.items[res].findIndex((b) => {
                    return b._id == blog._id;
                });

                commit("deleteBlog", { res, index });
                return true;
            })
            .catch((error) => Promise.reject(error));
    },
};

function separateBlogs(blogs) {
    const drafts = [];
    const published = [];

    blogs.forEach((blog) => {
        blog.status === "active" ? drafts.push(blog) : published.push(blog);
    });

    return { drafts, published };
}
