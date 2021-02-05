export default function({ store, redirect }) {
    const isAuth = store.getters["auth/isAuth"];

    if (!isAuth) {
        return redirect("/notAuthenticated");
    }
}
