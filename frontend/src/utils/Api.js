class Api {
    constructor({server}) {
        this._server = server
    }
    _makeRequest(endpoint, method, body) {
        const token = localStorage.getItem("jwt");
        const fetchInit = {
            method: method,
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
        return fetch(`${this._server}${endpoint}`, body ? {...fetchInit,
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
        console.log(isLiked)
        return this._makeRequest(`cards/${id}/likes`, isLiked ? 'DELETE' : 'PUT')
    }
    editAvatar(avatar) {
        return this._makeRequest('users/me/avatar', 'PATCH', {
            avatar: avatar
        })
    }
}
const api = new Api({server: 'https://api.go.to.mesto.nomoredomains.work/'});
export default api; 