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
                        name="lisatieto"
                        v-validate="'required'"
                        v-model="form.tietoja"
                        placeholder=""
                        :class="{'input': true, 'is-danger': errors.has('lisatieto') }"
                />
                <span v-show="errors.has('lisatieto')" class="help is-danger">{{ errors.first('lisatieto') }}</span>
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
                            @context="onContext"
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
            onReset(evt) {
                evt.preventDefault()
                this.form.otsikko = ''
                this.form.tietoja = ''
                this.form.aika = ''
                this.form.kello = ''
            },
            onContext(ctx) {
                // The date formatted in the locale, or the `label-no-date-selected` string
                this.formatted = ctx.selectedFormatted
            },
            validateBeforeSubmit() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.$store.commit('addEvent', this.form)
                        alert('Tapahtuma lähetetty!');
                        return;
                    }
                });
            }
        },
        created() {
            this.$validator.localize('fi', {
                messages: finnish.messages,
                attributes: {
                    otsikko: 'Otsikko',
                    lisatieto: 'Lisätieto',
                    paivamaara: 'Päivämäärä'
                }
            });

            // start with english locale.
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