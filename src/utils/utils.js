// FUNCTION: Capitalize first letter
export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// FUNCTION: Converts RGB to HEX
export const rgbToHex = (r, g, b) => {
  return (
    '#' +
    ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()
  );
};

// FUNCTION: Converts HEX to RGB
export const hexToRgb = (hex) => {
  return hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => '#' + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));
};

export const convertToCss = (colorName) => {
  return `--${colorName.split(' ').join('-').toLowerCase()}:`;
};

export const convertToScss = (colorName) => {
  return `$${colorName.split(' ').join('-').toLowerCase()}:`;
};

export const convertToJSON = (colorName) => {
  return `"${colorName.split(' ').join('-').toLowerCase()}":`;
};

// FUNCTION: Switches colors between white/black depending on bg contrast
export const getContrast = (hexcolor) => {
  // If a leading # is provided, remove it
  if (hexcolor.slice(0, 1) === '#') {
    hexcolor = hexcolor.slice(1);
  }

  // If a three-character hexcode, make six-character
  if (hexcolor.length === 3) {
    hexcolor = hexcolor
      .split('')
      .map(function (hex) {
        return hex + hex;
      })
      .join('');
  }

  // Convert to RGB value
  let r = parseInt(hexcolor.substr(0, 2), 16);
  let g = parseInt(hexcolor.substr(2, 2), 16);
  let b = parseInt(hexcolor.substr(4, 2), 16);

  // Get YIQ ratio
  let yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Check contrast
  return yiq >= 128 ? 'black' : 'white';
};

// FUNCTION: Color input settings for API
export const colorInput = (colors) => {
  let input = ['N', 'N', 'N', 'N', 'N'];

  colors.map((color, index) => {
    if (color.isLocked) {
      input[index] = hexToRgb(color.color);
      return input;
    } else {
      return input;
    }
  });

  return input;
};
