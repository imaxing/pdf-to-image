export default ({ url, scale, outputScale = 1, setCanvas, pdfjsLib } = {}) => {
  return new Promise((resolve, reject) => {
    if (!pdfjsLib || !url) return
    const loadingTask = pdfjsLib.getDocument(decodeURIComponent(url))
    scale = scale || window.devicePixelRatio || 1
    const getPdfPageContent = ({ pdf, index }) => {
      return new Promise(_resolve => {
        pdf.getPage(index).then(page => {
          const viewport = page.getViewport({ scale })
          const canvas = document.createElement('canvas')
          const canvasContext = canvas.getContext('2d')
          canvas.width = Math.floor(viewport.width * outputScale)
          canvas.height = Math.floor(viewport.height * outputScale)
          canvas.style.width = Math.floor(viewport.width / outputScale) + 'px'
          canvas.style.height = Math.floor(viewport.height / outputScale) + 'px'
          if (setCanvas) {
            canvas = setCanvas(canvas)
          }

          page.render({ canvasContext, viewport }).promise.then(() => {
            _resolve(canvas.toDataURL('image/png'))
            canvas.remove()
          })
        })
      })
    }

    loadingTask.promise
      .then(pdf => {
        Promise.all(
          Array(pdf.numPages)
            .fill()
            .map((_, index) => getPdfPageContent({ pdf, index: index + 1 }))
        )
          .then(resolve)
          .catch(reject)
      })
      .catch(reject)
  })
}
