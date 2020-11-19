<template>
    <div id="app">
        <header>
            <div class="container">
                <div class="row">
                    <div class="col-3 header-col">
                        <p class="title">
                            Месяц: {{momentGetMonth()}}
                        </p>                        
                    </div>                
                </div>
            </div>            
        </header>
        

        <div class="container">
            <transition name="fade" mode="out-in">
                <router-view />
            </transition>
        </div>
        <notifications group="foo" position="bottom left"/>
    </div>
</template>

<script>
import moment from 'moment';
export default{
    name:'app',
    data(){
        return{
            auth: true
        }
    },
    methods:{
        momentGetMonth(){
            return moment(new Date()).locale('ru').format('MMMM')
        }
    },
    mounted(){
        // !this.auth ? this.$router.push('/') : false
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
    }
</style>

<style lang="sass">
body
    font-family: 'Inter', sans-serif

header
    background: var(--primary)
    // border-bottom: 1px solid var(--text-other)
    .title
        color: var(--text-other)
        margin: 0
        padding: 0
    .header-col
        height: 100%
        display: flex
        align-items: center
        height: 40px

.col-grid
    margin-top: 10px
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
select
    width: 100%
    height: 40px
    border: none
    border-bottom: 2px solid var(--primary)
    margin: 7px 0
    margin-top: 0
    font-family: 'Inter', sans-serif;

button
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
</style>