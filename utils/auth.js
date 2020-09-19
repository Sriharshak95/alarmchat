import * as SecureStore from 'expo-secure-store';
const tokenGetter = async(keyName,peerName,peerId) =>{
    try{
        const token = await SecureStore.getItemAsync(keyName);
        if(!token){
            return false;
        }
        return token;
    }catch(e){
        console.log(e)
    }
}

export default tokenGetter;