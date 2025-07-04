/**
 * Converts a data URL to a Blob object.
 * @param {string} dataUrl - The data URL to convert.
 * @returns {Blob} - The resulting Blob object. 
 */
export default function dataUrlToBlob(dataUrl) {
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}
