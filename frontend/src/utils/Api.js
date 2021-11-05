class Api {
    constructor({server, cohort, token}) {
        this._server = server
        this._cohort = cohort;
        this._token = token;
    }
    _makeRequest(endpoint, method, body) {
        const fetchInit = {
            method: method,
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        }
        return fetch(`${this._server}${this._cohort}${endpoint}`, body ? {...fetchInit,
            body: JSON.stringify(body)
        } : fetchInit).then(
            (res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.reject(res.status)
                }
            }))
    }
    getInitialCards() {
        return this._makeRequest('cards', 'GET')
    }
    getUserInfo() {
        return this._makeRequest('users/me', 'GET')
    }
    updateUserInfo(name, job) {
        return this._makeRequest('users/me', 'PATCH', {
            name: name,
            about: job
        })
    }
    addCard({
        name,
        link
    }) {
        return this._makeRequest('cards', 'POST', {
            name,
            link
        })
    }
    deleteCard(id) {
        return this._makeRequest(`cards/${id}`, 'DELETE')
    }
    changeLikeCardStatus(id, isLiked) {
        return this._makeRequest(`cards/likes/${id}`, isLiked ? 'DELETE' : 'PUT')
    }
    editAvatar(avatar) {
        return this._makeRequest('users/me/avatar', 'PATCH', {
            avatar: avatar
        })
    }
}
const api = new Api({server: 'https://mesto.nomoreparties.co/v1/', cohort: 'cohort-24/',
token: '0ea2ceba-98d3-4ffa-b48c-30fdce64ff5d'});
export default api;