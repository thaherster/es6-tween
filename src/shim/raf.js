let ROOT = typeof (window) !== 'undefined' ? window : typeof (global) !== 'undefined' ? global : typeof exports !== 'undefined' ? exports : {}
let _vendor = ['webkit', 'moz', 'ms', 'o']
let animFrame = 'AnimationFrame'
let rafSuffixForVendor = 'Request' + animFrame
let cafSuffixForVendor = 'Cancel' + animFrame
let cafSuffixForVendor2 = 'CancelRequest' + animFrame
let _timeout = ROOT.setTimeout
let _clearTimeout = ROOT.clearTimeout

if (_timeout && ROOT.requestAnimationFrame === undefined) {
  let _raf
  let now
  let lastTime = Date.now()
  let frameMs = (50 / 3)
  let fpsSec = frameMs

  _vendor.map(vendor => {
    if ((_raf = ROOT[vendor + rafSuffixForVendor]) === undefined) {
      _raf = (fn) => {
        return _timeout(() => {
          now = Date.now()
          fn(now - lastTime)
          fpsSec = frameMs + (Date.now() - now)
        }, fpsSec)
      }
    }
  })

  if (_raf !== undefined) {
    ROOT.requestAnimationFrame = _raf
  }
}

if (_clearTimeout && ROOT.cancelAnimationFrame === undefined && (ROOT.cancelAnimationFrame = ROOT.cancelRequestAnimationFrame) === undefined) {
  let _caf

  _vendor.map(vendor => {
    if ((_caf = ROOT[vendor + cafSuffixForVendor]) === undefined && (_caf = ROOT[vendor + cafSuffixForVendor2]) === undefined) {
      _caf = (fn) => {
        return _clearTimeout(fn)
      }
    }
  })

  if (_caf !== undefined) {
    ROOT.cancelAnimationFrame = _caf
  }
}