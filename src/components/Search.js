import React from "react";
import '../Search.css';
import axios from 'axios';

export class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            results: {},
            loading: false,
            message: ''
        }

    }

    fetchSearchResults = (query) => {
        const url = `https://images-api.nasa.gov/search?q=${query}`

        axios.get(url)
            .then(
                res => {
                    this.setState({
                        results: res.data.collection.items,
                        message: 'sth',
                        loading: false
                    })
                }
            )
            .catch((e) => {
                console.warn(e)
            })
    }

    handleOnInputChange = (event) => {
        const query = event.target.value;
        this.setState({ query: query, loading: true, message: '' }, () => {
            this.fetchSearchResults(query);
        })
    }

    renderSearchResults = () => {
        const { results } = this.state;

        return (
            <div className="results-container">
                {results.map(result => {
                    return (
                        <img src={result[0].href} alt="result"></img>
                    )
                })}
            </div>
        )
    }

    render() {
        const { query } = this.state;
        console.log(this.state);
        return (
            <div className="container">
                <h2 className="heading">Type:</h2>
                <label className="search-label" htmlFor=" search-input">
                    <input
                        type="text"
                        name="query"
                        id="search-input"
                        value={query}
                        placeholder="Moon"
                        onChange={this.handleOnInputChange}
                    />
                </label>

                {this.renderSearchResults()}

            </div>
        )
    }
}
