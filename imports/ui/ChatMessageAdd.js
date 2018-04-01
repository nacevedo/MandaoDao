import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ChatAdd extends Component {
  constructor(props) {
    super(props);

    this.state={

    };

        clearContents(element) {
    this.refs.text.value = ''; 
  }

  }
  render() {
    return (
      <div className="PostAdd">
        <textarea className="com-text" type="text" placeholder="Text" ref="text"/>
        <button className="my-btn-2"

          onClick={
            () =>
            {
              this.props.onAdd(this.refs.text.value);
              this.clearContents(this);
            }
          }
        > Send message
        </button>
      </div>
    );
  }
}

ChatAdd.propTypes = {
  onAdd:PropTypes.func.isRequired
};