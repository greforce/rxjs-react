import React, { Component } from 'react';

import { layoutAction } from '../actions';
import { GitCard } from './GitCard';

export class Layout extends Component {
  state = {
    search: '',
  };

  handleClickStart = () => {
    console.log('click Start');
    this.props.layoutStart();
  }

  handleClickStop = () => {
    console.log('click Stop');
    this.props.layoutStop();
  }

  handleClickMap = () => {
    console.log('click Map');
    this.props.layoutMap();
  }

  handleClickExample = () => {
    console.log('click Example');
    this.props.layoutExample();
  }

  handleSearch = (e) => {
    this.setState({ search: e.target.value });
    this.props.incrementalSearch(e.target.value);
  }

  render() {
    return (
      <div className="container">
        <h1>React Observable Demo</h1>
        <div>
          <button
            className="btn btn-default btn-primary m-2"
            onClick={this.handleClickStart}
          >
            Start
          </button>
          <button
            className="btn btn-default btn-secondary m-2"
            onClick={this.handleClickStop}
          >
            Stop
          </button>
        </div>
        <h5>Состояние state.layout.result</h5>
        <div>
          <samp>{this.props.layout.result}</samp>
        </div>
        <h5>Небольшие примеры с выводом в консоль</h5>
        <div>
          <button
            className="btn btn-default btn-info m-2"
            onClick={this.handleClickMap}
          >
            StartMap
          </button>
          <button
            className="btn btn-default btn-outline-primary my-2 mx-5"
            onClick={this.handleClickExample}
          >
            Example
          </button>
        </div>
        <h5>Демо инкрементального поиска</h5>
        <div>
          <input
            type="search"
            name="search"
            value={this.state.search}
            className="form-control"
            onChange={this.handleSearch}
          />
        </div>
        <div>
          {this.props.layout.users ? (
            this.props.layout.users.map(user => <GitCard key={user.login} user={user} />)
          ) : null}
        </div>
      </div>
    );
  }
}
