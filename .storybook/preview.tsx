import React from 'react';

import type { Preview } from '@storybook/react';

import '../src/index.scss';

const darkThemeBackground = '#181818';
const lightThemeBackground = '#F8F8F8';

const handleTheming = (Story, context) => {
  // Hack to make sure that theme gets applied correctly upon Story load.    
  const background = context?.globals?.backgrounds?.value;
  const html = document.querySelector('html');
  html?.removeAttribute('class');

  html?.classList.add(
    (!background || background === darkThemeBackground) ? 'dark' : 'light'
  );

  return <Story />;
};

const preview: Preview = {
  decorators: [handleTheming],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: darkThemeBackground,
        },
        {
          name: 'light',
          value: lightThemeBackground,
        }
      ]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
