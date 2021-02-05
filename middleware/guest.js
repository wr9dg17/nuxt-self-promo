export default function({ store, redirect }) {
    const isAuth = store.getters["auth/isAuth"];

    if (isAuth) {
        // TODO: later will be redirected to "not-authenticated" page
        return redirect("/");
    }
}
