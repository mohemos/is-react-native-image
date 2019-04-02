import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

// from https://flatuicolors.com/
const defaultColors = [
  '#2ecc71', // emerald
  '#3498db', // peter river
  '#8e44ad', // wisteria
  '#e67e22', // carrot
  '#e74c3c', // alizarin
  '#1abc9c', // turquoise
  '#2c3e50', // midnight blue
];

function sumChars(str) {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  return sum;
}

class IsImage extends Component {

    initials =(name)=>{
        if(!name)
          return 'NN';
          
        const names = name.split(' ');
        let output = '';
        if(names.length > 1){
          output = name[0].charAt(0)+name[1].charAt(0);
        } else if(name.length>1){
          output = name.charAt(0)+name.charAt(1)
        } else{
          output = name;
        } 
      
        return output.toUpperCase();
    }


  render() {
    let {
      src,
      name,
      color,
      textColor = '#fff',
      colors = defaultColors,
      fontDecrease,
      size,
      style,
      defaultName,
      circle = 0.5,
      customWidth = 0,
      customHeight = 0
    } = this.props;
    
    if (!fontDecrease) fontDecrease = 2.5;
    
    if (!name) throw new Error('Avatar requires a name');

    if(typeof size !== 'number') size = parseInt(size);

    let abbr = initials(name);
    if(!abbr) abbr = defaultName;

    const borderRadius = circle === 0.5 ? size * circle : circle;

    const imageStyle = {
      borderRadius
    };

    const innerStyle = {
      borderRadius,
      borderWidth: 1,
      borderColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center'
    };

    if (size) {
      imageStyle.width = innerStyle.width = customWidth > 0 ? customWidth : size;
      imageStyle.height = innerStyle.height = customHeight > 0 ? customHeight : size;
    }

    let inner, classes;
    if (src) {
      
      const props = {
        style: imageStyle,
        source: {uri: src}
      }
      
      inner = React.createElement( this.props.component || Image, props )

    } else {
      let background;
      if (color) {
        background = color;
      } else {
        // pick a deterministic color from the list
        let i = sumChars(name) % colors.length;
        background = colors[i];
      }

      innerStyle.backgroundColor = background;

      inner = <Text style={{ fontSize: size / fontDecrease, color: textColor }}>{abbr}</Text>
    }

    return (
      <View>
        <View style={[innerStyle, style]}>
          {inner}
        </View>
      </View>
    )
  }
}

module.exports = IsImage;
