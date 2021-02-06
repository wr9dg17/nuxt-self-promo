export const state = () => ({
    items: [],
});

export const getters = {
    hasCategories({ items }) {
        return items.length > 0;
    },
    getCategories({ items }) {
        return items;
    }
};

export const mutations = {
    setCategories(state, categories) {
        state.items = categories;
    },
};

export const actions = {
    fetchCategories({ state, getters, commit }) {
        if (getters.hasCategories) return;

        return this.$axios
            .$get("/api/v1/categories")
            .then((categories) => {
                commit("setCategories", categories);
                return state.items;
            })
            .catch((error) => Promise.reject(error));
    },
};
