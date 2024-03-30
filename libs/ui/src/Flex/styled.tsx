import styled, { css } from 'styled-components';
import { convertStyle, getScrollCss } from '../utils';

import type { TFlexProps } from '.'

const flex = css<TFlexProps>`
  ${(props) => {
    const {
      direction,
      container,
      inline,
      scroll,
      relative,
      bgColor,
      ...rest
    } = props;

    return css`
      ${convertStyle({ direction, ...rest })};
      ${container && `display: ${inline ? 'inline-flex' : 'flex'}`};
      ${container && direction === 'row' && 'min-width: 0'};
      ${container && direction === 'column' && 'min-height: 0'};
      ${scroll && getScrollCss(scroll)};
      ${relative && 'position: relative'};
      ${bgColor && `background-color: ${bgColor}`};
    `;
  }}
`;

const Styled = {
  Flex: styled.div`
    ${flex};
  `,
};

export default Styled;