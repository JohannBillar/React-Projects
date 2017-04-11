import React from 'react';

function Table() {
  return (
    <div className="container">
      <table>
        <caption><h1>Leaderboard</h1></caption>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Points in past 30 days</th>
            <th>All time points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td><a href="#"><img src="https://avatars.githubusercontent.com/u/13634417?v=3" alt="" />JohannBillar</a></td>
            <td>500</td>
            <td>5000</td>
          </tr>
          <tr>
            <td>2</td>
            <td><a href="#"><img src="https://avatars.githubusercontent.com/u/13634417?v=3" alt="" />SecondUser</a></td>
            <td>400</td>
            <td>400</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
