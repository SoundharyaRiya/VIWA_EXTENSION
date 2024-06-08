/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./src/serviceWorker.js ***!
  \******************************/
// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "login") {
    // Perform authentication API request
    fetch("http://localhost:5120/api/Authentication/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: message.email,
        password: message.password
      })
    }).then(response => response.json()).then(data => {
      // Send response back to UI
      sendResponse(data);
    }).catch(error => {
      console.error("Error:", error);
      sendResponse({
        error: "An error occurred during authentication."
      });
    });

    // Ensure that the message port is kept open until the response is sent
    return true;
  }
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "register") {
    // Perform authentication API request
    fetch("http://localhost:5120/api/Authentication/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: message.email,
        password: message.password,
        firstName: message.firstName,
        lastName: message.lastName,
        confirmPassword: message.confirmPassword
      })
    }).then(response => response.json()).then(data => {
      // Send response back to UI
      sendResponse(data);
    }).catch(error => {
      console.error("Error:", error);
      sendResponse({
        error: "An error occurred during registration."
      });
    });

    // Ensure that the message port is kept open until the response is sent
    return true;
  }
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "currentUser") {
    // Perform authentication API request
    fetch("http://localhost:5120/api/Authentication/current", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + message.token
      }
    }).then(response => response.json()).then(data => {
      // Send response back to UI
      sendResponse(data);
    }).catch(error => {
      console.error("Error:", error);
      sendResponse({
        error: "An error occurred during registration."
      });
    });

    // Ensure that the message port is kept open until the response is sent
    return true;
  }
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUNDWCxJQUFJLENBQUVDLFFBQVEsSUFBS0EsUUFBUSxDQUFDQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ25DRixJQUFJLENBQUVHLElBQUksSUFBSztNQUNkO01BQ0FiLFlBQVksQ0FBQ2EsSUFBSSxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUNEQyxLQUFLLENBQUVDLEtBQUssSUFBSztNQUNoQkMsT0FBTyxDQUFDRCxLQUFLLENBQUMsUUFBUSxFQUFFQSxLQUFLLENBQUM7TUFDOUJmLFlBQVksQ0FBQztRQUFFZSxLQUFLLEVBQUU7TUFBeUMsQ0FBQyxDQUFDO0lBQ25FLENBQUMsQ0FBQzs7SUFFSjtJQUNBLE9BQU8sSUFBSTtFQUNiO0FBQ0YsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92aXdhLWNocm9tZS8uL3NyYy9zZXJ2aWNlV29ya2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGJhY2tncm91bmQuanNcclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xyXG4gIGlmIChtZXNzYWdlLnR5cGUgPT09IFwibG9naW5cIikge1xyXG4gICAgLy8gUGVyZm9ybSBhdXRoZW50aWNhdGlvbiBBUEkgcmVxdWVzdFxyXG4gICAgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjUxMjAvYXBpL0F1dGhlbnRpY2F0aW9uL2xvZ2luXCIsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgZW1haWw6IG1lc3NhZ2UuZW1haWwsXHJcbiAgICAgICAgcGFzc3dvcmQ6IG1lc3NhZ2UucGFzc3dvcmQsXHJcbiAgICAgIH0pLFxyXG4gICAgfSlcclxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgLy8gU2VuZCByZXNwb25zZSBiYWNrIHRvIFVJXHJcbiAgICAgICAgc2VuZFJlc3BvbnNlKGRhdGEpO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yOlwiLCBlcnJvcik7XHJcbiAgICAgICAgc2VuZFJlc3BvbnNlKHsgZXJyb3I6IFwiQW4gZXJyb3Igb2NjdXJyZWQgZHVyaW5nIGF1dGhlbnRpY2F0aW9uLlwiIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAvLyBFbnN1cmUgdGhhdCB0aGUgbWVzc2FnZSBwb3J0IGlzIGtlcHQgb3BlbiB1bnRpbCB0aGUgcmVzcG9uc2UgaXMgc2VudFxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59KTtcclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xyXG4gIGlmIChtZXNzYWdlLnR5cGUgPT09IFwicmVnaXN0ZXJcIikge1xyXG4gICAgLy8gUGVyZm9ybSBhdXRoZW50aWNhdGlvbiBBUEkgcmVxdWVzdFxyXG4gICAgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjUxMjAvYXBpL0F1dGhlbnRpY2F0aW9uL3JlZ2lzdGVyXCIsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgZW1haWw6IG1lc3NhZ2UuZW1haWwsXHJcbiAgICAgICAgcGFzc3dvcmQ6IG1lc3NhZ2UucGFzc3dvcmQsXHJcbiAgICAgICAgZmlyc3ROYW1lOiBtZXNzYWdlLmZpcnN0TmFtZSxcclxuICAgICAgICBsYXN0TmFtZTogbWVzc2FnZS5sYXN0TmFtZSxcclxuICAgICAgICBjb25maXJtUGFzc3dvcmQ6IG1lc3NhZ2UuY29uZmlybVBhc3N3b3JkLFxyXG4gICAgICB9KSxcclxuICAgIH0pXHJcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgIC8vIFNlbmQgcmVzcG9uc2UgYmFjayB0byBVSVxyXG4gICAgICAgIHNlbmRSZXNwb25zZShkYXRhKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgICAgIHNlbmRSZXNwb25zZSh7IGVycm9yOiBcIkFuIGVycm9yIG9jY3VycmVkIGR1cmluZyByZWdpc3RyYXRpb24uXCIgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIC8vIEVuc3VyZSB0aGF0IHRoZSBtZXNzYWdlIHBvcnQgaXMga2VwdCBvcGVuIHVudGlsIHRoZSByZXNwb25zZSBpcyBzZW50XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn0pO1xyXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XHJcbiAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gXCJjdXJyZW50VXNlclwiKSB7XHJcbiAgICAvLyBQZXJmb3JtIGF1dGhlbnRpY2F0aW9uIEFQSSByZXF1ZXN0XHJcbiAgICBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6NTEyMC9hcGkvQXV0aGVudGljYXRpb24vY3VycmVudFwiLCB7XHJcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgIEF1dGhvcml6YXRpb246IFwiQmVhcmVyIFwiICsgbWVzc2FnZS50b2tlbixcclxuICAgICAgfSxcclxuICAgIH0pXHJcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgIC8vIFNlbmQgcmVzcG9uc2UgYmFjayB0byBVSVxyXG4gICAgICAgIHNlbmRSZXNwb25zZShkYXRhKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgICAgIHNlbmRSZXNwb25zZSh7IGVycm9yOiBcIkFuIGVycm9yIG9jY3VycmVkIGR1cmluZyByZWdpc3RyYXRpb24uXCIgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIC8vIEVuc3VyZSB0aGF0IHRoZSBtZXNzYWdlIHBvcnQgaXMga2VwdCBvcGVuIHVudGlsIHRoZSByZXNwb25zZSBpcyBzZW50XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn0pO1xyXG4iXSwibmFtZXMiOlsiY2hyb21lIiwicnVudGltZSIsIm9uTWVzc2FnZSIsImFkZExpc3RlbmVyIiwibWVzc2FnZSIsInNlbmRlciIsInNlbmRSZXNwb25zZSIsInR5cGUiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImVtYWlsIiwicGFzc3dvcmQiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiZGF0YSIsImNhdGNoIiwiZXJyb3IiLCJjb25zb2xlIiwiZmlyc3ROYW1lIiwibGFzdE5hbWUiLCJjb25maXJtUGFzc3dvcmQiLCJBdXRob3JpemF0aW9uIiwidG9rZW4iXSwic291cmNlUm9vdCI6IiJ9