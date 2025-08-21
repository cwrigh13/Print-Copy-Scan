# Print Copy Scan

A user-friendly, multi-language, step-by-step kiosk interface designed to guide library patrons through printing, photocopying and scanning services. This application is a standalone frontend project built with HTML, CSS, and TypeScript, focusing on clarity, accessibility and ease of use.

## Features

- **Guided User Flow:** Takes users through a simple, logical sequence of questions to determine their needs.
- **Service Selection:** Clear options for Printing, Photocopying, and Scanning.
- **Dynamic Cost Calculation:** Calculates and displays the estimated cost of the service based on user input (pages, size, color).
- **Multi-Language Support:** Easily switch between multiple languages. Currently supports:
    - English
    - Mandarin (普通话)
    - Cantonese (粤语)
    - Nepali (नेपाली)
    - Italian (Italiano)
    - Greek (Ελληνικά)
- **Conditional Logic:** Adapts the workflow based on user choices, such as having a library card, sufficient funds, or a USB drive for scanning.
- **Tailored Instructions:** Provides specific, actionable instructions at the end of the process based on the user's service and choices.
- **Responsive Design:** Styled to be clear and legible on kiosk-sized touchscreens.
- **Informational Modals:** Quick access to pricing information without leaving the current step.

## Tech Stack

This project is built with web-native technologies and requires no external frameworks or complex build steps.

- **HTML5:** For the core structure and content.
- **CSS3:** For modern styling, animations, and responsive layout. Uses CSS variables for easy theming.
- **TypeScript:** For the core application logic, state management, and DOM manipulation, providing type safety and improved readability.


## Customization & Configuration

This kiosk is designed to be easily adapted for other library systems.

### Adding/Editing Languages

1.  Open `index.html` and find the `<script type="module">` section.
2.  Locate the `translations` object.
3.  Add a new language object using its two-letter language code (e.g., `'fr'` for French).
4.  Copy the structure from the `'en'` object and translate all the string values.
5.  Add a new language button in the `language-buttons` div in the HTML body.

### Updating Prices

1.  **For Cost Calculation:** In the `calculateCost` function within the script, update the values in the `rates` object.
2.  **For Display Modals:** In the HTML body, find the `price-modal` and `scan-price-modal` divs and update the price text displayed to the user.

### Changing Instructions

All final instruction text is located within the `translations` object in the script. Find the relevant keys (e.g., `final_photocopying_ok`, `final_printing_pc`) and modify the HTML string to match your library's procedures.

### Theming & Styling

The visual theme can be easily changed by modifying the CSS variables at the top of the `index.css` file in the `:root` selector.

```css
:root {
    --primary-color: #00A5A5;
    --background-color: #F9FAFB;
    --text-color: #007582;
    /* ... and more */
}
```


