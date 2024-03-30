import { forwardRef, PropsWithChildren, CSSProperties } from 'react';

import type { TAxis, TFlexAlign } from '../utils';
import Styled from './styled';

export interface TFlexProps {
  /** margin값 */
  margin?: string;
  /** padding값 */
  padding?: string;
  /** className */
  className?: string;
  /** position: relative 여부 */
  relative?: boolean;
  /** style: relative 여부 */
  style?: CSSProperties;
  /** Flex container에 대한 여부 */
  container?: boolean;
  /** inline Flex에 대한 여부  */
  inline?: boolean;
  /** Flex Axis 값 */
  direction?: 'row' | 'column';
  /** justify-content 값 */
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around';
  /** flex-wrap 값 */
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  /** align-items 값 */
  alignItems?: TFlexAlign;
  /** flex grow / shirnk / basis 축약형 값 */
  flex?: string | number;
  /** 스크롤 사용 여부 */
  scroll?: TAxis;
  /** background-color */
  bgColor?: string;
}

const Flex = forwardRef<HTMLDivElement, PropsWithChildren<TFlexProps>>((props, ref) => {
  const { children, ...rest } = props;

  return (
    <Styled.Flex ref={ref} {...rest}>
      {children}
    </Styled.Flex>
  );
});

export default Flex;
