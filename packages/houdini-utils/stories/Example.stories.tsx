import * as React from 'react';
import {
  blobify,
  registerPaintWorklet,
  fallbackAnimation,
} from '@fluentui-contrib/houdini-utils';

class MyPaintWorklet {
  paint() {
    // painting 🎨🖌️
  }
}

const target = document.getElementById('animated');
registerPaintWorklet(
  URL.createObjectURL(blobify('mypaintworklet', MyPaintWorklet)), ''
).then(() => console.log('registered')) ;

export const Example = () => {
  return <div>Example</div>;
};
