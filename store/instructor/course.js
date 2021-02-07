export const state = () => ({
    items: [],
    item: {},
    canUpdateCourse: false,
});

export const getters = {
    getCourses(state) {
        return state.items;
    },
    getCourse(state) {
        return state.item;
    },
    canUpdateCourse(state) {
        return state.canUpdateCourse;
    }
};

export const mutations = {
    setCourses(state, courses) {
        state.items = courses;
    },
    setCourse(state, course) {
        state.item = course;
    },
    setCourseValue(state, { field, value }) {
        state.item[field] = value;
    },
    addLine(state, field) {
        state.item[field].push({ value: "" });
    },
    removeLine(state, { field, index }) {
        state.item[field].splice(index, 1);
    },
    setLineValue(state, { field, index, value }) {
        state.item[field][index].value = value;
    },
    setCanUpdateCourse(state, value) {
        state.canUpdateCourse = value;
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

    fetchCourseById({ commit }, courseId) {
        return this.$axios
            .$get("/api/v1/products/" + courseId)
            .then((course) => {
                commit("setCourse", course);
            })
            .catch((error) => Promise.reject(error));
    },

    createCourse(_, data) {
        return this.$axios
            .$post("/api/v1/products", data)
            .catch((error) => Promise.reject(error));
    },

    updateCourse({ state, commit }) {
        const course = state.item;
        return this.$axios
            .$patch("/api/v1/products/" + course._id, course)
            .then((course) => {
                commit("setCourse", course);
                commit("setCanUpdateCourse", false);
                return course;
            })
            .catch((error) => Promise.reject(error));
    },

    updateLine({ commit }, paramsObj) {
        commit("setLineValue", { ...paramsObj });
        commit("setCanUpdateCourse", true);
    },

    updateCourseValue({ commit }, { field, value }) {
        commit("setCourseValue", { field, value });
        commit("setCanUpdateCourse", true);
    },
};
