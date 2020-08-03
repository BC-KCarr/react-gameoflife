import React from 'react'

function Rules() {
  return (
    <div style={{ width: '30%', textAlign: 'center'}}>
      <h3 style={{ marginBottom: '25px'}}>Rules</h3>
      <h4>For a space that is 'populated'</h4>
      <div style={{ textAlign: 'left'}}>
      <ul>
        <li>Each cell with one or no neighbors dies, as if by solitude.</li>
        <li>Each cell with four or more neighbors dies, as if by overpopulation.</li>
        <li>Each cell with two or three neighbors survives.</li> 
      </ul>
      </div>
      <h4>For a space that is 'empty' or 'unpopulated'</h4>
      <p>
        Each cell with three neighbors becomes populated.
      </p>
      <h3 style={{ marginTop: '85px'}}>The Controls</h3>
      <p>
        Choose a figure from either the oscillators or spaceships pull-down menu or make one yourself by clicking on the cells with a mouse. A new generation of cells (corresponding to one iteration of the Rules) is initiated by the 'Start' button. The 'Start' button advances the game by several generations. Game grid-size is regulated by the grid size pull-down.
      </p>
    </div>
  )
}

export default Rules
