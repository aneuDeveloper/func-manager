export function getSearchParam(urlAsString, param) {
  const url = new URL(urlAsString);
  const value = url.searchParams.get(param);
  return value;
}

export function list(param) {}
