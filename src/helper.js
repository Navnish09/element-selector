/**
 * Function to add and remove events in a dom element.
 * @param {object} eventObject - Object container event as key and handler as its value
 * @param {*} target - DOM element to add or remove event.
 * @param {boolean} removeListener - To remove the event.
 * @param {object} eventOptions - Options params for eventAction.
 *
 */
export const manageEvent = ({
  eventObject,
  target,
  removeListener = false,
  eventOptions = [],
}) => {
  let eventAction = removeListener ? "removeEventListener" : "addEventListener";

  Object.keys(eventObject).forEach((e) => {
    target[eventAction](e, eventObject[e], ...eventOptions);
  });
};

/**
 * Function to add class to a DOM element.
 * @param {*} element - DOM element to add the className to.
 * @param {string} className - Class name to add to the element.
 */
export const addClass = (element, className) =>
  element.classList.add(className);

/**
 * Function to remove class to a DOM element.
 * @param {*} element - DOM element to remove the className from.
 * @param {string} className - Class name to remove from the element.
 */
export const removeClass = (element, className) =>
  element.classList.remove(className);
