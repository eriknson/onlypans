import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import { Text, Badge, Dot } from '@geist-ui/react'
import * as React from 'react'
import { fontBase } from '../../utils/fonts'
import { gutter } from '../../utils/constants'
import { sizes } from '../../utils/media'
import { formatProductName } from '../../utils/formatter'

const Wrapper = styled(motion.div)`
  background: white;
  border-radius: 2rem;
  padding: ${gutter * 2}px;
`

const ImageArea = styled.div`
  background: #ffffff;
  border-radius: ${(props) => props.theme.borderRadiusBase}px;
  padding: ${(props) => props.theme.gutter}px;
  height: 180px;
  margin-bottom: 8px;

  @media (max-width: ${sizes.phone}px) {
    height: ${(props) => (props.fullSize ? '230px' : '180px')};
  }
`

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`

const InfoArea = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`

const textStyles = css`
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline;
`

const ProductBrandText = styled(Text)`
  ${textStyles}
  display: block;
  font-size: ${fontBase}px;
`

const ProductNameText = styled(Text)`
  ${textStyles}
  font-size: ${fontBase}px;
`

const ProductPriceText = styled(Text)`
  ${textStyles}
`

const StockText = styled(Text)`
  margin: 0;
  font-size: 12.5px;
`

const BottomArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ProductItem = ({ product, fullSize = false }) => {
  const { imageUrl, brand, name, price, inStock } = product

  return (
    <Wrapper whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <InfoArea>
        <ProductBrandText p b>
          {brand}
        </ProductBrandText>
        <ProductNameText p>{formatProductName(brand, name)}</ProductNameText>
        <StockText type='secondary' p>
          <Dot type={inStock ? 'success' : 'warning'} />
          {inStock ? 'In stock' : 'Out of stock'}
        </StockText>
      </InfoArea>
      <ImageArea fullSize={fullSize}>
        <Img src={imageUrl} />
      </ImageArea>
      <BottomArea>
        <Badge type='success'>
          <ProductPriceText p b>
            {price} kr
          </ProductPriceText>
        </Badge>
      </BottomArea>
    </Wrapper>
  )
}

export default ProductItem
