import styled from 'styled-components';
import { colorBase, colorVeryLightGray } from '../utils/colors';
import { ProductImage } from './ProductImage';
import { resizeImageUrl } from '../utils/image';
import * as React from 'react';
import { sizes } from '../utils/media';
import { fontBase } from '../utils/fonts';

const Wrapper = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 10px;
`;

const ImageArea = styled.div`
  height: ${(props) => (props.fullSize ? '330px' : '180px')};
  @media (max-width: ${sizes.phone}px) {
    height: ${(props) => (props.fullSize ? '230px' : '180px')};
  }
  background: #ffffff;
  border-radius: ${(props) => props.theme.borderRadiusBase}px;
  padding: ${(props) => props.theme.gutter}px;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

const InfoArea = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SpanName = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 19px;
`;

const HName = styled.h1`
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 19px;
  font-weight: normal;
  margin: 0;
  display: inline;
  font-size: ${fontBase}px;
`;

const TopArea = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Price = styled.span`
  font-weight: 500;
  color: green;
  }
`;

const Name = ({ children, fullSize }) =>
  fullSize ? <HName>{children}</HName> : <SpanName>{children}</SpanName>;

const ProductItem = ({ product, fullSize = false }) => {
  const { imageUrl, name, price } = product;

  return (
    <Wrapper>
      <ImageArea fullSize={fullSize}>
        <Img src={imageUrl} />
      </ImageArea>
      <InfoArea>
        <Name fullSize={fullSize}>{name}</Name>
      </InfoArea>
      <TopArea>
        <Price>{price} kr</Price>
      </TopArea>
    </Wrapper>
  );
};

export default ProductItem;
