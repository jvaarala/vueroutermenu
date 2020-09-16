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
                state.events = events
            },
            addEvent(state, o) {
                state.events.push(o)
            }
        },
        actions: {
            fillEvents(ctx, events) {
                ctx.commit('FILL_EVENTS', events)
            }
        }
    }
)