import Vue from "vue";

Vue.filter("shortenText", function(text, maxLength = 300) {
    if (text && typeof text === "string") {
        const dots = text.length > maxLength ? "..." : "";
        return text.substring(0, maxLength) + dots;
    }

    return "";
});
