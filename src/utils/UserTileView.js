import React from 'react';

const UserTileView = ({ results, handleSelect }) => {
  const rows = results.reduce((acc, user, idx) => {
    if (idx % 2 === 0) {
      acc.push([user]);
    } else {
      acc[acc.length - 1].push(user);
    }
    return acc;
  }, []);

  return (
    <div className="results tile">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="tile-row">
          {row.map((user, i) => (
            <li key={i} className="tile-item" onClick={() => handleSelect(user)}>
              <img
                src={user.pictures?.thumbnail}
                alt={user.name}
                width={30}
                height={30}
                style={{
                  borderRadius: '50%',
                  marginBottom: '4px',
                }}
              />
              <span>{user.user.name}</span>
            </li>
          ))}
        </div>
      ))}
    </div>
  );
};

export default UserTileView;
