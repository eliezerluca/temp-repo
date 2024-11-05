import { Component } from 'react';
import './styles.css';
export class Button extends Component {
  render() {
    const { text, onClick, disabled } = this.props;

    return (
      <div className="buttonContainer">
        <button
          className='button'
          disabled={disabled}
          onClick={onClick}>
          {text}
        </button>
      </div>
    )
  }
} 