/* ==============================================================
   WebQuest — Question Data
   ==============================================================
   This file stores all quiz questions in a single array.
   Each question is a JavaScript object with these properties:

     id          →  A unique number for the question.
     category    →  "html", "css", or "js" (matches the data-category
                    attribute on the Start Quiz buttons in index.html).
     question    →  The question text shown to the user.
     options     →  An array of exactly 4 answer strings.
     correct     →  The index (0–3) of the correct option in the array.
     explanation →  Why the correct answer is right (shown after answering).

   To add more questions, just copy one object, paste it at the end of
   the array, give it a new id, and fill in the details.
   ============================================================== */

const questions = [

  // ─── HTML Questions (1–10) ─────────────────────────────────

  {
    id: 1,
    category: "html",
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language"
    ],
    correct: 0,
    explanation: "HTML stands for Hyper Text Markup Language. It is the standard language used to create and structure content on web pages."
  },
  {
    id: 2,
    category: "html",
    question: "Which HTML element is used to define the largest heading?",
    options: [
      "<heading>",
      "<h6>",
      "<h1>",
      "<head>"
    ],
    correct: 2,
    explanation: "The <h1> element defines the largest (most important) heading. Headings range from <h1> (largest) to <h6> (smallest)."
  },
  {
    id: 3,
    category: "html",
    question: "Which attribute is used to provide an alternative text for an image?",
    options: [
      "title",
      "src",
      "alt",
      "href"
    ],
    correct: 2,
    explanation: "The 'alt' attribute provides alternative text that describes the image. It is displayed if the image fails to load and is essential for accessibility."
  },
  {
    id: 4,
    category: "html",
    question: "Which HTML element is used to create an unordered (bulleted) list?",
    options: [
      "<ol>",
      "<li>",
      "<list>",
      "<ul>"
    ],
    correct: 3,
    explanation: "The <ul> element creates an unordered list, which displays items with bullet points. Each item inside is wrapped in an <li> element."
  },
  {
    id: 5,
    category: "html",
    question: "What is the correct HTML element for inserting a line break?",
    options: [
      "<break>",
      "<lb>",
      "<br>",
      "<newline>"
    ],
    correct: 2,
    explanation: "The <br> element inserts a single line break. It is a self-closing (void) element and does not need a closing tag."
  },
  {
    id: 6,
    category: "html",
    question: "Which HTML element is used to define a hyperlink?",
    options: [
      "<link>",
      "<a>",
      "<href>",
      "<nav>"
    ],
    correct: 1,
    explanation: "The <a> (anchor) element creates hyperlinks to other web pages, files, or locations. The href attribute specifies the URL destination."
  },
  {
    id: 7,
    category: "html",
    question: "What is the purpose of the <meta> tag in HTML?",
    options: [
      "To create a navigation menu",
      "To define a paragraph of text",
      "To provide metadata about the HTML document",
      "To embed a video"
    ],
    correct: 2,
    explanation: "The <meta> tag provides metadata such as character set, viewport settings, descriptions, and keywords. It goes inside the <head> element and is not displayed on the page."
  },
  {
    id: 8,
    category: "html",
    question: "Which input type creates a checkbox in a form?",
    options: [
      "<input type=\"check\">",
      "<input type=\"checkbox\">",
      "<input type=\"box\">",
      "<checkbox>"
    ],
    correct: 1,
    explanation: "Setting type=\"checkbox\" on an <input> element creates a checkbox. The user can toggle it on or off, and it is commonly used in forms for multiple selections."
  },
  {
    id: 9,
    category: "html",
    question: "Which HTML5 element is used to define independent, self-contained content?",
    options: [
      "<section>",
      "<div>",
      "<article>",
      "<aside>"
    ],
    correct: 2,
    explanation: "The <article> element represents a self-contained composition, such as a blog post, news story, or forum entry, that could be independently distributed or reused."
  },
  {
    id: 10,
    category: "html",
    question: "What does the 'defer' attribute do on a <script> tag?",
    options: [
      "Loads the script from a CDN",
      "Makes the script run immediately",
      "Delays script execution until the HTML is fully parsed",
      "Prevents the script from running"
    ],
    correct: 2,
    explanation: "The 'defer' attribute tells the browser to download the script in parallel but wait to execute it until the HTML document has been completely parsed. This prevents the script from blocking page rendering."
  },

  // ─── CSS Questions (11–20) ────────────────────────────────

  {
    id: 11,
    category: "css",
    question: "Which CSS property is used to change the text colour of an element?",
    options: [
      "font-color",
      "text-color",
      "color",
      "foreground-color"
    ],
    correct: 2,
    explanation: "The 'color' property sets the text colour of an element. Despite its generic name, it only affects text colour, not the background."
  },
  {
    id: 12,
    category: "css",
    question: "Which CSS property controls the space between an element's border and its content?",
    options: [
      "margin",
      "spacing",
      "padding",
      "border-gap"
    ],
    correct: 2,
    explanation: "Padding is the space between the content and the border of an element. Margin, by contrast, is the space outside the border."
  },
  {
    id: 13,
    category: "css",
    question: "What does 'display: flex' do to an element?",
    options: [
      "Hides the element",
      "Makes it a flex container so its children can be laid out with Flexbox",
      "Makes the element fixed on the screen",
      "Stretches the element to full width"
    ],
    correct: 1,
    explanation: "Setting display: flex on an element turns it into a flex container. Its direct children become flex items and can be arranged using Flexbox properties like justify-content and align-items."
  },
  {
    id: 14,
    category: "css",
    question: "Which unit is relative to the font size of the root element?",
    options: [
      "em",
      "px",
      "rem",
      "%"
    ],
    correct: 2,
    explanation: "The 'rem' unit stands for 'root em'. It is relative to the font-size of the <html> (root) element, making it more predictable than 'em', which is relative to the parent element."
  },
  {
    id: 15,
    category: "css",
    question: "How do you select all <p> elements inside a <div> using CSS?",
    options: [
      "div + p",
      "div.p",
      "div p",
      "div > only(p)"
    ],
    correct: 2,
    explanation: "A space between two selectors (div p) is the descendant combinator. It selects all <p> elements that are inside a <div>, at any nesting level."
  },
  {
    id: 16,
    category: "css",
    question: "What is the default value of the 'position' property?",
    options: [
      "relative",
      "absolute",
      "fixed",
      "static"
    ],
    correct: 3,
    explanation: "The default position value is 'static'. Elements with static positioning follow the normal document flow. Properties like top, left, right, and bottom have no effect on statically positioned elements."
  },
  {
    id: 17,
    category: "css",
    question: "Which CSS property creates rounded corners on an element?",
    options: [
      "corner-radius",
      "border-radius",
      "box-corner",
      "round-border"
    ],
    correct: 1,
    explanation: "The 'border-radius' property rounds the corners of an element. You can set it to a single value (e.g., 12px) or specify each corner individually."
  },
  {
    id: 18,
    category: "css",
    question: "What does 'z-index' control?",
    options: [
      "The zoom level of an element",
      "The transparency of an element",
      "The stacking order of positioned elements",
      "The size of the font"
    ],
    correct: 2,
    explanation: "The z-index property controls which positioned elements appear on top when they overlap. Higher values are placed in front of lower values. It only works on elements with a position value other than static."
  },
  {
    id: 19,
    category: "css",
    question: "Which CSS property is used to create a grid layout?",
    options: [
      "display: grid",
      "display: table",
      "layout: grid",
      "grid-mode: on"
    ],
    correct: 0,
    explanation: "Setting display: grid turns an element into a grid container. You can then use grid-template-columns, grid-template-rows, and gap to define the grid structure."
  },
  {
    id: 20,
    category: "css",
    question: "What does the '@media' rule do in CSS?",
    options: [
      "Imports external CSS files",
      "Applies styles only when certain conditions (like screen width) are met",
      "Creates animations",
      "Defines CSS variables"
    ],
    correct: 1,
    explanation: "The @media rule applies CSS styles conditionally based on the device's characteristics, such as screen width, height, or orientation. It is essential for responsive design."
  },

  // ─── JavaScript Questions (21–30) ─────────────────────────

  {
    id: 21,
    category: "js",
    question: "Which keyword declares a variable that cannot be reassigned?",
    options: [
      "var",
      "let",
      "const",
      "static"
    ],
    correct: 2,
    explanation: "'const' declares a constant variable whose reference cannot be changed after assignment. Note: if the value is an object or array, its internal properties can still be modified."
  },
  {
    id: 22,
    category: "js",
    question: "What is the output of: typeof null?",
    options: [
      "\"null\"",
      "\"undefined\"",
      "\"object\"",
      "\"number\""
    ],
    correct: 2,
    explanation: "This is a well-known JavaScript quirk. typeof null returns 'object' due to a legacy bug in the language's original implementation. It has been kept for backward compatibility."
  },
  {
    id: 23,
    category: "js",
    question: "Which method adds a new element to the end of an array?",
    options: [
      "push()",
      "pop()",
      "shift()",
      "unshift()"
    ],
    correct: 0,
    explanation: "The push() method adds one or more elements to the end of an array and returns the new length. pop() removes the last element, shift() removes the first, and unshift() adds to the beginning."
  },
  {
    id: 24,
    category: "js",
    question: "What does 'document.querySelector(\".box\")' return?",
    options: [
      "All elements with the class 'box'",
      "The first element with the class 'box'",
      "The element with the id 'box'",
      "An error"
    ],
    correct: 1,
    explanation: "querySelector returns the first element that matches the given CSS selector. To get all matching elements, you would use querySelectorAll instead."
  },
  {
    id: 25,
    category: "js",
    question: "Which event fires when a user clicks on an HTML element?",
    options: [
      "onhover",
      "onchange",
      "click",
      "mouseenter"
    ],
    correct: 2,
    explanation: "The 'click' event fires when a user presses and releases the primary mouse button on an element. You can listen for it using addEventListener('click', callback)."
  },
  {
    id: 26,
    category: "js",
    question: "What does the '===' operator do in JavaScript?",
    options: [
      "Assigns a value to a variable",
      "Compares values only, ignoring type",
      "Compares both value and type (strict equality)",
      "Checks if a variable exists"
    ],
    correct: 2,
    explanation: "The === (strict equality) operator checks whether two values are equal without performing type conversion. For example, 5 === '5' is false because number and string are different types."
  },
  {
    id: 27,
    category: "js",
    question: "What does 'JSON.parse()' do?",
    options: [
      "Converts a JavaScript object to a JSON string",
      "Converts a JSON string into a JavaScript object",
      "Deletes a JSON file",
      "Sends JSON data to a server"
    ],
    correct: 1,
    explanation: "JSON.parse() takes a JSON-formatted string and converts it into a JavaScript object or value. The reverse operation is JSON.stringify(), which converts an object to a JSON string."
  },
  {
    id: 28,
    category: "js",
    question: "What is a callback function?",
    options: [
      "A function that calls itself",
      "A function passed as an argument to another function",
      "A function that runs before the page loads",
      "A function that returns another function"
    ],
    correct: 1,
    explanation: "A callback function is a function that is passed as an argument to another function and is executed later, usually after an asynchronous operation completes or when an event occurs."
  },
  {
    id: 29,
    category: "js",
    question: "What does 'localStorage.setItem(key, value)' do?",
    options: [
      "Creates a cookie",
      "Saves data to the server",
      "Stores a key-value pair in the browser that persists after closing the tab",
      "Sends data to an API"
    ],
    correct: 2,
    explanation: "localStorage.setItem() saves a key-value pair in the browser's local storage. The data persists even after the browser is closed and reopened. Both key and value are stored as strings."
  },
  {
    id: 30,
    category: "js",
    question: "What does the 'map()' method do on an array?",
    options: [
      "Removes elements that don't match a condition",
      "Finds the first matching element",
      "Creates a new array by applying a function to each element",
      "Sorts the array in ascending order"
    ],
    correct: 2,
    explanation: "The map() method creates a new array by calling a provided function on every element of the original array. It does not modify the original array. filter() removes non-matching elements, and find() returns the first match."
  }
];
