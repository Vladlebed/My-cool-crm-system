<template>
    <div class="full-screen">
        <div class="container">
            <div class="row">
                <div class="col-2 col-lg-3 col-md-4 col-sm-5 col-offset-5">
                    <div class="col-grid">
                        <form @submit.prevent="auth">
                            <p>Логин</p>
                            <input type="text" v-model="login">                
                            <p>Пароль</p>
                            <input type="password" v-model="password">
                            <button type="submit">Вход</button>
                        </form>                            
                    </div>    
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
export default{
    name:'register',
    data(){
        return {
            login: '',
            password: ''
        }
    },
    methods:{
        auth(){
            this.$router.push('/')
            console.log(this.login,this.password)
        }
    }
}   
</script>

<style lang="sass">
    
</style>