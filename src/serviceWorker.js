// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "login") {
    // Perform authentication API request
    fetch("http://localhost:5120/api/Authentication/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: message.email,
        password: message.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Send response back to UI
        sendResponse(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        sendResponse({ error: "An error occurred during authentication." });
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: message.email,
        password: message.password,
        firstName: message.firstName,
        lastName: message.lastName,
        confirmPassword: message.confirmPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Send response back to UI
        sendResponse(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        sendResponse({ error: "An error occurred during registration." });
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
        Authorization: "Bearer " + message.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Send response back to UI
        sendResponse(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        sendResponse({ error: "An error occurred during registration." });
      });

    // Ensure that the message port is kept open until the response is sent
    return true;
  }
});
