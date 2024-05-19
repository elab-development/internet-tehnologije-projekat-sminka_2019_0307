import React from 'react';
import PropTypes from 'prop-types';
import {Card} from "react-bootstrap";

const AboutUsCard = props => {

    const {name, description, image} = props;

    return (
        <div>
            <Card >
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

AboutUsCard.propTypes = {
    name : PropTypes.string,
    description : PropTypes.string,
    image : PropTypes.string,
};

export default AboutUsCard;