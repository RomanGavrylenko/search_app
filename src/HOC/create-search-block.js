import React, { Component } from 'react';
import ItemCard from '../components/person-card/person-card';
import Preloader from '../components/preloader/preloader';

export default function createSearchBlock(Wrapped, API, category ){
    return class extends Component {

        state={
            dataList : null,
            nextLink: null,
            filterList: null,
            search: '',
            loaded: false 
        }

        // получаем данные из сети или из sessionStorage если до єтого их уже получили

        componentDidMount(){

            if(sessionStorage.getItem(`${category}-state`)){

                let data = JSON.parse(sessionStorage.getItem(`${category}-state`));
                this.setState({
                    ...data
                })
            } else {

                //const getData = this.SW.getData;

                /*API.getData()
                    .then(res=>{
                        
                        this.setState({
                            dataList: res.results,
                            nextLink: res.next,
                            loaded: true,
                        });

                    })
                    .catch(e=> console.log(e));*/
               this.getNeed()
            }
        }

        //получаем необходимые данные

        getNeed = async () => {
            let dataList = [];
            console.log(dataList)
            for await (let item of API.getData()) {
                console.log(item)
                item.id = API.getId(item.url);
                dataList.push(item)
            }
            console.log(dataList)
            this.setState({
                dataList,
                loaded: true
            })
            return dataList;
        }

        //добавляем данные в sessionStorage, чтобы при возвращении на главную страницу
        // не было необходимости снова увеличивать кол-во отображаемых пользователей с 10

        componentWillUnmount(){
            let data = JSON.stringify(this.state);
            sessionStorage.setItem(`${category}-state`, data);
        }

        //увеличить кол-во отображаемых пользователей на странице

        addData = async () => {
        
            let data = await API.getData(this.state.nextLink);
        
            this.setState(state=>{
                return {
                    dataList: [...state.dataList, ...data.results],
                    nextLink: data.next
                }
            });
        }

        //выбрать карточку и перейти на индивидуальную страницу

        selectPerson=(url)=>{
            const { history } = this.props;
            const id =API.getId(url);
            history.push(id);
        }

        //отобразить список карточек (людей)

        renderList = (img)=> {

            const {search, dataList, filterList } = this.state;
            let data;
            if(search === ''){
                data = dataList
            } else {
                data = filterList;
            }

            return data.map(item=>{
                return <ItemCard 
                        key={item.url} 
                        loadImage = {API.loadImage}
                        data={item}
                        selectPerson={this.selectPerson}
                        newImage={img} />
            });
        }

        //изменить инпут

        changeSearch=(e)=>{
            const value = e.target.value.toLowerCase()

            this.setState(()=>{
                return {
                    search: value
                }
            }, this.getSelect(value))
        }

        //отфильтровать массив из для поиска по строка из первоначального

        getSelect = (search)=>{

            //создаем новый массив для неизменности текущего состояния
            let intermediateList = [...this.state.dataList];
            console.log(search);

            //получаем отфильтрованный массив
            let filterArray = intermediateList.filter(item=>{
                return item.name.toLowerCase().includes(search)
            });

            this.setState({
                filterList : filterArray
            });
        }

        render(){

            if(!this.state.loaded){
                return <Preloader />;
            }
        

            return(
                <Wrapped 
                    {...this.props}
                    {...this.state}
                    changeSearch = {this.changeSearch}
                    renderList = {this.renderList}
                    addData = {this.addData} />
            );
        }
    }
}