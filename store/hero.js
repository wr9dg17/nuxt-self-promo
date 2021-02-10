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
                return state.item;
            })
            .catch((error) => Promise.reject(error));
    },

    fetchHero({ state, commit }) {
        return this.$axios
            .$get("/api/v1")
            .then(({ productHero }) => {
                commit("setHero", productHero);
                return state.item;
            })
            .catch((error) => Promise.reject(error));
    },
};
