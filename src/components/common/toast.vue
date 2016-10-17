<template>
    <div>
        <vue-toast v-ref:toast></vue-toast>
    </div>
</template>

<script>
    import vueToast from 'vue-toast';
    import {showMessage,hideMessage} from './actions';
    import {getMessage} from '../../vuex/getters';
    import store from '../../vuex/store';

    export default{
        components: {vueToast},
        vuex: {
            actions: {showMessage,hideMessage},
            getters: {
                message: getMessage
            }
        },
        watch: {
            'message': {
                handler(value,oldValue){
                    if(value.content !== ''){
//                        this.showTosatMessage(value.content,value.type);
                        this.$refs.toast.setOptions({maxToasts: 3, position: 'center'});
                        this.$refs.toast.showToast(value.content,{
                            theme: value.type,
                            timeLife: 2000,
                            closeBtn: false,
                        });
                        hideMessage(store);
                    }
                },
                deep: true,
            }
        },
        methods: {
            showToastMessage(content,type = 'error',positon = 'top right') {
                this.$ref.toast.setOptions({maxToasts: 3, position: positon});
                this.$ref.toast.showToast(content,{
                    theme: type,
                    timeLife: 2000,
                    closeBtn: false,
                });
            }
        }
    };
</script>