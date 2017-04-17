import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function LoadingDots() {
  return (
    <div>
      <p className="loading">
        <span>.</span><span>.</span><span>.</span>
      </p>
    </div>
  );
}

function TableRow({ user, rank }) {
  const { username, img, recent, alltime } = user;
  return (
    <tr>
      <td>{rank}</td>
      <td><a href={`https://www.freecodecamp.com/${username}`}><img src={img} alt="user profile" />{username}</a></td>
      <td>{recent}</td>
      <td>{alltime}</td>
    </tr>
  );
}

TableRow.propTypes = {
  user: PropTypes.object,
  rank: PropTypes.number,
};

function TableBody({ users, sortBy, loading }) {
  const sorted = users.sort((prevUser, currUser) => {
    if (sortBy === 'recent') {
      return prevUser.recent > currUser.recent ? -1 : 1;
    } else {
      return prevUser.alltime > currUser.alltime ? -1 : 1;
    }
  });

  let count = 0;
  return (
    loading ? (
      <tbody>
        <tr>
          <td><LoadingDots /></td>
          <td><LoadingDots /></td>
          <td><LoadingDots /></td>
          <td><LoadingDots /></td>
        </tr>
      </tbody>
    ) : (
      <tbody>
        {sorted.map((user, idx) => {
          count += 1;
          return <TableRow user={user} key={idx} rank={count} loading={loading} />;
        })}
      </tbody>
    )
  );
}

TableBody.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  sortBy: PropTypes.string,
  loading: PropTypes.bool,
};


function Table({ users, sortBy, onClickSort, loading }) {
  return (
    <table>
      <caption><h1>Leaderboard</h1></caption>
      <thead className="sticky">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>
            <button onClick={() => onClickSort('recent')} className={`sort-by ${sortBy !== 'recent' ? 'isNotSelected' : ''}`} >
              Points in past 30 days
            </button>
          </th>
          <th>
            <button onClick={() => onClickSort('alltime')} className={`sort-by ${sortBy !== 'alltime' ? 'isNotSelected' : ''}`} >
              All time points
            </button>
          </th>
        </tr>
      </thead>
      <TableBody
        users={users}
        sortBy={sortBy}
        loading={loading}
      />
    </table>
  );
}

Table.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  sortBy: PropTypes.string,
  onClickSort: PropTypes.func,
  loading: PropTypes.bool,
};

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      sortBy: 'recent',
      isLoading: true,
    };
    this.handleSortBy = this.handleSortBy.bind(this);
  }

  componentDidMount() {
    const sort = this.state.sortBy;
    this.getUserData(sort);

    const table = document.querySelector('table');
    const tableHeader = document.querySelector('thead');
    const topOfTableHeader = tableHeader.offsetTop;

    function fixHeader() {
      if (window.scrollY >= topOfTableHeader) {
        tableHeader.style.width = `${table.clientWidth}px`;
        document.body.style.paddingTop = `${tableHeader.offsetHeight}px`;
        document.body.classList.add('fixed');
      } else {
        document.body.style.paddingTop = 0;
        document.body.classList.remove('fixed');
      }
    }
    window.addEventListener('scroll', fixHeader);
  }

  getUserData(sort) {
    axios.get(`https://fcctop100.herokuapp.com/api/fccusers/top/${sort}`)
      .then(response => this.setState({
        users: response.data,
        isLoading: false,
      }))
      .catch(error => console.log(error));
  }

  handleSortBy(sort) {
    this.setState({ sortBy: sort });
    this.getUserData(sort);
  }

  render() {
    return (
      <div className="container">
        <Table
          users={this.state.users}
          sortBy={this.state.sortBy}
          onClickSort={this.handleSortBy}
          loading={this.state.isLoading}
        />
      </div>
    );
  }
}

export default Leaderboard;
