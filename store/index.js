import { use } from "passport";

export const mutations = {
    setItems(state, { resource, items }) {
        state[resource].items = items;
    },
};

export const actions = {
    async nuxtServerInit({ dispatch }) {
        await dispatch("auth/getAuthUser").catch(() => {
            console.log("Not Authenticated.");
        });

        await dispatch("hero/fetchHero").catch(() => {
            console.log("Cannot fetch hero data.");
        });
    },
};
