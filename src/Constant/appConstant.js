Object.defineProperty(exports, "__esModule", {
  value: true,
});

if (process.env.NODE_ENV === "development") {
  exports.default = {
    baseURL: "http://localhost:5000/api/v1/mail",
    authURL: "http://localhost:3000/auth/",
  };
} else {
  exports.default = {
    baseURL: "https://zmailer-backend.herokuapp.com/api/v1/mail",
    authURL: "https://zmailer-backend.herokuapp.com/auth/",
  };
}
