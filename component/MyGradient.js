import React, { Component } from "react";
import { LinearGradient } from 'expo';
export default class MyGradient extends Component {
  render() {
    const {
      color1,
      color2,
      style
    } = this.props;
    return (
      <LinearGradient
        colors={[color1, color2]}
        style={style}
      />
    );
  }
}