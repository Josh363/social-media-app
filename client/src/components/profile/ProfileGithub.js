import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layouts/Spinner'
import { getGithubRepos } from '../../actions/profile'

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username)
  }, [getGithubRepos, username])

  return (
    <div className='profile-github'>
      <h2 className='large'> Github Repos</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo) => (
          <div key={repo._id} className='repo card-panel p-1 m-1'>
            <div>
              <h4 className='lead'>
                <a
                  href={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='repo-title'
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div className='github-badges'>
              <ul>
                <li className='badge primary-badge'>
                  Stars: {repo.stargazers_count}
                </li>
                <li className='badge secondary-badge'>
                  Watchers: {repo.watchers_count}
                </li>
                <li className='badge'>Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
})

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub)
