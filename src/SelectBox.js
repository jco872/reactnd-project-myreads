import React from 'react'

export default class SelectBox extends React.Component {
    moveBook = (e) => this.props.moveBook(this.props.book, e.target.value);

    render () {
        const options = [
            {
              label: "Move to...",
              value: "move",
            },            
            {
              label: "Currently Reading",
              value: "currentlyReading",
            },
            {
              label: "Want to Read",
              value: "wantToRead",
            },
            {
              label: "Read",
              value: "read",
            },
            {
              label: "None",
              value: "none",
            },
          ];

        return (
            <select value={this.props.shelf} onChange={this.moveBook}>
                {options.map((option) => (
                    <option value={option.value}>{option.label}</option>
                ))}
            </select>
        )
    }
}