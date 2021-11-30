import { PermissionsAndroid } from 'react-native';

import axios from 'axios';
import { RSA, RSAKeychain } from 'react-native-rsa-native';
import CryptoJS from "react-native-crypto-js";

import RNFS from 'react-native-fs';
import forge from 'node-forge';


import { keyLength } from 'src/constants/Constant';
import { SOCKET_API_SERVER, SOCKET_SERVER } from 'src/temp';
import { transformSync } from '@babel/core';

export const initialRsaKey = async () => {
    const keys =  await RSA.generateKeys(keyLength);
    const serverKey = await axios.post(SOCKET_API_SERVER + 'user/publicKey');

    return {
        public: keys.public,
        private: keys.private,
        server: serverKey.data, 
    }    
}

export const generateSecurityKey = async (pass) => {
    // axios
    // .get('http://<server>:9026/api/user/publicKey')
    // .then(res => {
    //     (async () => {
    //         let serverPublicKey = res.data;
    //         let message = 'Test RSA TEST RSA TST@#$@ 23 $@# AsDF S f@#Q RAFDSF';
    //         message = await encrypt(message, serverPublicKey);
    //         var values = {
    //             message: message
    //         }

    //         axios
    //         .post('http://<server>:9026/api/user/testKey', {values})
    //     })();
        
    // })
    // .catch(err => {
    //   console.log(err);
    // });


    const keys = await RSA.generateKeys(keyLength);

    // var values = {
    //     key: keys.public
    // };
    // axios
    // .post('http://<server>:9026/api/user/testClientPublicKey', {values})
    // .then(res => {
    //     (async () => {
    //         console.log('res.data', res.data)
    //         var encryptedMessage  = res.data;
    //         var message = await decrypt(encryptedMessage, keys.private);
    //         console.log('message', message);
    //     })();
        
    // })
    // .catch(err => {
    //   console.log(err);
    // });
}



export const encrypt = async (message, key) => {
    const res = await RSA.encrypt(message, key);
    return res;
}

export const decrypt = async (message, key) => {
    const res = await RSA.decrypt(message, key);
    return res
}

export const objectEncrypt = async (object, sec) => {
    for (const [key, value] of Object.entries(object)) {
        if(key !== 'key') object[key] = await encrypt(value, sec);
    }
    return object;
}

export const objectDecrypt = async (object, sec) => {
    for (const [key, value] of Object.entries(object)) {
        if(key !== 'key') object[key] = await decrypt(value, sec);
    }
    return object;
}

function generateRandomAesKey() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*-_=+|:<>?/,.';
    var charactersLength = characters.length;
    for ( var i = 0; i < 214; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
    }
    return result;
}

export const aesEncrypt = async (data) => {
    let key = generateRandomAesKey();
    let res = await CryptoJS.AES.encrypt(data, key).toString();
    return {
        key: key,
        data: res,
    };
}

export const aesDecrypt = async (data, key) => {
    let bytes  = await CryptoJS.AES.decrypt(data, key);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}

export const aesRsaEncryption = async (data, rsa) => {
    var values = await aesEncrypt(JSON.stringify(data));
    const _key = await encrypt(values.key, rsa.server);
    values.key = _key;
    return values;
}

// const limit_big = 1024*512;
const limit_big = 1024*300;

function decryptBigFile(fileUri,start,size,decipher){
    RNFS.read(fileUri+'.enc',limit_big,start,'ascii').then(r1=>{
        decipher.update(forge.util.createBuffer(r1));
        RNFS.appendFile(fileUri+'.jpg',decipher.output.getBytes(),'ascii').then(r2=>{
            console.log("APPEND BYTES DECRYPTED");
            if((start+limit_big)<=size){            
                decryptBigFile(fileUri,start+limit_big,size,decipher);
            }else{
                decipher.finish();
                RNFS.appendFile(fileUri+'.jpg',decipher.output.getBytes(),'ascii')
                .then(r3=>{
                    console.log("SAMPON DI DECRYPT");
                })
            }
        });
    })
}

function encryptBigFile(fileUri,start,size,cipher,decipher){
    return RNFS.read(fileUri,limit_big,start,'ascii').then(res1=>{
        cipher.update(forge.util.createBuffer(res1));
        return RNFS.appendFile(fileUri+'.enc',cipher.output.getBytes(),'ascii').then(r2=>{
            console.log("APPEND BYTES ENCRYPTED");
            if((start+limit_big)<=size){
                return encryptBigFile(fileUri,start+limit_big,size,cipher,decipher);
            }else{
                cipher.finish();
                return RNFS.appendFile(fileUri+'.enc',cipher.output.getBytes(),'ascii').then(r3=>{
                    console.log("SAMPON DI ENCRYPT", r3);
                    return fileUri+'.enc';
                }).catch(e=>{
                    console.warn(e)
                });
            }
        })
    }).catch(e=>{
        console.warn(e)
    })
}


export const fileEncrypt = async (fileUri) => {
    console.log(fileUri)
    try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);
    }catch (e){
        console.warn(e)
    }

    try {
        const key = forge.random.getBytesSync(16);
        const iv = forge.random.getBytesSync(16);
        let cipher = forge.cipher.createCipher('AES-CBC', key)
        let decipher = forge.cipher.createDecipher('AES-CBC', key)
        cipher.start({iv: iv});
        decipher.start({iv: iv});

        console.log('key', key, iv)

        const aesKey = {
            key: key,
            iv: iv,
        }


        return RNFS.stat(fileUri).then(res=>{
            console.log('fileSize : ',res.size)
            // @ts-ignore
            if(res.size * 1 > limit_big){
                console.log('1')
                return RNFS.writeFile(fileUri+'.enc', '', 'ascii').then(async function (success) {
                    console.log('FILE SIAP DI APPEND');
                    console.log('start_encrypt: ' + new Date().toLocaleTimeString());
                    const data = await  encryptBigFile(fileUri,0,res.size,cipher,decipher);
                    return {
                        key: aesKey,
                        filePath: data,
                    };
                }).catch((err) => {
                    console.warn(err.message);
                });
            }else{
                console.log('2')
                return RNFS.readFile(fileUri,'ascii').then(r1=>{
                    console.log(r1.length);
                    cipher.update(forge.util.createBuffer(r1));
                    cipher.finish();
                    return RNFS.writeFile(fileUri+'.enc',cipher.output.getBytes(),'ascii').then(r2=>{
                        console.log('r2', r2)
                        console.log("FILE ENKRIPSI SUDAH OKE")
                        return {
                            key: aesKey,
                            filePath: fileUri+'.enc',
                        };
                        // RNFS.readFile(fileUri+'.enc','ascii').then(r3=>{
                        //     decipher.update(forge.util.createBuffer(r3));
                        //     decipher.finish();
                        //     RNFS.writeFile(fileUri+'.jpg',decipher.output.getBytes(),'ascii').then(r4=>{
                        //         console.log("FILE DECRYPT SUDAH OKE")
                        //     }).catch(e2=>{
                        //         console.warn(e2)
                        //     })
                        // })
                    }).catch(e1=>{
                        console.warn(e1)
                    })
                })
            }
        });

    }catch (e){
        console.warn(e)
    }
}


// const handleUri = async (res) => {
//     return res;
// }

// const handleFileCheck = async (res, fileUri) => {
//     let size = res.size * 1;
//     console.log('fileSize : ', size);

//     const key = forge.random.getBytesSync(16);
//         const iv = forge.random.getBytesSync(16);
//         let cipher = forge.cipher.createCipher('AES-CBC', key)
//         let decipher = forge.cipher.createDecipher('AES-CBC', key)
//         cipher.start({iv: iv});
//         decipher.start({iv: iv});

//     if(res.size * 1 > limit_big){
        
//     }else{
//         return await RNFS.readFile(fileUri,'ascii').then(r1=>{
//             console.log(r1.length);
//             cipher.update(forge.util.createBuffer(r1));
//             cipher.finish();
//             RNFS.writeFile(fileUri+'.enc',cipher.output.getBytes(),'ascii').then(function(res) {
//                 return handleUri(res);
//             }).catch(e1=>{
//                 return null;
//                 console.warn(e1)
//             })
//         })
//     }
// }

// export const fileEncrypt = async (fileUri) => {
//     console.log(fileUri)
//     try {
//         const granted = await PermissionsAndroid.requestMultiple([
//           PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           PermissionsAndroid.PERMISSIONS.CAMERA,
//         ]);
//     }catch (e){
//         console.warn(e)
//     }

//     try {
//         // const key = forge.random.getBytesSync(16);
//         // const iv = forge.random.getBytesSync(16);
//         // let cipher = forge.cipher.createCipher('AES-CBC', key)
//         // let decipher = forge.cipher.createDecipher('AES-CBC', key)
//         // cipher.start({iv: iv});
//         // decipher.start({iv: iv});

//         return await RNFS.stat(fileUri).then(function (res) {
//             return handleFileCheck(res, fileUri);
//         });
//         // .then(function (res) {
//         //     console.log('res', res)
//         //     return res;
//         // });

//     }catch (e){
//         console.warn(e)
//     }
// }




// export const fileEncrypt = async (fileUri) => {
//     console.log(fileUri)
//     try {
//         const granted = await PermissionsAndroid.requestMultiple([
//           PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           PermissionsAndroid.PERMISSIONS.CAMERA,
//         ]);
//     }catch (e){
//         console.warn(e)
//     }

//     try {
//         const key = forge.random.getBytesSync(16);
//         const iv = forge.random.getBytesSync(16);
//         let cipher = forge.cipher.createCipher('AES-CBC', key)
//         let decipher = forge.cipher.createDecipher('AES-CBC', key)
//         cipher.start({iv: iv});
//         decipher.start({iv: iv});

//         RNFS.stat(fileUri).then(res=>{
//             console.log('fileSize : ',res.size)
//             // @ts-ignore
//             if(res.size * 1 > limit_big){
//                 console.log('1')
//                 RNFS.writeFile(fileUri+'.enc', '', 'ascii').then((success) => {
//                     console.log('FILE SIAP DI APPEND');
//                     console.log('start_encrypt: ' + new Date().toLocaleTimeString());
//                     encryptBigFile(fileUri,0,res.size,cipher,decipher);
//                 }).catch((err) => {
//                     console.warn(err.message);
//                 });
//             }else{
//                 console.log('2')
//                 RNFS.readFile(fileUri,'ascii').then(r1=>{
//                     console.log(r1.length);
//                     cipher.update(forge.util.createBuffer(r1));
//                     cipher.finish();
//                     RNFS.writeFile(fileUri+'.enc',cipher.output.getBytes(),'ascii').then(r2=>{
//                         console.log(r2)
//                         console.log("FILE ENKRIPSI SUDAH OKE")
//                         // RNFS.readFile(fileUri+'.enc','ascii').then(r3=>{
//                         //     decipher.update(forge.util.createBuffer(r3));
//                         //     decipher.finish();
//                         //     RNFS.writeFile(fileUri+'.jpg',decipher.output.getBytes(),'ascii').then(r4=>{
//                         //         console.log("FILE DECRYPT SUDAH OKE")
//                         //     }).catch(e2=>{
//                         //         console.warn(e2)
//                         //     })
//                         // })
//                     }).catch(e1=>{
//                         console.warn(e1)
//                     })
//                 })
//             }
//         });

//     }catch (e){
//         console.warn(e)
//     }
// }