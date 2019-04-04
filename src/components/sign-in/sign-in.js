import React from 'react';
import { getValidation, validationNum } from '../../services/validation';
import withContext from '../../HOC/with-contex';
import {UserConsumer} from '../../contex-api/auth';
import Modal from '../../portals/modal/modal';

class SignIn extends React.Component{
    state = {
        id: '',
        name: '',
        errorId: false,
        errorName: false,
        openModal: false
    }

    handleSubmit = (e)=> {

        e.preventDefault();

        //eсли пользователь уже авторизовался - возвращаемся из функции
        if(this.props.value.user){
            return;
        }

        const { id, name } = this.state;
        const { getSingIn } = this.props.value;

        //проверяем валидные ли данные пришли
        // поле имени, если не валидные данные или их нет, то выводим ошибку
        //поле esle для исправления ошибки из прошлых запросов, если они были
        if( !getValidation(name)){
            this.setState({
                errorName: true
            })

            return;
        } else {
            this.setState(state=>{
              if(state.errorName){
                  return {
                    errorName: false
                  }
              }  
            })
        }

        // поле id, если не валидные данные или их нет, то выводим ошибку
        //поле esle для исправления ошибки из прошлых запросов, если они были
        if( !getValidation(id) || !validationNum(id)){
            this.setState({
                errorId: true
            }) 

            return;
        } else {
            this.setState(state=>{
              if(state.errorId){
                  return {
                    errorId: false
                  }
              }  
            })
        }

        //отправляем данные из формы в api для дальнейшей авторизации
        //получаем промис. Если произошла ошибка с данными, то отображаем это
        //и делаем возврат из функции

        getSingIn(id, name)
            .then(()=>{
                if(this.props.value.hasError){
                    return;
                }
                this.setState({
                    id: '',
                    name: '',
                    openModal: true,
                    errorId: false,
                    errorName: false,
                });
            })
            
    }

    closeModal = ()=> {
        this.setState({
            openModal: false
        })
    }

    onChange = (e)=>{
        const target = e.currentTarget;

        this.setState({
            [target.name] : target.value
        })
    }

    render(){

        const { errorId, errorName, openModal } = this.state;
        const { hasError } = this.props.value;            

        let name;

        if(this.props.value.user !== null){
            name = this.props.value.user.name
        }
       
        const inputId = errorId ? 'sign-in__input sign-in__input_error' : 'sign-in__input';
        const inputName = errorName ? 'sign-in__input sign-in__input_error' : 'sign-in__input';
        
        return(
            <div className='sign-in'>
                { openModal &&
                    <Modal close={this.closeModal}>
                        <p>Приветствую вас, {name} </p>
                    </Modal>
                }
                { hasError && openModal == 'networkError' &&
                    <Modal close={this.closeModal}>
                        <p>Произошла ошибка при загрузке данных. Попробуйте еще раз.</p>
                    </Modal>
                }
                <form className='sign-in__form' onSubmit={this.handleSubmit}>
                    <h2 className='sign-in__title'>SignIn</h2>
                    <label className='sign-in__label' htmlFor='id'>UserId</label>
                    <input 
                        className={inputId}
                        name='id' 
                        id='id'
                        value={this.state.id}
                        placeholder='Введите ваш id'
                        onChange={this.onChange}
                    />
                    <label className='sign-in__label' htmlFor='name'>User Name</label>
                    <input 
                        className={inputName}
                        name='name'
                        id='name' 
                        value={this.state.name}
                        placeholder='Введите вашe имя'
                        onChange={this.onChange}
                    />
                    {
                        this.props.value.hasError && <p> Неверно указано имя или id</p>
                    }
                    <button className='sign-in__button' type='submit'>
                        Sing in
                    </button>
                </form>
            </div>
        )
    }
}

export default withContext( SignIn, UserConsumer );