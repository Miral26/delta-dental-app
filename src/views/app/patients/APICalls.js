import axios from "axios";

export async function getPatients(id) {
    return axios.get(`patient/?page=1&limit=500`).then((result) => {
        if (result && result.status === 200) {
            return result.data
        }
    }).catch((error) => {
        console.log(`error`, error)
        return null
    })
}

export async function createPatient(data) {
    return axios.post('patient/', data).then((result) => {
        if (result && result.status === 201) {
            return result.data
        }
    }).catch((error) => {
        console.log(`error`, error)
        return null
    })
}

export async function updatePatient(data, patientId) {
    return axios.patch(`patient/${patientId}/`, data).then((result) => {
        if (result && result.status === 200) {
            return result.data
        }
    }).catch((error) => {
        console.log(`error`, error)
        return null
    })
}

export async function deletePatient(patientId) {
    return axios.delete(`patient/${patientId}/`).then((result) => {
        if (result && result.status === 204) {
            return true
        }
    }).catch((error) => {
        console.log(`error`, error)
        return null
    })
}