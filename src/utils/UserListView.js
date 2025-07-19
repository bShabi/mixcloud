import React from 'react';

const UserListView = ({ results, handleSelect }) => {
  return (
    <ul className="results list">
      {results.map((user, idx) => (
        <li key={idx} className="result-item" onClick={() => handleSelect(user)}>
          <img
            src={user.pictures?.thumbnail}
            alt={user.name}
            width={30}
            height={30}
            style={{
              borderRadius: '50%',
              verticalAlign: 'middle',
              marginRight: '8px',
            }}
          />
          {user.user.name}
        </li>
      ))}
    </ul>
  );
};

export default UserListView;
