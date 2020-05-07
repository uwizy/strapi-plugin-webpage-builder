export const editorConfig = {
  clearStyles: true,
  // avoidDefaults: 1,
  protectedCss: '',
  baseCss: ` * {
      box-sizing: border-box;
    }
    html, body, [data-gjs-type=wrapper] {
      min-height: 100%;
      font-family: VanCondensedPro;
    }
    body {
      margin: 0;
      height: 100%;
      background-color: #ebebeb
    }
    [data-gjs-type=wrapper] {
      overflow: auto;
      overflow-x: scroll;
    }
    * ::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1)
    }
    * ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2)
    }
    * ::-webkit-scrollbar {
      width: 10px
    }`,
  cssIcons: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css',
  noticeOnUnload: false,
};
