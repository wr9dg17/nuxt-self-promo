import Vue from "vue";
import moment from "moment";

Vue.filter("shortenText", function(text, maxLength = 300) {
    if (text && typeof text === "string") {
        const dots = text.length > maxLength ? "..." : "";
        return text.substring(0, maxLength) + dots;
    }

    return "";
});

Vue.filter("formatDate", function(date, dateFormat = "LL") {
    if (!date) return "";

    return moment(date).format(dateFormat);
});
