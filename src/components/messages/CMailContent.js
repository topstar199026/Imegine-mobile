import { View } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import {Text, Image, TouchableOpacity, StyleSheet, TextInput, FlatList, Keyboard} from "react-native" ;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {
    actions,
    defaultActions,
    RichEditor,
    RichToolbar,
  } from 'react-native-pell-rich-editor';

import { ContactActions } from 'src/actions';
import {colors, images, fonts} from 'src/assets/themes';
import { _flexCol, _flexRow, _font, _style } from 'src/modules/Style';
import { textAlign } from 'styled-system';
import CContactGroupItem from './CContactGroupItem';
import CContactSelectItem from './CContactSelectItem';
import * as Utils from 'src/modules/Toast';

var styles = StyleSheet.create({    
    a: {
        fontWeight: "bold",
        color: "purple",
      },
      div: {
        fontFamily: "monospace",
      },
      p: {
        fontSize: 30,
      },
      /*******************************/
      container: {
        flex: 1,
        marginTop: 40,
        backgroundColor: "#F5FCFF",
      },
      editor: {
        backgroundColor: colors.$transparent,
        borderColor: colors.$transparent,
        borderWidth: 1,
      },
      rich: {
        // minHeight: 300,
        flex: 1,
      },
      richBar: {
        height: 50,
        backgroundColor: "#F5FCFF",
      },
      text: {
        fontWeight: "bold",
        fontSize: 20,
      },
      tib: {
        textAlign: "center",
        color: "#515156",
      },
});

const CMailContent = (props) => {
    const RichText = useRef();
    
    const [content, setContent] = useState(null);
    const [article, setArticle] = useState(props.content);
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
  
	useEffect(() => {
		props.handleContent(article);
	}, [article])

    const handleChange = (t) => {
        setContent(t);
    }

    function editorInitializedCallback() {
        // @ts-ignore
        RichText.current?.registerToolbar(function (items) {
          // items contain all the actions that are currently active
          console.log(
            "Toolbar click, selected items (insert end callback):",
            items
          );
        });
      }



	function handleHeightChange(height) {
		// console.log("editor height change:", height);
	}

	function onPressAddImage() {
		// you can easily add images from your gallery
		// @ts-ignore
		RichText.current?.insertImage(
			"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png"
		);
	}

	function insertVideo() {
		// you can easily add videos from your gallery
		// @ts-ignore
		RichText.current?.insertVideo(
		  	"https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4"
		);
	  }
      
    return (
        <View
            style={_style([
                {
                    padding: 5,
                    height: '100%',
                    // borderWidth: 1,
                    // borderColor: 'red'
                },
                _flexCol,
            ])}>
            <View
                style={_style([
                    {
                        flex: 1,
                        width: '100%',
                        // borderWidth: 1,
                        // borderColor: 'red'                      
                    },
                    // _flexRow,
                ])}> 
				{/* https://github.com/wxik/react-native-rich-editor/blob/master/examples/src/example.js */}
                <RichEditor
				          	initialContentHTML={article}
                    disabled={false}
                    containerStyle={styles.editor}
					          useContainer
                    ref={RichText}
                    style={styles.rich}
                    placeholder={"Start Writing Here"}
                    onChange={(text) => setArticle(text)}
                    editorInitializedCallback={editorInitializedCallback}
                    onHeightChange={handleHeightChange}
                    editorStyle={{
                        contentCSSText: `
                            // font-family: sans-serif; 
                            // font-size: 14px; 
                            padding: 0 30px; 
                            line-height: 36px; 
                            display: flex; 
                            flex-direction: column; 
                            min-height: 200px; 
                            position: absolute; 
                            top: 0; right: 0; bottom: 0; left: 0;`,
                    }}
                />        
				{/* <RichToolbar
					editor={RichText}
					style={[styles.richBar]}
					actions={[
						actions.setBold,
						actions.setItalic,
						// actions.insertBulletsList,
						// actions.insertOrderedList,
						// actions.insertImage,
						// 'customAction',
					]}
					iconTint={"purple"}
                    selectedIconTint={"pink"}
                    disabledIconTint={"purple"}
					onPressAddImage={onPressAddImage}
					// iconMap={{
					// 	customAction: customIcon,
					// }}
					// customAction={this.handleCustomAction}
				/>  */}
                {/* <RichToolbar
                    style={[styles.richBar]}
                    editor={RichText}
                    disabled={false}
                    iconTint={"purple"}
                    selectedIconTint={"pink"}
                    disabledIconTint={"purple"}
                    onPressAddImage={onPressAddImage}
                    // iconSize={40}
                    actions={[
                      "insertVideo",
                      // @ts-ignore
                      ...defaultActions,
                      actions.setStrikethrough,
                      actions.heading1,
                      ]}
                      map icons for self made actions
                      iconMap={{
                      [actions.heading1]: ({ tintColor }) => (
                          <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
                      ),
                      [actions.setStrikethrough]: strikethrough,
                      ["insertVideo"]: video,
                    }}
                    // @ts-ignore
                    insertVideo={insertVideo}
                />       */}
                {/* <TextInput 
                    style={_style([
                        {
                        },
                        _font(fonts.$rubikRegular, colors.$secondaryBlue, 15),
                    ])}
                    multiline
                    onChangeText={(t) => handleChange(t)}
                    placeholder={"Compose Email"}  
                    value={content}
                /> */}
                
            </View>
        </View>
    );
};

export default CMailContent;
