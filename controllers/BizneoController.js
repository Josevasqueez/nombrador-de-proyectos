const axios = require("axios");

const login = async () => {
    const auth = {
        user: {
            email: process.env.BIZNEO_EMAIL,
            password: process.env.BIZNEO_PASSWORD
        }
    };
    const url = process.env.BIZNEO_BASEURL + "/sessions";
    const { data } = await axios.post(url, auth);
    return `Token token=${data.authentication_token}, user_email=${data.user_email}`
}

const getProjectField = async (session) => {
    const config = {
        headers: {
            Authorization: session,
        },
    };
    const bizneo = process.env.BIZNEO_BASEURL;
    const company = process.env.BIZNEO_COMPANY;
    const id = process.env.BIZNEO_PROJECTFIELD;
    const url = `${bizneo}/companies/${company}/requisitions/fields/${id}`;
    const { data } = await axios.get(url, config);
    return data;
}

const updateProjectField = async (body, session) => {
    const config = {
        headers: {
            Authorization: session,
        },
    };
    const bizneo = process.env.BIZNEO_BASEURL;
    const company = process.env.BIZNEO_COMPANY;
    const id = process.env.BIZNEO_PROJECTFIELD;
    const url = `${bizneo}/companies/${company}/requisitions/fields/${id}`;
    const { data } = await axios.patch(url, body, config);
    return data;
}

module.exports = {
    login,
    getProjectField,
    updateProjectField
}