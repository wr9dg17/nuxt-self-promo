<template>
    <div class="instructor-page">
        <Header />
        <div class="centered">
            <div class="columns">
                <div class="box" @click="$router.push('/instructor/courses')">
                    <div>Courses</div>
                </div>
                <div class="box" @click="$router.push('/instructor/blogs')">
                    <div>Blogs</div>
                </div>
                <div class="box" @click="$router.push('/instructor/heroes')">
                    <div>Heroes</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "@/components/shared/Header";

export default {
    layout: "instructor",
    components: {
        Header
    }
};
</script>

<style scoped lang="scss">
.instructor-page {
    .centered {
        min-height: 50vh;
        margin-top: 100px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
}
.box {
    height: 300px;
    width: 300px;
    display: flex;
    margin: 5px;
    justify-content: center;
    &:hover {
        cursor: pointer;
        background-color: #58529f;
        color: white;
        transition: background-color 0.3s ease-out;
    }
    > div {
        align-self: center;
        font-size: 50px;
        font-weight: bold;
    }
}
</style>
