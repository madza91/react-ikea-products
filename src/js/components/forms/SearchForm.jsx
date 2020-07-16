import React from 'react';
import * as PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input } from 'reactstrap';

export default class SearchForm extends React.Component {
    static propTypes = {
        getProducts: PropTypes.func,
        abortController: PropTypes.object,
        waitTime: PropTypes.number // ms delay
    }

    static defaultProps = {
        waitTime: 200
    }

    constructor(props) {
        super(props);
        this.state = {
            waitTime: 200 // ms delay
        };
        this.timeout = null
    }

    /**
     * Get products by search query with debounce od 200ms
     * @param inputValue
     */
    onInputChange = (inputValue) => {
        const { getProducts, abortController, waitTime } = this.props;

        // If http request is pending, cancel it
        if (abortController) {
            abortController.abort();
        }

        // Reset the time counter if one is already started
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        // Get products after a delay of 200 ms
        this.timeout = setTimeout(() => {
            this.timeout = null;
            getProducts(inputValue)
        }, waitTime);
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="searchField">Search for products</Label>
                    <Input
                        type="text"
                        name="query"
                        id="searchField"
                        placeholder="cheese"
                        onChange={event => this.onInputChange(event.target.value) }
                    />
                </FormGroup>
            </Form>
        );
    }
}
