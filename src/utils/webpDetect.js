export const supportsWebP = () => {
  return new Promise((resolve) => {
    const image = new Image();
    image.onerror = function () {
      return resolve(false);
    };
    image.onload = function () {
      return resolve(image.width === 1);
    };
    image.src =
      'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
  }).catch(() => {
    return false;
  });
};
