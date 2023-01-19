// Reusable function to add and remove event listeners
export const manageEvent = ({
  eventObject,
  target,
  removeListener = false,
  eventOptions = []
}) => {
  let eventAction = removeListener ? "removeEventListener" : "addEventListener";

  Object.keys(eventObject).forEach((e) => {
    target[eventAction](e, eventObject[e], ...eventOptions);
  });
};

export const manageClass = (element, className, remove = false) => {
  const action = remove ? "remove" : "add";
  element.classList[action](className);
};
