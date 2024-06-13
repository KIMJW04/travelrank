import React from 'react';

const Arrow = (props) => {
    const { className, style, onClick, direction } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: 'none', zIndex: 10 }}
            onClick={onClick}
        >
            {direction === 'left' ? '<' : '>'}
        </div>
    );
};

export const NextArrow = (props) => <Arrow {...props} direction="right" />;
export const PrevArrow = (props) => <Arrow {...props} direction="left" />;
