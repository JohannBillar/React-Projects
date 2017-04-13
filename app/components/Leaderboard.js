import React from 'react';
import axios from 'axios';

function TableRow({ user, rank }) {
  const { img, username, alltime, recent } = user;
  return (
    <tr>
      <td>{rank}</td>
      <td><a href={`https://www.freecodecamp.com/${username}`}><img src={img} alt="user profile" />{username}</a></td>
      <td>{recent}</td>
      <td>{alltime}</td>
    </tr>
  );
}

function TableBody({ users, sortBy }) {
  console.log(sortBy);
  const sorted = users.sort((prevUser, currUser) => {
    if (sortBy === 'recent') {
      return prevUser.recent > currUser.recent ? -1 : 1;
    } else {
      return prevUser.alltime > currUser.alltime ? -1 : 1;
    }
  });

  let count = 0;
  return (
    <tbody>
      {sorted.map((user, idx) => {
        count += 1;
        return <TableRow user={user} key={idx} rank={count} />;
      })}
    </tbody>
  );
}

function Table({ users, sortBy, onClickSort }) {
  return (
    <table>
      <caption><h1>Leaderboard</h1></caption>
      <thead>
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
      />
    </table>
  );
}

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      sortBy: 'recent',
    };
    this.handleSortBy = this.handleSortBy.bind(this);
  }

  componentDidMount() {
    const sort = this.state.sortBy;
    this.getUserData(sort);
  }

  getUserData(sort) {
    console.log('getUserData fired with: ', sort);
    axios.get(`https://fcctop100.herokuapp.com/api/fccusers/top/${sort}`)
      .then(response => this.setState({ users: response.data }))
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
        />
      </div>
    );
  }
}

export default Leaderboard;
