import styled from 'styled-components';
import { colorBase } from '../utils/colors';

export const CleanA = styled.a`
  cursor: pointer;
  :visited,
  :link {
    color: ${colorBase};
    text-decoration: none;
  }
`;

export default CleanA;
