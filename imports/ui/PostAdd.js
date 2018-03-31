import React, { Component } from "react";
import PropTypes from "prop-types";

export default class PostAdd extends Component {
  constructor(props) {
    super(props);

    this.state={

    };
  }
  render() {
    return (
      <div className="PostAdd">

        <textarea type="text" placeholder="Title" ref="title"/>
        <textarea type="text" placeholder="Text" ref="text"/>
        <button
          onClick={
            () =>
              this.props.onAdd(this.refs.title.value, this.refs.text.value)
          }
        >Add
        </button>
      </div>
    );
  }
}

PostAdd.propTypes = {
  onAdd:PropTypes.func.isRequired
};
