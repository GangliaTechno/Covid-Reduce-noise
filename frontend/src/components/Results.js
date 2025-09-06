import React from 'react';

const Results = ({ results }) => {
    return (
        <div className="results-container">
            <h2>Results</h2>
            {results.length > 0 ? (
                <ul>
                    {results.map((result, index) => (
                        <li key={index}>{result}</li>
                    ))}
                </ul>
            ) : (
                <p>No results available.</p>
            )}
        </div>
    );
};

export default Results;