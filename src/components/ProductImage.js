import styled from 'styled-components';
import Loader from './Loader';
import { useEffect, useRef, useState } from 'react';
import { zindexHighest } from '../utils/constants';
import { supportsWebP } from '../utils/webpDetect';
import { useAmp } from 'next/amp';
import * as React from 'react';

const Img = styled.img`
  border: none;
  opacity: 0;
  transition: opacity 250ms;
`;
const imgCache = {};
const imageOnLoad = (target, setIsLoading) => {
  if (target) {
    target.style.opacity = 1;
    setIsLoading(false);
    imgCache[target.src] = true;
  }
};

const LoaderWrapper = styled.div`
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: ${zindexHighest};
`;

let webpIsSupported;

export const ProductImage = (props) => {
  const { srcJpg, srcWebp, className, alt } = props;
  const isLoaded = Boolean(imgCache[srcJpg] || imgCache[srcWebp]);
  const [isLoading, setIsLoading] = useState(!isLoaded);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current.src) return;

    const img = new Image();

    const loadIt = (supported) => {
      img.src = supported ? srcWebp : srcJpg;
      img.onload = (e) => imageOnLoad(imgRef.current, setIsLoading);
    };

    if (typeof webpIsSupported === 'boolean') {
      loadIt(webpIsSupported);
    } else {
      supportsWebP().then((supported) => {
        webpIsSupported = supported;
        loadIt(supported);
      });
    }

    return () => {
      img.onload = () => {};
    };
  }, []);

  return (
    <>
      {isLoading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
      <noscript>
        <Img
          style={{ opacity: 1 }}
          alt={alt}
          className={className}
          src={srcJpg}
        />
      </noscript>
      {useAmp() ? (
        React.createElement('amp-img', {
          src: srcJpg,
          layout: 'fill',
          class: 'contain',
        })
      ) : (
        <picture style={{ height: '100%' }}>
          <source data-srcset={srcWebp} type="image/webp" />
          <source data-srcset={srcJpg} type="image/jpeg" />
          <Img
            ref={imgRef}
            alt={alt}
            data-src={srcJpg}
            onLoad={(e) => imageOnLoad(e.target, setIsLoading)}
            className={`${className} lazyload`}
          />
        </picture>
      )}
    </>
  );
};
