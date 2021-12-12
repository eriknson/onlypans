export const formatProductName = (brand, name) => {
  return name
    .replace(brand, '')
    .replace('Stekpanna', '')
    .replace(/^-+|-+$/g, '')
}
