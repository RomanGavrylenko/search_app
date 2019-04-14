import React, {Component} from 'react';
import SWAPI from '../services/sw-api';
import { getCookie, setCookie, deleteCookie } from '../services/cookie';
import { getValidation } from '../services/validation';

const {Provider: UserProvider, Consumer: UserConsumer} = React.createContext();

export {
    UserConsumer
}

export default class Auth extends Component {

    SW = new SWAPI();

    COOKIE_NAME = 'id';

    state={
        user: null,
        userImage: null,
        hasError: false, 
        edit: false
    }

    //открыть форму для редактирования профиля
    getEdit = () => {
        this.setState({
            edit : true
        })
    }

    //сохранить данные для после редактирования
    editData = (data)=> {
        let isValid = [];

        console.log(data)
        for ( let key in data){
            
            console.log('--',[key], '==', data[key]);
            if(data[key] != this.state.user[key]){
    
                let valid = getValidation(data[key]);

                if(!valid) {
                    isValid.push(false);
                }

            }
        }

        if(isValid.length>0) return;
       
        this.setState({
            edit : false,
            user: data
        }, this.setCookieAndData)
    }

    //если имеется кука и данные в local storage, то берем их из них
    componentDidMount(){
        if(getCookie(this.COOKIE_NAME) && localStorage.getItem('user')){
            let {user, userImage} = JSON.parse(localStorage.getItem('user'));
            this.setState({
                user ,
                userImage
            })
        }
    }

    //устанавливаем куку и добавляем данные в localStorage
    setCookieAndData = ()=>{
        const {user, userImage} = this.state;
        const id = this.SW.getId(user.url);
        const option = {
            path: '/',
            'max-age' : 3600,
        }
        setCookie(this.COOKIE_NAME, id, option);
        const data = {
            user,
            userImage
        }
        let userData = JSON.stringify(data)
        localStorage.setItem('user', userData);
    }

    //удаляем куку и добавляем данные в localStorage
    deleteCookieAndData = ()=>{
        deleteCookie(this.COOKIE_NAME);
        localStorage.removeItem('user');
    }

    //процесс осуществления входа
    
    getSingIn = async (id, name) => {

        const {getPearson, loadImage} = this.SW;

        try{
            let user = await getPearson(id);

            //если указанные данные пользователем (имя) не равно полученным из запроса
            if(user.name.toLowerCase() != name.toLowerCase()){
                this.setState({
                    hasError: 'nameError',
                })

                return;
            } else {
                this.setState({
                    user,
                    userImage: loadImage(user.url)
                }, this.setCookieAndData);
            }
        } catch(err){
            console.log(err, err.message);
            this.setState({
                hasError: 'networkError',
            })
            
        }     
    }

    //выйти(разлогиниться)

    getSignOut = ()=> {
        this.setState({
            user: null,
            userImage: null,
        }, this.deleteCookieAndData)
    }

    render(){

        const value = {
            getSingIn : this.getSingIn,
            getSignOut : this.getSignOut,
            user : this.state.user,
            userImage: this.state.userImage,
            hasError :  this.state.hasError,
            getEdit : this.getEdit,
            saveEdit : this.editData, 
            edit : this.state.edit
        }

        return(
            <UserProvider value={value}>
                {this.props.children}
            </UserProvider>
        );
    }
}