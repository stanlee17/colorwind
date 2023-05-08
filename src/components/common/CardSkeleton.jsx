import React, { Fragment } from 'react';
import Skeleton from 'react-loading-skeleton';

const CardSkeleton = ({ savedCards, colorCards }) => {
  return (
    <Fragment>
      <div className="card-skeleton py-4">
        <div className="colors py-4">
          {Array(colorCards)
            .fill(0)
            .map((_, i) => (
              <Skeleton height={350} className="color-skeleton" key={i} />
            ))}
        </div>
        <div className="colors-button">
          <div className="color-button">
            <Skeleton className="skeleton-button" />
            <Skeleton className="skeleton-text" />
          </div>
          <div className="color-button">
            <Skeleton className="skeleton-button" />
            <div className="skeleton-button-wrapper">
              <Skeleton className="skeleton-button" />
            </div>
          </div>
        </div>
      </div>
      <div className="colors-library">
        <Skeleton className="skeleton-heading" />
        <div className="saved-colors-skeleton">
          {Array(savedCards)
            .fill(0)
            .map((_, i) => (
              <div className="saved-color" key={i}>
                <Skeleton width={300} className="saved-color-skeleton" />
                <div className="saved-color-content">
                  <Skeleton
                    width={100}
                    height={20}
                    style={{ borderRadius: '50px' }}
                  />
                  <div className="saved-color-buttons">
                    <Skeleton
                      width={30}
                      height={20}
                      className="me-2"
                      style={{ borderRadius: '50px' }}
                    />
                    <Skeleton
                      width={30}
                      height={20}
                      style={{ borderRadius: '50px' }}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default CardSkeleton;
