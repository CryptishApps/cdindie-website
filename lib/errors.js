export const authError = (err) => {
    if (err.includes(":"))
        return err.split(":")[0];

    return err;
}