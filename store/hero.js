export const state = () => ({
    item: null,
});

export const getters = {
    getHero: ({ item }) => item,
};

export const mutations = {
    setHero(state, hero) {
        state.item = hero;
    },
};

export const actions = {
    createHero({ state, commit }, data) {
        return this.$axios
            .$post("/api/v1/product-heroes", data)
            .then((hero) => {
                commit("setHero", hero);
                return state.courseHero;
            })
            .catch((error) => Promise.reject(error));
    },
};
