var glob = require("glob")
var fs = require("fs")
 
glob("./audio/**/*.{mp3,wav,flac}", {}, function (er, files) {
  let result = []
  let download = ''
  files.forEach(item => {
    let fileInfo = fs.statSync(item)
    if(fileInfo.size/(1024*1024) < 20) {    // 小于20M
      let arr = item.split('/')
      result.push({
        name: arr[3].replace(/\.(mp3|flac|wav)$/g, ''),   // Extract the file name from the item path by removing the file extension
        artist: arr[2],   // Extract the album name from the item path
        source: 'https://cdn.jsdelivr.net/gh/urzone/jay' + item.slice(1),   // The URL to the audio file, use 'item.slice(1)' to remove '.' from the url
        url: 'https://cdn.jsdelivr.net/gh/urzone/jay' + item.slice(1),   // The URL to the audio file
        cover: 'https://cdn.jsdelivr.net/gh/urzone/jay/audio/' + arr[2].replace(/ /g, '%20') + '/cover.jpg',   // The URL to the cover image for the album. The album name with spaces replaced with '%20'.
        favorited: false   // A boolean property indicating whether the song has been favorited
      })
      download += `https://cdn.jsdelivr.net/gh/urzone/jay${item.slice(1)}\n`
    } else {
      console.log('文件大于20M：', item)
    }
  })
  fs.writeFileSync('./list.min.js', "var list = " + JSON.stringify(result))
  fs.writeFileSync('./download.txt', download)
})
