import { View } from 'native-base';
import React, { useRef, useState } from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {
    actions,
    defaultActions,
    RichEditor,
    RichToolbar,
  } from 'react-native-pell-rich-editor';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {colors, images, fonts} from 'src/assets/themes';
import { _center, _flexCol, _flexRow, _font, _style } from 'src/modules/Style';
import { style } from 'styled-system';

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
        height: 300,
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

const CNote = (props) => {

    const RichText = useRef();
    
    const [expanded, setExpanded] = useState(false)
    const [article, setArticle] = useState(props.content || null);


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

    return (
        <View
            style={_style([
                {
                    paddingTop: 15,
                    backgroundColor: expanded ? colors.$secondaryBlue : null,
                },
                _flexCol,
            ])}>
            <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => {
                    setExpanded(!expanded);
                }}>
                <View
                    style={_style([
                        {
                            width: '100%',
                            height: 50,
                            borderColor: 'rgb(112, 112, 112)',
                            borderBottomWidth: 1,
                            paddingBottom: 15,
                            paddingLeft: 10,
                            paddingRight: 10,
                        },
                        _flexRow,
                        _center,
                    ])}>
                    <View
                        style={_style([
                            {

                            },
                        ])}>
                        <Image source={expanded ? images.plannerPage.noteWhite : images.plannerPage.noteBlue} />
                    </View>
                    <View
                        style={_style([
                            {
                                flex: 1,
                            },
                        ])}>
                        <Text
                            style={_style([{
                                    marginTop: 2,
                                    paddingLeft: 10,
                                },
                                _font(fonts.$rubikRegular, expanded ? colors.$white : colors.$secondaryBlue, 17)
                            ])}>
                            {'Add notes'}
                        </Text>
                    </View>
                    

                </View>
            </TouchableOpacity>
            {
                expanded &&

                <View
                    style={_style([
                        {
                            width: '100%',
                            height: 200,
                        },
                        _flexCol,
                    ])}>
                    <RichEditor
                        initialContentHTML={article}
                        disabled={false}
                        containerStyle={styles.editor}
                        useContainer={true}
                        ref={RichText}
                        style={styles.rich}
                        placeholder={"Start Writing Here"}
                        onChange={(text) => {
                            props.setNote(text);
                            setArticle(text)
                        }}
                        editorInitializedCallback={editorInitializedCallback}
                        onHeightChange={handleHeightChange}
                    />        
                </View>

            }
        </View>
    );
};

export default CNote;
