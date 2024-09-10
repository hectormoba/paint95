export const queryEl = (selector) => document.querySelector(selector);
export const queryEls = (selector) => document.querySelectorAll(selector);

export const removeAllClassesFromElement = (DOMElement) => {
  const currentStyleClasses = DOMElement?.classList;
  if (!currentStyleClasses) return;
  DOMElement.classList.remove(...currentStyleClasses);
};
