<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group
                    id="input-group-1"
                    label="Otsikko:"
                    label-for="input-1"
            >
                <b-form-input
                        id="input-1"
                        v-model="form.otsikko"
                        required
                        placeholder=""
                />
            </b-form-group>

            <b-form-group id="input-group-2" label="Lisätietoja:" label-for="input-2">
                <b-form-input
                        id="input-2"
                        v-model="form.tietoja"
                        required
                        placeholder=""
                />
            </b-form-group>

            <b-form-group style="display: block" id="input-group-3" label="Aika:" label-for="input-3">
                <b-row>
                    <b-col md="auto">
                        <b-calendar v-model="form.aika" @context="onContext" v-bind="labels[locale] || {}"
                                    :locale="locale"/>
                    </b-col>

                    <b-col md="auto">
                        <b-time v-model="form.kello" v-bind="labels[locale] || {}"
                                :locale="locale" @context="onContext"/>
                    </b-col>
                </b-row>
            </b-form-group>

            <b-button squared type="submit" variant="primary">Lisää</b-button>
            <b-button squared type="reset" variant="danger">Tyhjennä</b-button>
        </b-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                form: {},
                locale: 'fi-FI',
                labels: {
                    'fi-FI': {
                        labelPrevDecade: 'Edellinen vuosikymmen',
                        labelPrevYear: 'Edellinen vuosi',
                        labelPrevMonth: 'Edellinen kuukausi',
                        labelCurrentMonth: 'Kuluva kuukausi',
                        labelNextMonth: 'Seuraava kuukausi',
                        labelNextYear: 'Seuraava vuosi',
                        labelNextDecade: 'Seuraava vuosikymmen',
                        labelToday: 'Tänään',
                        labelSelected: 'Valittu aika',
                        labelNoDateSelected: 'Päivämäärää ei valittu',
                        labelCalendar: 'Kalenteri',
                        labelNav: 'Navigointi',
                        labelHelp: 'Käytä nuolinäppäimiä päivän valitsemiseen',
                        labelHours: 'Tunnuit',
                        labelMinutes: 'Minuutit',
                        labelSeconds: 'Sekuntit',
                        labelIncrement: 'Myöhemmin',
                        labelDecrement: 'Aiemmin',
                        labelNoTimeSelected: 'Kellonaikaa ei valittu'
                    },
                }
            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault()
                this.$store.commit('addEvent', this.form)
                alert("Tapahtuma lisätty!")
            },
            onReset(evt) {
                evt.preventDefault()
                this.form.otsikko = ''
                this.form.tietoja = ''
                this.form.aika = ''
                this.form.kello = ''
            },
            onContext(ctx) {
                this.context = ctx
            }
        }
    };
</script>
<style scoped>
.btn {
    margin: 0 10px 0 0;
}
</style>