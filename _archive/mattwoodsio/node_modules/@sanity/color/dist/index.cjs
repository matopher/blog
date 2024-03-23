'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
const COLOR_HUES = ["gray", "blue", "purple", "magenta", "red", "orange", "yellow", "green", "cyan"];
const COLOR_TINTS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];
function hslToRgb(hsl) {
  const h = hsl[0];
  const s = hsl[1] / 100;
  const l = hsl[2] / 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
}
function rgbToHex(_ref) {
  let [r, g, b] = _ref;
  const _r = Math.round(r);
  const _g = Math.round(g);
  const _b = Math.round(b);
  return "#" + ((1 << 24) + (_r << 16) + (_g << 8) + _b).toString(16).slice(1);
}
function buildTints(options) {
  const {
    hueKey,
    color
  } = options;
  return COLOR_TINTS.reduce((acc, tintKey) => {
    const tint = Number(tintKey);
    const rgb = hslToRgb(color.tints[tintKey].hsl);
    const hex = rgbToHex([Math.round(rgb[0]), Math.round(rgb[1]), Math.round(rgb[2])]);
    acc[tintKey] = {
      title: "".concat(hueKey.slice(0, 1).toUpperCase()).concat(hueKey.slice(1), " ").concat(tint),
      hex
    };
    return acc;
  }, {});
}
const black = {
  title: "Black",
  hex: "#0d0e12"
};
const white = {
  title: "White",
  hex: "#ffffff"
};
const gray = {
  "50": {
    title: "Gray 50",
    hex: "#f6f6f8"
  },
  "100": {
    title: "Gray 100",
    hex: "#eeeef1"
  },
  "200": {
    title: "Gray 200",
    hex: "#e3e4e8"
  },
  "300": {
    title: "Gray 300",
    hex: "#bbbdc9"
  },
  "400": {
    title: "Gray 400",
    hex: "#9499ad"
  },
  "500": {
    title: "Gray 500",
    hex: "#727892"
  },
  "600": {
    title: "Gray 600",
    hex: "#515870"
  },
  "700": {
    title: "Gray 700",
    hex: "#383d51"
  },
  "800": {
    title: "Gray 800",
    hex: "#252837"
  },
  "900": {
    title: "Gray 900",
    hex: "#1b1d27"
  },
  "950": {
    title: "Gray 950",
    hex: "#13141b"
  }
};
const blue = {
  "50": {
    title: "Blue 50",
    hex: "#f5f8ff"
  },
  "100": {
    title: "Blue 100",
    hex: "#e5edff"
  },
  "200": {
    title: "Blue 200",
    hex: "#dbe5ff"
  },
  "300": {
    title: "Blue 300",
    hex: "#a8bfff"
  },
  "400": {
    title: "Blue 400",
    hex: "#7595ff"
  },
  "500": {
    title: "Blue 500",
    hex: "#556bfc"
  },
  "600": {
    title: "Blue 600",
    hex: "#4043e7"
  },
  "700": {
    title: "Blue 700",
    hex: "#2927aa"
  },
  "800": {
    title: "Blue 800",
    hex: "#192457"
  },
  "900": {
    title: "Blue 900",
    hex: "#161a41"
  },
  "950": {
    title: "Blue 950",
    hex: "#101228"
  }
};
const purple = {
  "50": {
    title: "Purple 50",
    hex: "#f8f5ff"
  },
  "100": {
    title: "Purple 100",
    hex: "#f1ebff"
  },
  "200": {
    title: "Purple 200",
    hex: "#ece1fe"
  },
  "300": {
    title: "Purple 300",
    hex: "#ccb1fc"
  },
  "400": {
    title: "Purple 400",
    hex: "#b087f7"
  },
  "500": {
    title: "Purple 500",
    hex: "#8f57ef"
  },
  "600": {
    title: "Purple 600",
    hex: "#721fe5"
  },
  "700": {
    title: "Purple 700",
    hex: "#4c1a9e"
  },
  "800": {
    title: "Purple 800",
    hex: "#2f1862"
  },
  "900": {
    title: "Purple 900",
    hex: "#23173f"
  },
  "950": {
    title: "Purple 950",
    hex: "#181128"
  }
};
const magenta = {
  "50": {
    title: "Magenta 50",
    hex: "#fef6f9"
  },
  "100": {
    title: "Magenta 100",
    hex: "#fde8ef"
  },
  "200": {
    title: "Magenta 200",
    hex: "#fcdee9"
  },
  "300": {
    title: "Magenta 300",
    hex: "#f7abc5"
  },
  "400": {
    title: "Magenta 400",
    hex: "#f0709b"
  },
  "500": {
    title: "Magenta 500",
    hex: "#e72767"
  },
  "600": {
    title: "Magenta 600",
    hex: "#b11651"
  },
  "700": {
    title: "Magenta 700",
    hex: "#7c1342"
  },
  "800": {
    title: "Magenta 800",
    hex: "#4b1130"
  },
  "900": {
    title: "Magenta 900",
    hex: "#341325"
  },
  "950": {
    title: "Magenta 950",
    hex: "#1f0f14"
  }
};
const red = {
  "50": {
    title: "Red 50",
    hex: "#fff6f5"
  },
  "100": {
    title: "Red 100",
    hex: "#ffe7e5"
  },
  "200": {
    title: "Red 200",
    hex: "#ffdedc"
  },
  "300": {
    title: "Red 300",
    hex: "#fdada5"
  },
  "400": {
    title: "Red 400",
    hex: "#f77769"
  },
  "500": {
    title: "Red 500",
    hex: "#ef4434"
  },
  "600": {
    title: "Red 600",
    hex: "#cc2819"
  },
  "700": {
    title: "Red 700",
    hex: "#8b2018"
  },
  "800": {
    title: "Red 800",
    hex: "#4d1714"
  },
  "900": {
    title: "Red 900",
    hex: "#321615"
  },
  "950": {
    title: "Red 950",
    hex: "#1e1011"
  }
};
const orange = {
  "50": {
    title: "Orange 50",
    hex: "#fff7f0"
  },
  "100": {
    title: "Orange 100",
    hex: "#ffeadb"
  },
  "200": {
    title: "Orange 200",
    hex: "#ffddc7"
  },
  "300": {
    title: "Orange 300",
    hex: "#ffb685"
  },
  "400": {
    title: "Orange 400",
    hex: "#ff8e42"
  },
  "500": {
    title: "Orange 500",
    hex: "#fa6400"
  },
  "600": {
    title: "Orange 600",
    hex: "#b14802"
  },
  "700": {
    title: "Orange 700",
    hex: "#7c3404"
  },
  "800": {
    title: "Orange 800",
    hex: "#461e07"
  },
  "900": {
    title: "Orange 900",
    hex: "#32160b"
  },
  "950": {
    title: "Orange 950",
    hex: "#21120d"
  }
};
const yellow = {
  "50": {
    title: "Yellow 50",
    hex: "#fefae1"
  },
  "100": {
    title: "Yellow 100",
    hex: "#fcf3bb"
  },
  "200": {
    title: "Yellow 200",
    hex: "#f9e994"
  },
  "300": {
    title: "Yellow 300",
    hex: "#f7d455"
  },
  "400": {
    title: "Yellow 400",
    hex: "#f9bc15"
  },
  "500": {
    title: "Yellow 500",
    hex: "#d28a04"
  },
  "600": {
    title: "Yellow 600",
    hex: "#965908"
  },
  "700": {
    title: "Yellow 700",
    hex: "#653a0b"
  },
  "800": {
    title: "Yellow 800",
    hex: "#3b220c"
  },
  "900": {
    title: "Yellow 900",
    hex: "#271a11"
  },
  "950": {
    title: "Yellow 950",
    hex: "#181410"
  }
};
const green = {
  "50": {
    title: "Green 50",
    hex: "#e7fef5"
  },
  "100": {
    title: "Green 100",
    hex: "#c5fce8"
  },
  "200": {
    title: "Green 200",
    hex: "#a9f9dc"
  },
  "300": {
    title: "Green 300",
    hex: "#59f3ba"
  },
  "400": {
    title: "Green 400",
    hex: "#0ff0a1"
  },
  "500": {
    title: "Green 500",
    hex: "#04b97a"
  },
  "600": {
    title: "Green 600",
    hex: "#01794f"
  },
  "700": {
    title: "Green 700",
    hex: "#015133"
  },
  "800": {
    title: "Green 800",
    hex: "#023120"
  },
  "900": {
    title: "Green 900",
    hex: "#06231a"
  },
  "950": {
    title: "Green 950",
    hex: "#071715"
  }
};
const cyan = {
  "50": {
    title: "Cyan 50",
    hex: "#e7fefe"
  },
  "100": {
    title: "Cyan 100",
    hex: "#c5fcfc"
  },
  "200": {
    title: "Cyan 200",
    hex: "#96f8f8"
  },
  "300": {
    title: "Cyan 300",
    hex: "#62efef"
  },
  "400": {
    title: "Cyan 400",
    hex: "#18e2e2"
  },
  "500": {
    title: "Cyan 500",
    hex: "#04b8be"
  },
  "600": {
    title: "Cyan 600",
    hex: "#037782"
  },
  "700": {
    title: "Cyan 700",
    hex: "#024950"
  },
  "800": {
    title: "Cyan 800",
    hex: "#042f34"
  },
  "900": {
    title: "Cyan 900",
    hex: "#072227"
  },
  "950": {
    title: "Cyan 950",
    hex: "#0d181c"
  }
};
const hues = {
  gray,
  blue,
  purple,
  magenta,
  red,
  orange,
  yellow,
  green,
  cyan
};
const color = {
  black,
  white,
  ...hues
};
const config = {
  black: {
    title: "Black",
    hsl: [225, 16, 6]
  },
  white: {
    title: "White",
    hsl: [0, 0, 100]
  },
  gray: {
    title: "Gray",
    tints: {
      50: {
        title: "Gray 50",
        hsl: [240, 12, 97]
      },
      100: {
        title: "Gray 100",
        hsl: [240, 10, 94]
      },
      200: {
        title: "Gray 200",
        hsl: [231, 10, 90]
      },
      300: {
        title: "Gray 300",
        hsl: [232, 11, 76]
      },
      400: {
        title: "Gray 400",
        hsl: [228, 13, 63]
      },
      500: {
        title: "Gray 500",
        hsl: [229, 13, 51]
      },
      600: {
        title: "Gray 600",
        hsl: [228, 16, 38]
      },
      700: {
        title: "Gray 700",
        hsl: [229, 18, 27]
      },
      800: {
        title: "Gray 800",
        hsl: [229, 19, 18]
      },
      900: {
        title: "Gray 900",
        hsl: [228, 19, 13]
      },
      950: {
        title: "Gray 950",
        hsl: [233, 17, 9]
      }
    }
  },
  blue: {
    title: "Blue",
    tints: {
      50: {
        title: "Blue 50",
        hsl: [222, 100, 98]
      },
      100: {
        title: "Blue 100",
        hsl: [222, 100, 95]
      },
      200: {
        title: "Blue 200",
        hsl: [223, 100, 93]
      },
      300: {
        title: "Blue 300",
        hsl: [224, 100, 83]
      },
      400: {
        title: "Blue 400",
        hsl: [226, 100, 73]
      },
      500: {
        title: "Blue 500",
        hsl: [232, 96, 66]
      },
      600: {
        title: "Blue 600",
        hsl: [239, 78, 58]
      },
      700: {
        title: "Blue 700",
        hsl: [241, 63, 41]
      },
      800: {
        title: "Blue 800",
        hsl: [230, 55, 22]
      },
      900: {
        title: "Blue 900",
        hsl: [234, 49, 17]
      },
      950: {
        title: "Blue 950",
        hsl: [235, 43, 11]
      }
    }
  },
  purple: {
    title: "Purple",
    tints: {
      50: {
        title: "Purple 50",
        hsl: [260, 95, 98]
      },
      100: {
        title: "Purple 100",
        hsl: [260, 98, 96]
      },
      200: {
        title: "Purple 200",
        hsl: [263, 96, 94]
      },
      300: {
        title: "Purple 300",
        hsl: [262, 92, 84]
      },
      400: {
        title: "Purple 400",
        hsl: [262, 88, 75]
      },
      500: {
        title: "Purple 500",
        hsl: [262, 83, 64]
      },
      600: {
        title: "Purple 600",
        hsl: [265, 79, 51]
      },
      700: {
        title: "Purple 700",
        hsl: [263, 72, 36]
      },
      800: {
        title: "Purple 800",
        hsl: [258, 60, 24]
      },
      900: {
        title: "Purple 900",
        hsl: [257, 46, 17]
      },
      950: {
        title: "Purple 950",
        hsl: [260, 41, 11]
      }
    }
  },
  magenta: {
    title: "Magenta",
    tints: {
      50: {
        title: "Magenta 50",
        hsl: [340, 82, 98]
      },
      100: {
        title: "Magenta 100",
        hsl: [339, 83, 95]
      },
      200: {
        title: "Magenta 200",
        hsl: [339, 83, 93]
      },
      300: {
        title: "Magenta 300",
        hsl: [340, 82, 82]
      },
      400: {
        title: "Magenta 400",
        hsl: [340, 81, 69]
      },
      500: {
        title: "Magenta 500",
        hsl: [340, 80, 53]
      },
      600: {
        title: "Magenta 600",
        hsl: [337, 78, 39]
      },
      700: {
        title: "Magenta 700",
        hsl: [333, 73, 28]
      },
      800: {
        title: "Magenta 800",
        hsl: [328, 63, 18]
      },
      900: {
        title: "Magenta 900",
        hsl: [327, 46, 14]
      },
      950: {
        title: "Magenta 950",
        hsl: [341, 35, 9]
      }
    }
  },
  red: {
    title: "Red",
    tints: {
      50: {
        title: "Red 50",
        hsl: [5, 100, 98]
      },
      100: {
        title: "Red 100",
        hsl: [4, 100, 95]
      },
      200: {
        title: "Red 200",
        hsl: [4, 98, 93]
      },
      300: {
        title: "Red 300",
        hsl: [5, 95, 82]
      },
      400: {
        title: "Red 400",
        hsl: [6, 90, 69]
      },
      500: {
        title: "Red 500",
        hsl: [5, 85, 57]
      },
      600: {
        title: "Red 600",
        hsl: [5, 78, 45]
      },
      700: {
        title: "Red 700",
        hsl: [4, 70, 32]
      },
      800: {
        title: "Red 800",
        hsl: [3, 58, 19]
      },
      900: {
        title: "Red 900",
        hsl: [2, 41, 14]
      },
      950: {
        title: "Red 950",
        hsl: [356, 30, 9]
      }
    }
  },
  orange: {
    title: "Orange",
    tints: {
      50: {
        title: "Orange 50",
        hsl: [28, 100, 97]
      },
      100: {
        title: "Orange 100",
        hsl: [25, 100, 93]
      },
      200: {
        title: "Orange 200",
        hsl: [24, 100, 89]
      },
      300: {
        title: "Orange 300",
        hsl: [24, 100, 76]
      },
      400: {
        title: "Orange 400",
        hsl: [24, 100, 63]
      },
      500: {
        title: "Orange 500",
        hsl: [24, 100, 49]
      },
      600: {
        title: "Orange 600",
        hsl: [24, 98, 35]
      },
      700: {
        title: "Orange 700",
        hsl: [24, 94, 25]
      },
      800: {
        title: "Orange 800",
        hsl: [22, 82, 15]
      },
      900: {
        title: "Orange 900",
        hsl: [17, 65, 12]
      },
      950: {
        title: "Orange 950",
        hsl: [14, 43, 9]
      }
    }
  },
  yellow: {
    title: "Yellow",
    tints: {
      50: {
        title: "Yellow 50",
        hsl: [51, 94, 94]
      },
      100: {
        title: "Yellow 100",
        hsl: [52, 91, 86]
      },
      200: {
        title: "Yellow 200",
        hsl: [50, 90, 78]
      },
      300: {
        title: "Yellow 300",
        hsl: [47, 91, 65]
      },
      400: {
        title: "Yellow 400",
        hsl: [44, 95, 53]
      },
      500: {
        title: "Yellow 500",
        hsl: [39, 96, 42]
      },
      600: {
        title: "Yellow 600",
        hsl: [34, 90, 31]
      },
      700: {
        title: "Yellow 700",
        hsl: [31, 80, 22]
      },
      800: {
        title: "Yellow 800",
        hsl: [28, 66, 14]
      },
      900: {
        title: "Yellow 900",
        hsl: [24, 40, 11]
      },
      950: {
        title: "Yellow 950",
        hsl: [24, 20, 8]
      }
    }
  },
  green: {
    title: "Green",
    tints: {
      50: {
        title: "Green 50",
        hsl: [157, 89, 95]
      },
      100: {
        title: "Green 100",
        hsl: [158, 89, 88]
      },
      200: {
        title: "Green 200",
        hsl: [158, 87, 82]
      },
      300: {
        title: "Green 300",
        hsl: [158, 86, 65]
      },
      400: {
        title: "Green 400",
        hsl: [159, 88, 50]
      },
      500: {
        title: "Green 500",
        hsl: [159, 96, 37]
      },
      600: {
        title: "Green 600",
        hsl: [159, 98, 24]
      },
      700: {
        title: "Green 700",
        hsl: [158, 98, 16]
      },
      800: {
        title: "Green 800",
        hsl: [158, 91, 10]
      },
      900: {
        title: "Green 900",
        hsl: [162, 72, 8]
      },
      950: {
        title: "Green 950",
        hsl: [172, 51, 6]
      }
    }
  },
  cyan: {
    title: "Cyan",
    tints: {
      50: {
        title: "Cyan 50",
        hsl: [180, 92, 95]
      },
      100: {
        title: "Cyan 100",
        hsl: [180, 91, 88]
      },
      200: {
        title: "Cyan 200",
        hsl: [180, 87, 78]
      },
      300: {
        title: "Cyan 300",
        hsl: [180, 81, 66]
      },
      400: {
        title: "Cyan 400",
        hsl: [180, 81, 49]
      },
      500: {
        title: "Cyan 500",
        hsl: [182, 96, 38]
      },
      600: {
        title: "Cyan 600",
        hsl: [185, 96, 26]
      },
      700: {
        title: "Cyan 700",
        hsl: [185, 95, 16]
      },
      800: {
        title: "Cyan 800",
        hsl: [187, 86, 11]
      },
      900: {
        title: "Cyan 900",
        hsl: [188, 68, 9]
      },
      950: {
        title: "Cyan 950",
        hsl: [196, 37, 8]
      }
    }
  }
};
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error("input is not valid hex");
  }
  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}
function rgbToHsl(_ref2) {
  let [r, g, b] = _ref2;
  r /= 255;
  g /= 255;
  b /= 255;
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;
  if (delta == 0) h = 0;else if (cmax == r) h = (g - b) / delta % 6;else if (cmax == g) h = (b - r) / delta + 2;else h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(0);
  l = +(l * 100).toFixed(0);
  return [h, s, l];
}
function clamp(num) {
  return Math.max(Math.min(num, 255), 0);
}
function darkenChannel(backdrop, source) {
  return Math.min(backdrop, source);
}
function darken(b, s) {
  return [Math.round(clamp(darkenChannel(b[0] / 255, s[0] / 255) * 255)), Math.round(clamp(darkenChannel(b[1] / 255, s[1] / 255) * 255)), Math.round(clamp(darkenChannel(b[2] / 255, s[2] / 255) * 255))];
}
function interpolate(min, max, val) {
  const size = max - min;
  return min + size * val;
}
function limit(darkest, lightest, source) {
  const r = Math.round(interpolate(darkest[0], lightest[0], source[0] / 255));
  const g = Math.round(interpolate(darkest[1], lightest[1], source[1] / 255));
  const b = Math.round(interpolate(darkest[2], lightest[2], source[2] / 255));
  return [r, g, b];
}
function screenChannel(backdrop, source) {
  return backdrop + source - backdrop * source;
}
function screen(b, s) {
  return [Math.round(clamp(screenChannel(b[0] / 255, s[0] / 255) * 255)), Math.round(clamp(screenChannel(b[1] / 255, s[1] / 255) * 255)), Math.round(clamp(screenChannel(b[2] / 255, s[2] / 255) * 255))];
}
exports.COLOR_HUES = COLOR_HUES;
exports.COLOR_TINTS = COLOR_TINTS;
exports.black = black;
exports.blue = blue;
exports.buildTints = buildTints;
exports.color = color;
exports.config = config;
exports.cyan = cyan;
exports.darken = darken;
exports.gray = gray;
exports.green = green;
exports.hexToRgb = hexToRgb;
exports.hslToRgb = hslToRgb;
exports.hues = hues;
exports.limit = limit;
exports.magenta = magenta;
exports.orange = orange;
exports.purple = purple;
exports.red = red;
exports.rgbToHex = rgbToHex;
exports.rgbToHsl = rgbToHsl;
exports.screen = screen;
exports.white = white;
exports.yellow = yellow;
//# sourceMappingURL=index.cjs.map
