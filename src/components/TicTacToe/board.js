import React from "react";
import Square from "./square"

export default class Board extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         XisNext: true,
    //     };
    // }

    // handleClick(i) {
    //     const squares = this.state.squares.slice();
    //     if(calculateWinner(squares) || squares[i]) {
    //         return;
    //     }
    //     squares[i] = this.state.XisNext ? 'X' : 'O';
    //     this.setState({
    //         squares: squares,
    //         XisNext: !this.state.XisNext,
    //     });
    // }
    
    renderSquare(i) {
        return (
                <Square 
                    value={this.props.squares[i]} 
                    onClick={() =>this.props.onClick(i)} 
                />
        );
    }

    render() {
        // const winner = calculateWinner(this.state.squares);
        // let status;
        // status = winner ? `Winner: ${winner}` : `Next player: (${this.state.XisNext ? 'X' : 'O'})`;
        // setTimeout(() => {
        //     if(winner) {
        //         this.setState({
        //             squares: Array(9).fill(null),
        //             XisNext: true,
        //         });
        //     }
        // },5000);

        return (
            <div>
                  {/* <div id="" className="status">
                    {status}
                </div>   */}
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}
