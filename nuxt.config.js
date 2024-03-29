module.exports = {
    telemetry: false,
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || "",
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            {
                hid: "description",
                name: "description",
                content: process.env.npm_package_description || "",
            },
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
        script: [{ src: "https://kit.fontawesome.com/d33a83f69c.js" }],
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: "#fff" },
    /*
     ** Global CSS
     */
    css: ["@/assets/scss/main.scss"],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: "~/plugins/filters" },
        { src: "~/plugins/vuelidate" },
        { src: "~/plugins/integrations" },
        { src: "~/plugins/toasted", ssr: false },
        { src: "~/plugins/paginate", ssr: false },
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        "@nuxtjs/axios",
        "portal-vue/nuxt",
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},
    /**
     * Server middleware
     * See https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-servermiddleware/
     */
    serverMiddleware: ["~/server/routes/index"],
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {},
    },
};
