import React from 'react';
import {
    Alert,
    Card,
    CardBody,
    CardGroup,
    CardImg,
    CardTitle,
    Col
} from "reactstrap";

export default function ResultItems(props) {
    const { results } = props;
    const noResults = (results && results.nbHits === 0);

    // ToDo: Show pagination and handle multiple page results
    return (
        <CardGroup>
            { results && results.hits && results.hits.map(item => (
                <Col lg={ 3 } sm={ 6 } className='mb-3' key={ item.objectID }>
                    <Card>
                        <CardImg top width="100%" src={ item.image } alt={ item.description } />
                        <CardBody>
                            <CardTitle className='text-center'>{ item.name }</CardTitle>
                        </CardBody>
                    </Card>
                </Col>
            )) }
            { noResults && (
                <Alert color="secondary" className='w-100 text-center'>
                    No matching items found.
                </Alert>
            )}
        </CardGroup>
    )
}
