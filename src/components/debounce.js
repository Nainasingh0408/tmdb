export const debounce = (func, delay) => {
    let timeoutID = null;
  
    return function (...args) {
      const context = this;
  
      clearTimeout(timeoutID);
  
      timeoutID = setTimeout(() => {
        timeoutID = null;
  
        func.apply(context, args);
      }, delay);
    };
  };