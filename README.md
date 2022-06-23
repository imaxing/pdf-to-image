
# pdf-to-image
> 读取pdf转为图片


## 使用
```
import pdfToImage from '@/iamgx/pdf-to-image'

pdfToImage({
  url: '', // 完整的pdf文件地址
  pdfjsLib: window.pdfjsLib // 引入js文件, https://cdn.jsdelivr.net/npm/pdfjs-dist@2.14.305/build/pdf.min.js
}).then(images => {
  console.log(image);
})
```
