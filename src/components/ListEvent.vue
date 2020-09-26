<template>
    <div>
        <b-table
                ref="selectableTable"
                selectable
                :select-mode="'single'"
                :items="events"
                :fields="['otsikko','tietoja','aika']"
                @row-selected="onRowSelected"
                responsive="sm"
        >
        </b-table>
        <div>
            <b-button
                    :disabled="selected.length === 0"
                    v-on:click="removeObjectFromDb(selected[0])"
                    variant="danger"
            >
                Poista
            </b-button>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: 'ListEvent',
        methods: {
            ...mapActions(['fillEvents']),
            removeObjectFromDb(o) {
                console.log("*** removeObjectFromDb()")
                axios.delete('http://localhost:3001/events/' + o.id).then((result) => {
                        console.log(result.status, result.statusText)
                        if (result.status === 200) {
                            this.$store.commit('removeFromStateById', o.id)
                        } else {
                            this.fetchApi()
                        }
                    }
                )

            },
            onRowSelected(items) {
                this.selected = items
            },
            fetchApi() {
                console.log("*** fetchApi() ")
                axios
                    .get('http://localhost:3001/events')
                    .then(response => {
                        console.log(response.status, response.statusText)
                        if (response.status === 200) {
                            this.$store.commit('FILL_EVENTS', response.data);
                        }
                    }).catch(error => console.log('error', error));
            },
        },
        computed: {
            ...mapGetters(['events']),
        },
        data() {
            return {
                selected: []
            }
        },
        mounted() {
            this.fetchApi();
        }
    };
</script>