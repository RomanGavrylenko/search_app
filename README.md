This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Приложение пока не является доработанным. 
Здесь использовано React, React-router, bootstrap 4(mixin: grid), Star war apiб
starwars-visualguide.com для получения изображений 

Также реализована некоторое подобие авторизации, для чего нам необходимо укащать id героя
и его имя, с некоторой валидацией и возможность редактировать данные пользователя в течении сессии. 
Данные о пользователе загружаются в LocalStorage и извлекаются с помощью cookie.

Данные загруженные с пользователем при получении картинок сохраняются в SessionStarage.
Изначально это планировалось при "постраничном добавлении" героев(единиц), т.к. API, ограничено 
выводом 10 записей на страницу. Однако после была написана функция генератор для подгрузки всех данных сразу.

Касательно React, то в приложении использован Context API для залогиненного пользователя, если авторизован.
Написаны компоненты высшего порядка:
1) чтобы для передачи контекста компоненту;
2) чтобы создать секцию с подгружаемыми данными (всеми;
3) чтобы создать секцию отображению подробной информации о выбранном блоке.

С помощью Portal создано модальное окно, которое отображается при входа пользователя на сайт, после логина.

