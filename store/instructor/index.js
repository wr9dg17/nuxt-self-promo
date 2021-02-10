export const state = () => ({
    heroes: [],
});

export const getters = {
    getHeroes: ({ heroes }) => heroes,
};

export const mutations = {
    setHeroes(state, heroes) {
        state.heroes = heroes;
    },
};

export const actions = {
    fetchHeroes({ state, commit }) {
        return this.$axios
            .$get("/api/v1/product-heroes")
            .then((heroes) => {
                commit("setHeroes", heroes);
                return state.heroes;
            })
            .catch((error) => Promise.reject(error));
    },

    activateHero({ commit }, heroId) {
        return this.$axios
            .$patch("/api/v1/procust-heroes" + heroId)
            .then((hero) => {
                commit("hero/setHero", hero, { root: true });
                return hero;
            })
            .catch((error) => Promise.reject(error));
    },
};
