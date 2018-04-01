import React, { Component } from "react";
import PropTypes from "prop-types";

export default class CommentAdd extends Component {
  constructor(props) {
    super(props);

    this.state={

    };
  }
  render() {
    return (
      <div className="PostAdd">
        <div >
        <h4>Give a piece of advice to this person in our community and make their day better</h4>
        <textarea
          className="com-text"
          type="text"
          placeholder="Text"
          ref="text"/>
          </div>
        <button className="my-btn-2"
          onClick={
            () =>
              this.props.onAdd(this.refs.text.value)
          }
        >Add
        </button>
      </div>
    );
  }
}

CommentAdd.propTypes = {
  onAdd:PropTypes.func.isRequired
};
