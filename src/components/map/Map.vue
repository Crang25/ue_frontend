<template>
    <!-- <div class="map-wrapper">
    </div> -->
    <div id="mapid">
    </div>

    <button class="map-btn add-btn" @click="showPopup"></button>

    <div class="add-popup">
        <div class="add-wrapper">
            <span>ТИП ПУБЛИКАЦИИ</span>
            <button class="close-popup" @click="closePopup"></button>
            <div class="add-list">
                <ul>
                    <li>
                        <button class="add-item" @click="addStatement">Создать обращение</button>
                    </li>
                </ul>
            </div>
    
            <div class="add-form">
                <form @submit.prevent="createStatement">
                    <div class="form-wrapper-event">

                        <input v-model="title" type="text" class="text-input" placeholder="Заголовок обращения" required>
                        <textarea v-model="body" class="text-input" cols="30" rows="8" placeholder="Описание обращения" required></textarea>
                        <br><label for="x_coord">Координата по x</label>
                        <br><input v-model="xCoord" id="x_coord" type="number" step="0.0001" min="47.2260" max="47.2889" class="text-input" required>
                        <br><label for="x_coord">Координата по y</label>
                        <br><input v-model="yCoord" type="number" step="0.0001" min="38.8748" max="38.9651" class="text-input" required>
                        <br><label>Категория обращения</label>
                        <br><select v-model="category" required>
                            <option>ЖКХ</option>
                            <option>Администрация</option>
                            <option>Здоровье/Безопасность</option>
                            <option>Другое</option>
                        </select>
                        <input class="form-btn" type="submit" value="Добавить обращение">
                        <input class="form-btn cancel-btn" @click="cancelAdd" type="button" value="Отмена">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from 'axios';
import config from "@/config";

export default {
    name: 'Map',
    data() {
        return {
            center: [47.21073, 38.91932],
            zoom: 12,
            title: '',
            body: '',
            xCoord: 47.2260,
            yCoord: 38.8748,
            category: '',
            statements: null,
        }
    },
    computed: {
        getAllStatements() {
            if (!this.$store.getters.getAllStatements) return;
            return this.$store.getters.getAllStatements;
        }
    },
    methods: {
        async setupLeafletMap() {
            const mymap = L.map('mapid', {
                center: this.center,
                zoom: this.zoom,
            });
            // Это что-то типа рекламы и без этого работать не будет
            const attribution = 
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
            
            const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            L.tileLayer(tileUrl, {
                attribution: attribution,
                maxZoom: 18,
            }).addTo(mymap);
            
            
            // Геопозиция пользователя
            let userPos = [47.21537, 38.92813];
            
            // Определение местоположения пользователя
            navigator.geolocation.getCurrentPosition(success, ({message}) => console.log(message), {
                // высокая точность определения местоположения
                enableHighAccuracy: true,
            });
            
            // Если пользователь разрешил определить местоположение
            function success({ coords }) {
                // Получаем широту и долготу
                const {latitude, longitude} = coords;
                userPos = [latitude, longitude];
                console.log(userPos);
            }

            // Создание маркеров
            // Маркер для созданных меток
            // const labelMarkerIcon = L.icon({
            //     iconUrl: '../images/map_pointer.svg',
            //     iconSize: [32, 30],
            // });

            // // Маркер для созданных мероприятий
            // const eventMarkerIcon = L.icon({
            //     iconUrl: '../images/event_icon.svg',
            //     iconSize: [32, 30],
            // });

            // // Маркер для созданных статей    
            // const articleMarkerIcon = L.icon({
            //     iconUrl: '../images/article_icon.png',
            //     iconSize: [32, 30],
            // })
            
            // Маркер для текущего положения пользователя
            const curMarkerIcon = L.icon({
                iconUrl: '../images/map-marker_64.png',
                iconSize: [32, 30],
            });
            
            // Текущее положение пользователя
            L.marker(userPos, {
                icon: curMarkerIcon,
            }).addTo(mymap).bindPopup('Ваше местоположение').openPopup();

            const statementMarkerIcon = L.icon({
                iconUrl: '../images/event_icon.svg',
                iconSize: [32, 30],
            });

            
            let statementList = []
            try {
                const resp = await axios.get(config.STATEMENT + '/all');
                if (resp.status !== 200) {
                    console.log(`Error fetch my statements status: ${resp.status}`);
                    return;
                }
                statementList = resp.data.response;

            } catch (error) {
                console.log(`Error fetch my statements: ${error}`);
            }
            if (!statementList) return;
            console.log(statementList);
            const statementMarkerList = []
            statementList.forEach(item => {
                const coords = item.location.split(' ');
                coords[0] = Number(coords[0].replace(/,/g, '.'));
                coords[1] = Number(coords[1].replace(/,/g, '.'));
                const statementMarker = L.marker(coords, {
                    icon: statementMarkerIcon,
                }).addTo(mymap);

                const title = item.title;
                const body = item.body;
                const category = item.category.title;
                const author = item.owner.username;
                const createdDate = item.created_date;

                const popupContetnt = `<b>${title}</b><p style="word-wrap: break-word;">${body}</p><hr>
                <b>Категория:</b> <u>${category}</u><br><b>Автор:</b> <u>${author}</u><br>Дата создания: ${createdDate}`;
                statementMarker.bindPopup(popupContetnt);
                statementMarkerList.push(statementMarker);
            });

            const statementLayerGroup = L.layerGroup(statementMarkerList)

            const overlayMap = {
                'Обращения': statementLayerGroup,
            };
        
            L.control.layers(overlayMap).addTo(mymap);

        },

        showPopup() {
            document.querySelector('.add-popup').style.display = 'block';
            document.querySelector('.add-btn').style.display = 'none';
            document.querySelector('header').style.display = 'none';
        },

        closePopup() {
            document.querySelector('.add-popup').style.display = 'none';
            document.querySelector('.add-btn').style.display = 'inline-block';
            document.querySelector('header').style.display = 'flex';
        },

        addStatement() {
            document.querySelector('.add-list').style.display = 'none';
            document.querySelector('.add-form').style.display = 'block';
        },

        cancelAdd() {
            document.querySelector('.add-form').style.display = 'none';
            document.querySelector('.add-list').style.display = 'block';
        },

        createStatement() {
            const data = {
                title: this.title,
                body: this.body,
                attachments: [],
                category_id: {
                    'ЖКХ': 1,
                    'Администрация': 2,
                    'Дороги': 3,
                    'Здоровье/Безопасность': 4,
                    'Другое': 5,
                }[this.category],
                is_issue: false,
                location: `${this.xCoord} ${this.yCoord}`,
            };
            this.$store.dispatch('createStatement', data);
        },  
    },

    mounted() {
        this.setupLeafletMap();
    },
    
    watch: {

    }

}
</script>

<style scoped>

body {
    overflow: hidden;
}

.map-wrapper {
    width: 98%;
    height: 96%;
    top: 2%;
    left: 1%;
}

#mapid {
    width: 100%;
    height: 100%;
    /* height: 83.9%; */
    position: absolute;
}

.map-btn {
    background-size: 50px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    border: none;
    position: absolute;
    left: 90%;
    cursor: pointer;
    z-index: 400;
}

.add-btn {
    background: url('/images/add.svg') no-repeat;
    background-color: rgb(194, 177, 177);
    top: 78%;
}

.add-popup {
    position: fixed;
    width: 60%;
    /* height: 80%; */
    top: 5%;
    left: 20%;
    background-color: black;
    opacity: 0.9;
    z-index: 500;
    border-radius: 40px;
    display: none;
}

.add-wrapper {
    margin: 10px 0 0 0;
    text-align: center;
    font-size: 18px;
    font-family: 'Raleway', sans-serif;
    color: white;
    padding-bottom: 10px;
}

.add-wrapper > span {
    text-decoration: underline;
}

.add-wrapper > .close-popup {
    right: 5%;
}

.close-popup {
    background: url('/images/red_close.svg') no-repeat;
    background-size: 30px;
    width: 30px;
    height: 30px;
    border: none;
    cursor: pointer;
    position: absolute;
}

.add-list > ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    margin-top: 40px;
}

.add-item:first-child {
    margin-top: 12px;
}

.add-item {
    width: 65%;
    height: 80px;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    margin-bottom: 40px;
    background-color: white;
    font-size: 22px;
    font-family: 'Raleway', sans-serif;
}

.add-item:hover {
    background-color: rgb(211, 176, 176);
}

.add-form {
    display: none;
}

textarea {
    resize: none;
}

.text-input {
    width: 80%;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-shadow: inset 0 1px 3px #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 12px;
    padding-bottom: 12px;
    font-size: 13px;
    font-family: 'Raleway', sans-serif;
}

.form-btn {
    background-color: #04AA6D;
    color: white;
    cursor: pointer;
    width: 80%;
    padding: 8px;
    border: none;
    border-radius: 4px;
    margin: 5px 0;
    opacity: 0.85;
    line-height: 20px;
    text-decoration: none;
    font-size: 18px;
    font-family: 'Raleway', sans-serif;
    margin-top: 12px;
}

.form-btn:hover {
    background-color: #21694e;
}
</style>