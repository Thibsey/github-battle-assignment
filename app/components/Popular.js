// Require React Methods and components.
var React = require('react');

// Require PropType Methods and components.
var PropTypes = require('prop-types');

// Require api components from an write axios scripts in the
// utils folder.
var api = require('../utils/api.js');

// Requires the Loading component.
var Loading = require('./Loading');


// Function to select a Programming Language
function SelectLanguage(props) {

    // Array with Programming Languages
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return(
        <ul className='languages'>

            {/* Maps through all the languages in the array above and places
            certain properies in the li as either attributes or as an value
            between the tags */}
            {languages.map(function (lang) {
                return (
                    <li
                        style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
                        onClick={props.onSelect.bind(null, lang)}
                        key={lang}>
                        {lang}
                    </li>
                )
            })}
        </ul>
    )
}


// Function to render a grid
// with most popular GitHub
// Reposotories for the selected language
function RepoGrid(props) {
    return(
        <ul className='popular-list'>

            {/* Maps over the properties of the reposetory information
            send by the GitHub API */}
            {props.repos.map(function (repo, index) {
                return(
                    <li key={repo.name} className='popular-item'>
                        <div className='popular-rank'>#{index + 1}</div>
                        <ul className='space-list-items'>
                            <li>
                                <img
                                    className='avatar'
                                    src={repo.owner.avatar_url}
                                    alt={'Avatar for' + repo.owner.login}
                                />
                            </li>
                            <li><a href={repo.html_url}>{repo.name}</a></li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

// Defines the Proper
RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired,
}


SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}

class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repo: null
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }
    

    updateLanguage(lang) {
        this.setState(function () {
            return {
                selectedLanguage: lang,
                repos: null
            }
        });

        api.fetchPopularRepos(lang)
            .then(function (repos) {
                this.setState(function () {
                    return {
                        repos: repos
                    }
                })
            }.bind(this));
    }
    render() {

        return (
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage}
                />
                {!this.state.repos
                ? <Loading text='DOWNLOADING' />
                : <RepoGrid repos={this.state.repos} />}
            </div>
        )
    }
}

module.exports = Popular;