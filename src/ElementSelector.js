import { useEffect, useRef } from "react";
import { addClass, manageEvent, removeClass } from "./helper";

export const ElementSelector = ({
  enable,
  customClasses,
  children,
  onSelection,
  multiSelect,
}) => {
  const HOVERED_CLASS = customClasses?.hovered || "hovered";
  const SELECTED_CLASS = customClasses?.selected || "selected";
  const OVERLAY_CLASS = "selectorOverlay";

  const hoveredElements = [];
  let lastHoveredElement = null;

  const containerRef = useRef();
  const overlayRef = useRef();
  const selectedElements = useRef([]);

  const onMouseLeaveHandler = (e) => {
    removeClass(e.target, HOVERED_CLASS);
    removeClass(overlayRef.current, OVERLAY_CLASS);

    // Detach all the event from the element on mouse leave
    manageEvent({
      eventObject: hoveredElementEvents,
      target: e.target,
      removeListener: true,
    });
  };

  // Events to attach on the current hovered element
  const hoveredElementEvents = {
    mouseleave: onMouseLeaveHandler,
  };

  /**
   * Clear the hovered style from all previously hovered elements to
   * show only the current element as hovered
   * **/
  const clearLastHover = () => {
    removeClass(lastHoveredElement, HOVERED_CLASS);
  };

  // Element mouse over handler
  const onMouseOverHandler = (e) => {
    lastHoveredElement && clearLastHover();
    const currentElement = e.target;

    if (!e.target.dataset.noselection) {
      addClass(overlayRef.current, OVERLAY_CLASS);
      addClass(currentElement, HOVERED_CLASS);

      manageEvent({
        eventObject: hoveredElementEvents,
        target: currentElement,
      });

      if (!hoveredElements.includes(currentElement)) {
        hoveredElements.push(currentElement);
      }

      lastHoveredElement = currentElement;
    }
  };

  // Deselect all the elements at once
  const deselectElements = () => {
    selectedElements.current.forEach((element) => {
      element && removeClass(element, SELECTED_CLASS);
    });

    selectedElements.current = [];
  };

  // Element click handler
  const clickHandler = (e) => {
    if (!e.target.dataset.noselection) {
      !multiSelect && deselectElements();

      // Allow selecting multiple components if
      if (!e.target.classList.contains(SELECTED_CLASS)) {
        addClass(e.target, SELECTED_CLASS);
        selectedElements.current = [...selectedElements.current, e.target];
      } else {
        removeClass(e.target, SELECTED_CLASS, true);
      }
    }

    onSelection &&
      onSelection(multiSelect ? selectedElements.current : e.target);
  };

  // Events to attach on the main container
  const containerEvents = {
    mouseover: onMouseOverHandler,
    click: clickHandler,
  };

  // Detach all the events from the
  const detachEvents = () => {
    manageEvent({
      eventObject: containerEvents,
      target: containerRef.current,
      removeListener: true,
      eventOptions: [false],
    });
  };

  useEffect(() => {
    if (enable) {
      manageEvent({
        eventObject: containerEvents,
        target: containerRef.current,
        eventOptions: [false],
      });
    } else {
      detachEvents();
      deselectElements();
    }

    return detachEvents;
  }, [enable, multiSelect]);

  return (
    <>
      <div ref={overlayRef}></div>
      <div className="ElementSelectorContainer" ref={containerRef}>
        {children}
      </div>
    </>
  );
};
