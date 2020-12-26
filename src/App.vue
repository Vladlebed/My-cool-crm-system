<template>
    <div id="app">    
        <div class="container">
            <transition name="fade" mode="out-in">
                <router-view />
            </transition>
        </div>
        <Menu v-if="authState"/>            
        <notifications group="foo" position="bottom left"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import axios from 'axios'
import Menu from '@/components/Interface/Menu'
export default{
    name:'app',
    components:{
        Menu
    },
    computed:{
        ...mapGetters([
          'authState'
        ]),
    },
    data(){
        return{
            auth: false
        }
    },
    methods:{
        momentGetMonth(){
            return moment(new Date()).locale('ru').format('MMMM')
        },
        async logout(){
            await this.$store.dispatch('logout')
            this.$router.push('/login')
        }
        // setTypes
    },
    mounted(){

    }
}
</script>
<style lang="scss">
    @import '@/assets/style/_base.scss';
    @import url(https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap);
    :root{
         --background: rgb(18, 29, 51);
        --grid: #fff;
        --text: rgb(53, 63, 82);
        --primary: rgb(12, 108, 242);
        --d-primary: rgb(12, 108, 242);
        --text-other: #fff;        
        --dark: #000;        
    }
</style>

<style lang="sass">
body
    font-family: 'Inter', sans-serif

.col-grid
    margin: 5px 0
    padding: 10px
    background: var(--grid)
    border-radius: 7px
    height: 100%
    &--auto-height
        height: inherit
    &--no-border
        border-radius: 0px


.title
    font-weight: 500
    font-size: 18px


.fade-enter, .fade-leave-to 
  opacity: 0
  transform: translateX(2em)


.fade-enter-active, .fade-leave-active
  transition: all .3s ease
#app
    min-height: 100vh
    background: var(--background)

.full-screen
    height: 100vh
    display: flex
    align-items: center

p
    color: var(--text)

input[type="text"],
input[type="password"],
select
    width: 100%
    height: 40px
    border: none
    border-bottom: 2px solid var(--primary)
    margin: 7px 0
    margin-top: 0
    font-family: 'Inter', sans-serif;

.crm-btn,
    width: 100%
    height: 40px
    background: var(--primary)
    color: var(--text-other)
    display: flex
    justify-content: center
    align-items: center
    font-family: 'Inter', sans-serif;
    font-weight: 600
    border-radius: 7px
    cursor: pointer
    margin-top: 10px

.title
    border-bottom: 2px solid var(--primary)
    padding-bottom: 5px
    // margin-bottom: 5px
    display: flex
    justify-content: space-between
    align-items: center
    input
        border-bottom: none
        width: 110px
        height: 35px
        padding: 4px 7px 
        background: var(--primary)
        color: var(--text-other)
        border-radius: 5px
        &::placeholder
            color: var(--text-other)
    &.no-border
        border: none

.text-centred
    text-align: center

.list
    height: 410px
    overflow-y: hidden
    &.height-auto
        height: auto
    .list-element
        position: relative 
        padding: 7px 0
        border-bottom: 2px solid var(--primary)
        i
            margin-right: 10px
        &:hover
            i
                opacity: 1
        &__name
            font-weight: 500
            font-size: 17px
            display: flex
            justify-content: space-between
            i
                font-size: 17px
                opacity: 0
                cursor: pointer

        &__date
            font-size: 12px
        &__description
            font-size: 16px
            font-style: italic
            padding: 5px 0px 
        button
            margin-top: 10px
</style>