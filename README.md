# React under the hook
1. Props
    - Là một đối tượng
    - Props được truyền từ cha xuống con
    - Props là thuộc tính read-only

2. State
    - Là dữ liệu (memory) của riêng component
    - State tốn bộ nhớ, giảm thiểu state
    - State không được phụ thuộc vào props hoặc một state khác
    - State thay đổi theo thời gian

3. Event

































<div style={{ width: "50%", margin: "auto"}}>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <UserProfile 
          image="https://image.voh.com.vn/voh/Image/2018/12/20/434225737455109191357645636277370563330048n_20181220150837.jpg" 
          name="Phương Ly"
          active={currentPlayer == 1} 
        />
        <UserProfile 
          image="https://toquoc.mediacdn.vn/280518851207290880/2021/3/14/15253497622933892974712405640560402592920124o-1615731932782980896116.jpeg" 
          name="Quỳnh Kool"
          active={currentPlayer == 2} 
        />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "0fr 0fr 0fr", gap: 4 }}>
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </div>
      <button onClick={changePlayer}>Change Player</button>
    </div>






// Game.jsx
import React, { useState } from 'react';
import Board from '../board/index';
import UserProfile from '../userProfile/index';
import './index.css';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const xIsNext = stepNumber % 2 === 0;

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([{ squares: squares }]));
    setStepNumber(newHistory.length);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  // const moves = history.map((step, move) => {
  //   const desc = move ? 'Go to move #' + move : 'Go to game start';
  //   return (
  //     <li key={move}>
  //       <button onClick={() => jumpTo(move)}>{desc}</button>
  //     </li>
  //   );
  // });

  // const status = winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O');

  const handleReset = () => {
    // set lại state cho trạng thái khởi đầu
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    // setXIsNext(true);

    // Đặt trạng thái của profiles về trạng thái mặc định (không ai là người thắng)
    // setProfiles(prevProfiles =>
    //   prevProfiles.map(profile => ({ ...profile, winner: false }))
    // );
  };

  const profiles = [
    { name: 'Phương Ly', image: 'https://image.voh.com.vn/voh/Image/2018/12/20/434225737455109191357645636277370563330048n_20181220150837.jpg', active: xIsNext, winner: winner === 'X' },
    { name: 'Quỳnh Kool', image: 'https://toquoc.mediacdn.vn/280518851207290880/2021/3/14/15253497622933892974712405640560402592920124o-1615731932782980896116.jpeg', active: !xIsNext, winner: winner === 'O' },
  ];

  return (
    <div className="game">
      <div className="game-info">
        <div className="user-profiles">
          {profiles.map((profile, index) => (
            <UserProfile key={index} {...profile} />
          ))}
        </div>
      </div>
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <button className="reset" value="reset" onClick={handleReset}>Reset</button>
      {winner && (
        <div className='name-winner'>
            Winner: <b>{profiles.find(profile => profile.winner)?.name || 'Ván này hòa !'}</b>
        </div>
       )}
    </div>
  );
}

export default Game;
