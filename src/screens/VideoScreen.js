import * as React from 'react';
import { View, StyleSheet, Button, PermissionsAndroid, Text,TouchableOpacity} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Video, AVPlaybackStatus } from 'expo-av';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../styles/theme';

export default function App({navigation, route}) {
  const video = React.useRef(null);
  const [date, setDate] = React.useState('');
  const [location, setLocation] = React.useState(''); 
  const [path, setPath] = React.useState('');
  const preURL = require('../preURL');

  React.useEffect(()=>{
    setDate(route.params.rowData[1]);
    setLocation(route.params.rowData[2]);
    setPath(route.params.rowData[3]);
  })
  const downloadPress = () => {
    fetch(preURL.preURL + '/media/file?path=' + path)
      .then((response) => response.json())
      .then((response) => { 
          console.log(response.status);
      }).catch((err) => {
          console.log("error", Object.values(err)) 
      })
    }

  return (
      <View style={styles.videoBox}>
          <View style={{flex: 0.7, borderBottomWidth:1, borderColor: 'gray'}}>
              <Text style={styles.text}>발생일: 20{date}</Text>
          </View>
          <View style={{flex: 0.7, borderBottomWidth:1, borderColor: 'gray'}}>
              <Text style={styles.text}>발생위치: {location}</Text>
          </View>
          <View style={{flex: 7.6, alignContent:'center', justifyContent:'center'}}>
            <Video
              ref={video}
              style={styles.video}
              source={{
                uri: path,
              }}
              useNativeControls
              resizeMode="contain"
              isLooping
          />
          </View>
              <View style={{flexDirection: 'row', flex:1}}>
                  <View style={{flex:1, borderWidth:1, borderColor:'gray', backgroundColor:'white', justifyContent:'center', alignItems:'center',}}>
                      <TouchableOpacity onPress={()=>{}}>
                        <Text style={styles.text2}>삭제</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={{flex:1, backgroundColor:theme.purple, justifyContent:'center', alignItems:'center',}}>
                      <TouchableOpacity onPress={()=>{}}>
                        <Text style={styles.text1}>다운로드</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
);
}

const styles = StyleSheet.create({
  videoBox:{
    flex:1,
    backgroundColor:"#fff",
    borderWidth:1
  },
  text:{
    fontSize: 20,
    fontWeight: "200",
    color: 'gray',
    margin:5
  },
  video:{
    flex: 3,
    alignSelf: "stretch"
  },
  btnPlay:{
    flex:2,
    justifyContent:"flex-end"
  },
  text2:{
    color: theme.purple,
    fontSize: 20
  }, 
  text1:{
    color: theme.white,
    fontSize: 20
  }, 

 });