<template>
    <div>
        <b-form @submit.prevent="validateBeforeSubmit" @reset="onReset">
            <b-form-group
                    id="input-group-1"
                    label="Otsikko:"
                    label-for="input-1"
            >
                <b-form-input
                        id="input-1"
                        name="otsikko"
                        v-validate="'required'"
                        v-model="form.otsikko"
                        placeholder=""
                        :class="{'input': true, 'is-danger': errors.has('otsikko') }"
                />
                <span v-show="errors.has('otsikko')" class="help is-danger">{{ errors.first('otsikko') }}</span>
            </b-form-group>

            <b-form-group id="input-group-2" label="Lisätietoja:" label-for="input-2">
                <b-form-input
                        id="input-2"
                        name="tietoja"
                        v-validate="'required'"
                        v-model="form.tietoja"
                        placeholder=""
                        :class="{'input': true, 'is-danger': errors.has('tietoja') }"
                />
                <span v-show="errors.has('tietoja')" class="help is-danger">{{ errors.first('tietoja') }}</span>
            </b-form-group>

            <label for="input-3">Päivämäärä:</label>
            <b-input-group class="mb-3">
                <b-form-input
                        id="input-3"
                        name="paivamaara"
                        v-validate="'required|date_format:yyyy-MM-dd'"
                        v-model="form.aika"
                        type="text"
                        autocomplete="off"
                        placeholder="YYYY-MM-DD"
                        :class="{'input': true, 'is-danger': errors.has('paivamaara') }"
                />
                <b-input-group-append>
                    <b-form-datepicker
                            :label-help="labels[locale].labelHelp || {}"
                            v-model="form.aika"
                            button-only
                            right
                            :locale="locale"
                            aria-controls="paivamaara"
                            :class="{'input': true, 'is-danger': errors.has('paivamaara') }"
                    />
                </b-input-group-append>
            </b-input-group>
            <span v-show="errors.has('paivamaara')" class="help is-danger">{{ errors.first('paivamaara') }}</span>
            <div>
                <b-button squared type="submit" variant="primary">Lisää</b-button>
                <b-button squared type="reset" variant="danger">Tyhjennä</b-button>
            </div>
        </b-form>
    </div>
</template>
<script>
    import finnish from 'vee-validate/dist/locale/fi';
    import axios from 'axios'

    export default {
        data() {
            return {
                form: {},
                locale: 'fi-FI',
                showDecadeNav: false,
                hideHeader: false,
                weekday: 1,
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
                        labelHours: 'Tunnit',
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
            onReset(evt) {
                evt.preventDefault();
                this.emptyFormFields()
            },
            emptyFormFields() {
                this.form.otsikko = '';
                this.form.tietoja = '';
                this.form.aika = '';

            },
            validateBeforeSubmit() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.postFormToDb();
                        this.emptyFormFields();
                    }
                });
            },
            postFormToDb() {
                let eventObject = {
                    otsikko: this.form.otsikko,
                    tietoja: this.form.tietoja,
                    aika: this.form.aika
                }

                axios.post('http://localhost:3001/events', eventObject).then(response => {
                    console.log(response.status, response.statusText)
                    if (response.status === 201) {
                        this.$store.commit('addEventToStore', this.form);
                        alert('Tapahtuma lisätty!');
                    }
                }).catch(error => console.log('error', error));
            }
        },
        created() {
            this.$validator.localize('fi', {
                messages: finnish.messages,
                attributes: {
                    otsikko: 'Otsikko',
                    tietoja: 'Lisätieto',
                    paivamaara: 'Päivämäärä'
                }
            });

            // start with finnish locale.
            this.$validator.localize('fi');
        }
    };
</script>
<style scoped>
    .btn {
        margin: 1rem 1rem 0 0;
    }

    .is-danger {
        color: red;
    }

    .mb-3 {
        margin-bottom: 0 !important;
    }
</style>