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

      <h4>Begin writing the favor you need help with</h4>
      <div>
        <textarea id="title" type="text" placeholder="Title" ref="title"/>
        </div>
        <div>
        <textarea className="com-text" type="text" placeholder="Type a description of the favor you need help with" ref="text"/>
        </div>
        <button className="my-btn-2"

          onClick={
            () =>
              this.props.onAdd(this.refs.title.value, this.refs.text.value)
          }
        >New Favor
        </button>
      </div>
    );
  }
}

PostAdd.propTypes = {
  onAdd:PropTypes.func.isRequired
};
