import { nanoid } from 'nanoid';
import { Component } from 'react';
import { toast } from 'react-toastify';
import { Forma } from './Searchbar.styles';

export class Form extends Component {
  state = { data: '' };

  id = nanoid();

  handleChange = evt => {
    this.setState({ [evt.currentTarget.name]: evt.currentTarget.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    if (this.state.data.trim() === '') {
      toast.error('Please enter your search details.');
      return;
    }
    this.props.onSubmit(this.state.data);
    this.setState({ data: '' });
  };
  reset = () => {
    this.setState({
      data: '',
    });
  };
  render() {
    return (
      <>
        <header className="searchbar">
          <Forma className="form" onSubmit={this.handleSubmit}>
            <button type="submit" className="button">
              <span className="button-label">Search</span>
            </button>
            <input
              onChange={this.handleChange}
              value={this.state.data}
              name="data"
              className="input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </Forma>
        </header>
      </>
    );
  }
}
