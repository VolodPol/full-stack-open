import axios from "axios";

const url = 'http://localhost:8090/api/persons';

const getAll = () => {
    return axios
        .get(`${url}`)
        .then(response => response.data);
};

const createPerson = (person) => {
    return axios
        .post(`${url}`, person)
        .then(response => response.data);
};

const removePerson = (id) => {
    axios
        .delete(`${url}/${id}`)
        .finally();
};

const updatePerson = (updatePerson) => {
    const { id } = updatePerson;
    return axios
        .put(`${url}/${id}`, updatePerson)
        .then(response => response.data);
};

export default { getAll, createPerson, removePerson, updatePerson };