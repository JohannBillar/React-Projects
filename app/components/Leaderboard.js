import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function TableRow(props) {
  const { img, username, alltime, recent } = props.user;
  return (
    <tr>
      <td>{props.rank}</td>
      <td><a href={`https://www.freecodecamp.com/${username}`}><img src={img} alt="user profile" />{username}</a></td>
      <td>{recent}</td>
      <td>{alltime}</td>
    </tr>
  );
}

TableRow.propTypes = {
  user: PropTypes.shape({
    img: PropTypes.string,
    username: PropTypes.string,
    alltime: PropTypes.number,
    recent: PropTypes.number,
  }),
  rank: PropTypes.number,
};

function TableBody(props) {
  const { users, sortBy } = props;
  let count = 0;
  const sorted = users.sort((prevUser, currUser) => {
    if (sortBy === 'recent') {
      return prevUser.recent > currUser.recent ? -1 : 1;
    } else {
      return prevUser.alltime > currUser.alltime ? -1 : 1;
    }
  });

  return (
    <tbody>
      {sorted.map((user, idx) => {
        count += 1;
        return <TableRow user={user} key={idx} rank={count} />;
      })}
    </tbody>
  );
}

TableBody.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  sortBy: PropTypes.string,
};


function Table({ users, sortBy, onClickSort }) {
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
      />
    </table>
  );
}

Table.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  sortBy: PropTypes.string,
  onClickSort: PropTypes.func,
};

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
