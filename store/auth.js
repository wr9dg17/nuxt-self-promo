export const state = () => ({
    user: null,
});

export const getters = {
    authUser(state) {
        return state.user || null;
    },
    isAuth(state) {
        return !!state.user;
    },
    isAdmin(state) {
        return state.user && state.user.role && state.user.role === "admin";
    },
};

export const mutations = {
    setUser(state, user) {
        state.user = user;
    },
};

export const actions = {
    login({ state, commit }, loginData) {
        return this.$axios
            .$post("/api/v1/users/login", loginData)
            .then((user) => {
                commit("setUser", user);
                return state.user;
            })
            .catch((error) => Promise.reject(error));
    },

    register(_, registerData) {
        return this.$axios
            .$post("/api/v1/users/register", registerData)
            .catch((error) => Promise.reject(error));
    },

    getAuthUser({ state, getters, commit }) {
        const user = getters.authUser;
        if (user) return Promise.resolve(user);

        return this.$axios
            .$get("/api/v1/users/me")
            .then((user) => {
                commit("setUser", user);
                return state.user;
            })
            .catch((error) => {
                commit("setUser", null);
                return Promise.reject(error);
            });
    },

    logout({ commit }) {
        return this.$axios
            .$post("/api/v1/users/logout")
            .then(() => {
                commit("setUser", null);
                return true;
            })
            .catch((error) => Promise.reject(error));
    },
};
