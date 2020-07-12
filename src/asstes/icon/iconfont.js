import { createGlobalStyle } from 'styled-components';
@font-face {
  font - family: "iconfont";
  src: url('./iconfont.eot?t=1592985398782'); /* IE9 */
  src: url('./iconfont.eot?t=1592985398782#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
      url('./iconfont.woff?t=1592985398782') format('woff'),
        url('./iconfont.ttf?t=1592985398782') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
          url('./iconfont.svg?t=1592985398782#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font - family: "iconfont"!important;
  font - size: 16px;
  font - style: normal;
  -webkit - font - smoothing: antialiased;
  -moz - osx - font - smoothing: grayscale;
}
export const IconfontStyle = createGlobalStyle;
/* .icon-biye:before {
  content: "\e642";
}

.icon-shengao:before {
  content: "\e637";
}

.icon-rentou:before {
  content: "\e7b2";
}
 */
