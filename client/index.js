
// const makeSections = require('./gelId')
const getPixels = require('get-pixels')
const Promise = require('bluebird')

let calibrate;
let calibratePromise = processImageAsync('/lamp/cal.jpg')
calibratePromise.then(dataObj => {
  calibrate = (groupByShade(dataObj.data))
})

let compare;
let comparePromise = processImageAsync('/lamp/218.jpg')
comparePromise.then(dataObj => {
  compare = (groupByShade(dataObj.data))
  // console.log(compare)
})
  .then(() => {
    console.log('HIGHLIGHTS')
    console.log('red decrease', (compare.highlights.blueVred - calibrate.highlights.blueVred).toFixed(1))
    console.log('green decrease', (compare.highlights.blueVgreen - calibrate.highlights.blueVgreen).toFixed(1))
    console.log('MIDS')
    console.log('red decrease', (compare.mids.blueVred - calibrate.mids.blueVred).toFixed(1))
    console.log('green decrease', (compare.mids.blueVgreen - calibrate.mids.blueVgreen).toFixed(1))
    console.log('SHADOWS')
    console.log('red decrease', (compare.shadows.blueVred - calibrate.shadows.blueVred).toFixed(1))
    console.log('green decrease', (compare.shadows.blueVgreen - calibrate.shadows.blueVgreen).toFixed(1))

  })




function processImageAsync(img) {
  return new Promise(function (resolve, reject) {
    getPixels(img, function (err, pixels) {
      if (err) {
        console.log("Bad image path")
        return reject(err)
      }
      resolve(pixels)
    })
  })
}



function groupByShade(imageData) {
  let shades = {
    shadows: [],
    mids: [],
    highlights: []
  }
  const ignore = []
  for (let i = 0; i < imageData.length; i += 4) {
    const red = imageData[i]
    const green = imageData[i + 1]
    const blue = imageData[i + 2]
    if (red > 250 || red < 20) {
      ignore.push(red, green, blue)
      continue;
    }
    else if (red < 100) {
      shades.shadows.push(red, green, blue)
    }
    else if (red < 200) {
      shades.mids.push(red, green, blue)
    }
    else if (red < 250) {
      shades.highlights.push(red, green, blue)
    }
  }
  for (let props in shades) {
    shades[props] = blueShift(shades[props])
  }
  return shades
}


// takes in an array of red, green, blue (no alpha) returns the average lack or surplus of blue compared to red and green
function blueShift(imageData) {
  let tints = { blueVred: [], blueVgreen: [] }
  for (let i = 0; i < imageData.length; i += 3) {
    const red = imageData[i]
    const green = imageData[i + 1]
    const blue = imageData[i + 2]
    tints.blueVred.push(blue - red)
    tints.blueVgreen.push(blue - green)
  }
  console.log('tints', tints)
  if (tints.blueVred.length) {
    const sumRed = tints.blueVred.reduce((a, b) => a + b)
    tints.blueVred = (sumRed / tints.blueVred.length)
    const sumGreen = tints.blueVgreen.reduce((a, b) => a + b)
    tints.blueVgreen = (sumGreen / tints.blueVgreen.length)
  }
  else {
    tints.blueVred = 0
    tints.blueVgreen = 0
  }
  return tints
}
