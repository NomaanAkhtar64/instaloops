export function loadCache<T>(key: string, df) {
  if (localStorage[key] === undefined) {
    return df as typeof df
  }
  return localStorage[key] as T
}
