export const styleManagerConfig = {
  sectors: [
    {
      name: 'General',
      open: false,
      buildProps: ['float'],
    },
    {
      name: 'Flex',
      open: false,
      buildProps: [
        'flex-direction',
        'flex-wrap',
        'justify-content',
        'align-items',
        'align-content',
        'order',
        'flex-basis',
        'flex-grow',
        'flex-shrink',
        'align-self',
      ],
    },
    {
      name: 'Dimension',
      open: false,
      buildProps: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
    },
    {
      name: 'Typography',
      open: false,
      buildProps: ['font-size', 'font-family', 'letter-spacing', 'color', 'line-height', 'text-align'],
      properties: [
        {
          property: 'font-weight',
          defaults: 'normal',
          list: [{ value: 'normal' }, { value: 'bold' }],
        },
        {
          property: 'font-family',
          // defaults: 'VanCondensedPro',
          list: [{ value: 'VanCondensedPro' }, { value: 'VanCondensedPro-Bold' }],
        },
        {
          property: 'text-align',
          list: [
            { value: 'left', className: 'fa fa-align-left' },
            { value: 'center', className: 'fa fa-align-center' },
            { value: 'right', className: 'fa fa-align-right' },
            { value: 'justify', className: 'fa fa-align-justify' },
          ],
        },
      ],
    },
    {
      name: 'Decorations',
      open: false,
      buildProps: ['border-radius-c', 'background-color', 'border-radius', 'border', 'box-shadow', 'background'],
    },
  ],
};
