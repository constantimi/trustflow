/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable object-shorthand */
// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
