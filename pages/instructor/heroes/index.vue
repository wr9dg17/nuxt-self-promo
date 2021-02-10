<template>
    <div class="heroes-page">
        <div class="container">
            <h1 class="title">Course Heroes</h1>
            <table class="heroes-table table is-responsive">
                <thead>
                    <tr class="main-table-row">
                        <th>Image</th>
                        <th>Title</th>
                        <th>Subtitle</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(hero, index) in heroes"
                        :key="hero._id"
                        @click="openModal(index)"
                        :class="{ isActive: activeHero._id == hero._id }"
                        class="table-row"
                    >
                        <td>{{ hero.image }}</td>
                        <td>{{ hero.title }}</td>
                        <td>{{ hero.subtitle }}</td>
                        <td>
                            {{activeHero._id == hero._id ? "Active" : "Incative" }}
                        </td>
                        <td class="modal-td" v-show="false">
                            <portal :to="`modal-view-${index}`">
                                <Modal
                                    @submitted="activateHero($event, hero._id)"
                                    :ref="`modal-${index}`"
                                    :showButton="false"
                                    actionTitle="Make Active"
                                    openTitle="Favorite"
                                    title="Make Course Hero"
                                >
                                    <div>
                                        <div class="subtitle">
                                            Title: {{ hero.title }}
                                        </div>
                                        <div class="subtitle">
                                            Subtitle: {{ hero.subtitle }}
                                        </div>
                                        <figure class="image is-3by1">
                                            <img :src="hero.image" />
                                        </figure>
                                    </div>
                                </Modal>
                            </portal>
                        </td>
                    </tr>
                </tbody>
            </table>

            <portal-target
                v-for="(hero, index) in heroes"
                :key="hero._id"
                :name="`modal-view-${index}`"
            ></portal-target>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Modal from "~/components/shared/Modal";

export default {
    middleware: "admin",
    components: {
        Modal,
    },
    computed: {
        ...mapGetters({
            heroes: "instructor/getHeroes",
            activeHero: "hero/getHero",
        }),
    },
    methods: {
        openModal(modalId) {
            this.$refs[`modal-${modalId}`][0].openModal();
        },

        activateHero({ closeModal }, heroId) {
            this.$store.dispatch("instructor/activateHero", heroId)
                then(() => {
                    closeModal();
                    this.$toasted.success("Hero was successfully activated", {
                        duration: 2000,
                    });
                });
        },
    },
    async fetch({ store }) {
        await store.dispatch("instructor/fetchHeroes");
    },
};
</script>

<style scoped lang="scss">
.heroes-page {
    max-width: 1000px;
    margin: 0 auto 5rem auto;
    margin-top: 40px;
}
.title {
    font-size: 45px;
    font-weight: bold;
}
.table-row {
    margin: 20px;
    &.isActive {
        background-color: #dfffe1;
    }
    &:hover {
        cursor: pointer;
        background-color: #e4e4e4;
    }
}
</style>
