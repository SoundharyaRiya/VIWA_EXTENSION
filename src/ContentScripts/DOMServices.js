export const scrapeContent = async (url) => {
  try {
    // Fetch the HTML content of the web page
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch page");
    }

    const html = await response.text();

    // Parse the HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Select all <p> tags and extract their text content
    const paragraphs = doc.querySelectorAll("p");
    const textArray = Array.from(paragraphs).map((p) => p.textContent.trim());

    // Join the text content of all <p> tags into a single string
    const text = textArray.join("\n");

    return text;
  } catch (error) {
    console.error("Error scraping page:", error);
    return null;
  }
};

export const removeDescribeMeButtons = () => {
  const buttons = document.querySelectorAll(".viwa-portal-close");

  buttons.forEach((button) => {
    if (button) {
      button.parentNode.removeChild(button);
    }
  });
};

export const typeStringIntoElement = (string, element, delay = 30) => {
  let index = 0;

  function typeNextCharacter() {
    if (index < string.length) {
      element.textContent += string[index];
      index++;
      setTimeout(typeNextCharacter, delay);
    }
  }

  typeNextCharacter();
};
