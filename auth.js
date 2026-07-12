export function checkMode(user) {
    if (user && user.email === "rafi@owner.com") {
        return "OWNER_MODE";
    }
    return "PUBLIC_MODE";
}
