import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store(
    {
        state: {
            events: [],
        },
        getters: {
            events: state => state.events,
        },
        mutations: {
            FILL_EVENTS(state, events) {
                console.log("*** FILL_EVENTS " + JSON.stringify(events))
                state.events = events
            },
            addEventToStore(state, o) {
                console.log("*** addEventToStore: " + JSON.stringify(o))
                state.events.push(o)
            },
            removeFromStateById(state, id) {
                console.log("*** removeFromStateById: " + id)
                state.events = state.events.filter(item => item.id !== id)
            },
        },
        actions: {
            fillEvents(ctx, events) {
                ctx.commit('FILL_EVENTS', events)
            }
        }
    }
)