export const resizeImageUrl = (url, format = 'jpeg', fullSize = false) => {
  const width = fullSize ? '600' : '600';

  return `https://styleseekcdn.se/?url=${encodeURIComponent(
    url
  )}&width=${width}&format=${format}`;
};
