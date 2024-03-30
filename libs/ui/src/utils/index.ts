import { css } from 'styled-components';

export type TWeight = 'thin' | 'medium' | 'bold';
export type TAxis = 'X' | 'Y';
export type TPosition = 'absolute' | 'relative' | 'fixed';


export type TFlexAlign =
  | 'stretch'
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'baseline';

export interface IPositionStyle {
  position?: TPosition;
  top?: string | number | null;
  right?: string | number | null;
  bottom?: string | number | null;
  left?: string | number | null;
  axisCenter?: TAxis | null;
}

/**
 * display: flex row-direction axis center 맞춤
 * @param inline inline flex 여부
 */
export function rowFlexCenter(inline = false) {
  return css`
    display: ${inline ? 'inline-flex' : 'flex'};
    align-items: center;
    min-width: 0;
  `;
}

/**
 * display: flex column-direction axis center 맞춤
 * @param inline inline flex 여부
 */
export function columnFlexCenter(inline = false) {
  return css`
    display: ${inline ? 'inline-flex' : 'flex'};
    flex-direction: column;
    align-items: center;
  `;
}

/**
 * Element의 가로 세로값을 정한다. 세로값이 없으면 가로세로 값이 같도록 한다.
 * @param width Element 가로값
 * @param height Element 세로값
 * @returns emotion Serialized css
 */
export function size(width: string, height?: string) {
  return css`
    width: ${width};
    height: ${height || width};
  `;
}

/**
 * 말줄임 관련 css
 * @param lineCount 1이면 한줄, 1보다 높다면 멀티라인
 * @returns emotion Serialized css
 */
export function ellipsis(lineCount = 1) {
  const multiLineCss =
    lineCount > 1
      ? css`
          -webkit-box-orient: vertical;
          -webkit-line-clamp: ${lineCount};
          display: -webkit-box;
        `
      : css`
          white-space: nowrap;
        `;

  return css`
    overflow: hidden;
    text-overflow: ellipsis;
    ${multiLineCss};
  `;
}

/**
 * position 속성에 관한 mixin
 * @param position position 값
 * @param top top 값
 * @param right right 값
 * @param bottom bottom 값
 * @param left left 값
 * @param axisCenter X축 또는 Y축으로 중앙 정렬 여부
 * @returns emotion Serialized css
 */
export function position({
  position = 'absolute',
  top = null,
  right = null,
  left = null,
  bottom = null,
  axisCenter = null,
}: IPositionStyle) {
  return css`
    position: ${position};
    ${top !== null && `top: ${top}`};
    ${right !== null && `right: ${right}`};
    ${bottom !== null && `bottom: ${bottom}`};
    ${left !== null && `left: ${left}`};
    ${axisCenter && `transform: translate${axisCenter}(-50%)`};
  `;
}

/**
 * 가로 세로 풀 속성의 position layer
 * @param fixed positino 속성중 fixed를 쓸지 absolute를 쓸지에 대한 여부
 * @returns emotion Serialized css
 */
export function posfull(fixed = false) {
  return position({
    position: fixed ? 'fixed' : 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });
}

/**
 * position left top shortcur
 */
export function poslt(
  left: string | number,
  top: string | number,
  axisCenter?: TAxis
) {
  return position({ left, top, axisCenter });
}

/**
 * position right top shortcut
 */
export function posrt(
  right: string | number,
  top: string | number,
  axisCenter?: TAxis
) {
  return position({ right, top, axisCenter });
}

/**
 * position left bottom shortcut
 */
export function poslb(
  left: string | number,
  bottom: string | number,
  axisCenter?: TAxis
) {
  return position({ left, bottom, axisCenter });
}

/**
 * position right bottom shortcut
 */
export function posrb(
  right: string | number,
  bottom: string | number,
  axisCenter?: TAxis
) {
  return position({ right, bottom, axisCenter });
}

/**
 * font family (type: LIFEPLUS, LIFEPLUSBODY)
 */
// export function setFontFamily(type: 'LIFEPLUS' | 'LIFEPLUS_BODY' | string) {
//   return `font-family: '${type}', system-ui, -apple-system, 'Segoe UI', Roboto,
//   'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif,
//   'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
//   'Noto Color Emoji';`;
// }

/**
 * font-weight 값을 구한다.
 * @param type font-weight 속성
 * @returns emotion Serialized css
 */
export function getFontWeight(type: TWeight) {
  const weightValue = {
    thin: 300,
    medium: 500,
    bold: 700,
  };

  return css`
    font-weight: ${weightValue[type]};
  `;
}

/**
 * 폰트 관련 스타일 set을 통해 공통의 폰트 style을 구한다.
 * @param fontset 폰트컬러 / 폰트사이즈 / 폰트 행간 / 폰트 자간 순서로 이루어진 배열
 * @returns emotion Serialized css
 */
export function getFontstyle(fontset: string[] = []) {
  const color = fontset[0];
  const fontSize = fontset[1];
  const lineHeight = fontset[2];
  const letterSpacing = fontset[3];

  return css`
    ${convertStyle({ color, fontSize, lineHeight, letterSpacing })};
  `;
}

export function getScrollCss(scroll: TAxis) {
  if (!scroll) {
    return null;
  }

  const isX = scroll === 'X';

  return css`
    ${`overflow-${scroll}: auto`};
    ${`overflow-${isX ? 'y' : 'x'}: hidden`};
    overscroll-behavior: contain;
  `;
}

export function convertStyle(styles: any) {
  const keyArr = (Object.keys(styles)) || [];
  const exceptionKeys = [
    'children',
    'theme',
    'as',
    'fontSet',
    'style',
    'class-name',
    'id',
  ];

  if (!keyArr.length) {
    return [];
  }

  return keyArr.map((key) => {
    const cssKey = key
      .split(/(?=[A-Z])/)
      .join('-')
      .toLowerCase();
    const value = styles[key];

    return value && !exceptionKeys.includes(cssKey) && `${cssKey}: ${value};`;
  });
}
