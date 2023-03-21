import React from 'react';
import { IoLockOpen } from 'react-icons/io5';

// Components
import CWButton from '../common/CWButton';
import ColorPicker from './ColorPicker';
import ColorCopy from './ColorCopy';

// Utils
import { rgbToHex } from '../../utils/utils';
import { getContrast } from '../../utils/utils';

const ColorGenerator = ({ data, refetch }) => {
  console.log(data);

  return (
    <div className="color-generator">
      <h1 className="color-generator__heading">Color Generator</h1>
      <p className="color-generator__paragraph">
        Press <b>spacebar</b> or click the <b>generate</b> button in order to
        generate new color palettes
      </p>
      <div className="color-generator__colors py-4">
        {data.map((color, index) => {
          const hex = rgbToHex(color[0], color[1], color[2]);
          return (
            <div
              key={index}
              className="color-generator__color"
              style={{
                backgroundColor: hex,
                color: getContrast(hex),
              }}
            >
              <h5 className="color-generator__hex">{hex}</h5>
              <div className="color-generator__settings">
                <div>
                  <IoLockOpen />
                </div>
                <ColorPicker hex={hex} />
                <ColorCopy hex={hex} />
              </div>
            </div>
          );
        })}
      </div>
      <CWButton onClick={refetch}>Generate</CWButton>
    </div>
  );
};

export default ColorGenerator;
