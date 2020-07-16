import React from 'react';
import { Container } from 'reactstrap';
import SearchForm from './components/forms/SearchForm'
import AppHeader from "./components/global/AppHeader";
import AppFooter from "./components/global/AppFooter";
import ResultItems from "./components/forms/ResultItems";
import AppLoader from "./components/global/AppLoader";
import '../css/App.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        // Define local state for application
        this.state = {
            error: null,
            isLoading: false,
            results: [],
            hitsPerPage: 16,
            abortController: null
        };
    }

    /**
     * When app is mounted, call initial search, just to look nice for first impression :)
     */
    componentDidMount() {
        this.searchForProducts('');
    }

    /**
     * Fetches products from api by query filter
     * @param query
     */
    searchForProducts = (query) => {
        const { hitsPerPage } = this.state;
        // Prepare params object (shorthanded)
        const paramsObj = { query, hitsPerPage }
        // Convert params to query string
        const params = Object.keys(paramsObj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(paramsObj[k])}`).join('&');

        // Get new instance of AbortController - for canceling http request
        const abortController = new AbortController();

        // Turn on loading indicator (spinner), remove errors, set new abort controller
        this.setState({ isLoading: true, error: null, abortController: abortController });

        /*
        Fetching the products via Ajax
        Note: Api endpoint should be in "api" folder and fetch it with actions (sagas, reducers etc), also, this logic can be moved to the service
        */
        fetch('https://latency-dsn.algolia.net/1/indexes/*/queries?x-algolia-api-key=6be0576ff61c053d5f9a3225e2a90f76&x-algolia-application-id=latency', {
            method: 'POST',
            signal: abortController.signal,
            body: JSON.stringify({
                'requests': [
                    {
                        indexName: 'ikea',
                        params: params
                    }
                ]
            })
        })
            .then(res => res.json())
            .then((result) => {
                // Handle successful response
                this.setState({
                    isLoading: false,
                    results: result.results[0],
                    error: null
                });
            })
            .catch((error) => {
                // Handle error
                this.setState({
                    isLoading: false,
                    results: [],
                    error
                });
            })
    }

    /**
     * Renders application
     * @returns {*}
     */
    render() {
        const { results, isLoading, abortController } = this.state;

        // ToDo: Show errors for unsuccessful request
        return (
            <div className="App">
                <AppHeader/>
                <main>
                    <Container>
                        <SearchForm getProducts={ this.searchForProducts } abortController={ abortController } />
                        { isLoading && <AppLoader /> }
                        { !isLoading && <ResultItems results={ results } /> }
                    </Container>
                </main>
                <AppFooter/>
            </div>
        );
    }
}
