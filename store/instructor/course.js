export const state = () => ({
    items: [],
});

export const getters = {
    getCourses(state) {
        return state.items;
    },
};

export const mutations = {
    setCourses(state, courses) {
        state.items = courses;
    },
};

export const actions = {
    fetchInstructorCourses({ state, commit }) {
        return this.$axios
            .$get("/api/v1/products/user-products")
            .then((courses) => {
                commit("setCourses", courses);
                return state.items;
            })
            .catch((error) => Promise.reject(error));
    },

    createCourse(_, data) {
        return this.$axios
            .$post("/api/v1/products", data)
            .catch((error) => Promise.reject(error));
    },
};
