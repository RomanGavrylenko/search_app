import React, {Component} from 'react';
import SWAPI from '../../services/sw-api';
import ItemCard from '../../components/person-card/person-card';
import SearchForm from '../../components/search-form/search-form';
import Preloader from '../../components/preloader/preloader';

class SearchPerson extends Component {

    SW = new SWAPI();

    state={
       people : null,
       nextLink: null,
       filterPeople: null,
       search: '',
       loaded: false 
    }

    // получаем данные из сети или из sessionStorage если до єтого их уже получили

    componentDidMount(){

        if(sessionStorage.getItem('person-state')){

            let data = JSON.parse(sessionStorage.getItem('person-state'));
            this.setState({
                ...data
            })
        } else {

            const {getPeople} = this.SW;

            getPeople()
                .then(res=>{
                    
                    this.setState({
                        people: res.results,
                        nextLink: res.next,
                        loaded: true,
                    });

                })
                .catch(e=> console.log(e));
        }
    }

    //добавляем данные в sessionStorage, чтобы при возвращении на главную страницу
    // не было необходимости снова увеличивать кол-во отображаемых пользователей с 10

    componentWillUnmount(){
       let data = JSON.stringify(this.state);
       sessionStorage.setItem('person-state', data);
    }

    //увеличить кол-во отображаемых пользователей на странице

    addData = async () => {
        const {getPeople} = this.SW;
    
        let data = await getPeople(this.state.nextLink);
    
        this.setState(state=>{
          return {
            people: [...state.people, ...data.results],
            nextLink: data.next
          }
        });
    }

    //выбрать карточку и перейти на индивидуальную страницу

    selectPerson=(url)=>{
        const id = this.SW.getId(url);
        this.props.history.push(id);
    }

    //отобразить список карточек (людей)

    getItemList = ()=> {

        const {search, people, filterPeople } = this.state;
        let data;
        if(search === ''){
            data = people
        } else {
            data = filterPeople;
        }

        return data.map(person=>{
            return <ItemCard 
                    key={person.url} 
                    loadImage = {this.SW.loadPersonImage}
                    data={person}
                    selectPerson={this.selectPerson} />
                    
        })


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
        let intermediatePeople = [...this.state.people];
        console.log(search);

        let filterArray = intermediatePeople.filter(person=>{
            return person.name.toLowerCase().includes(search)
        });

        this.setState({
            filterPeople : filterArray
        });
    }

    render(){

        if(!this.state.loaded){
            return <Preloader />;
        }
        console.log(this.props)

        return(
            <div className='person'>
                <SearchForm 
                    value={this.state.search}
                    changeSearch = {this.changeSearch}/>
                <ul className='person__card'>
                    {this.getItemList()}
                </ul>
                { this.state.nextLink &&
                    <button 
                        onClick={this.addData}
                        className='person__button'>
                        show more
                    </button>
                }
            </div>
        );
    }
}

export default SearchPerson;