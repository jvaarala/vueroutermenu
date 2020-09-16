<template>
    <b-container id="app">
        <b-row>
            <b-col>
                <navbar/>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <router-view style="margin-top: 10px; text-align: left" :events="events"/>
            </b-col>
        </b-row>
    </b-container>

</template>

<script>
    import Navbar from '@/components/Navbar';
    import {mapActions, mapGetters} from 'vuex';

    export default {

        name: 'App',
        components: {
            Navbar
        },
        methods: {
            ...mapActions(['fillEvents']),
        },
        computed: {
            ...mapGetters(['events'])
        },
        mounted() {
            let requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch("http://localhost:3001/events", requestOptions)
                .then(response => response.json())
                .then(result => {
                        console.log(result);
                        this.fillEvents(result);
                    }
                )
                .catch(error => console.log('error', error));
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

</style>
