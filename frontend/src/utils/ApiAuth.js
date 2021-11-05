class ApiAuth {
  constructor(server) {
    this._server = server;
  }
  _makeCheck() {
    return (res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    };
  }
  register = ({ password, email }) => {
    return fetch(`${this._server}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    }).then(this._makeCheck())
  };
  login = ({ password, email }) => {
    return fetch(`${this._server}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    }).then(this._makeCheck())
  };
  validToken = (JWT) => {
    return fetch(`${this._server}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT}`
      },
    }).then(this._makeCheck())
  };
}
const apiAuth = new ApiAuth("https://auth.nomoreparties.co");
export default apiAuth;
