import React from 'react';

interface CardProps {
    image: string;
    title: string;
    description: string;
    reviews: number;
    price: number;
}

const CardComponent: React.FC<CardProps> = ({
    image,
    title,
    description,
    reviews,
    price,
}) => {
    return (
        <div className="card mb-4" style={{ width: '100%' }}>
            <img src={image} className="card-img-top" alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <div className="d-flex justify-content-between">
                    <span>리뷰 {reviews}</span>
                    <span>평균 {price}원</span>
                </div>
            </div>
        </div>
    );
};

export default CardComponent;
