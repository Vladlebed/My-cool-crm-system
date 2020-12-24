<template>
    <div class="full-screen">
        <div class="container">
            <div class="row">
                <div class="col-4 col-md-12 centred">
                    <div class="col-grid">
                        <form @submit.prevent="auth">
                            <p>Email</p>
                            <input type="text" v-model="email">                
                            <p>Пароль</p>
                            <input type="password" v-model="password">
                            <button type="submit" class="crm-btn">Вход</button>
                        </form>
                        <p>
                            Нет аккаунта?                         
                            <router-link to="/register">
                                Регистрация
                            </router-link>
                        </p>         
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
            email: '', //testmail@gmail.com
            password: '' //12341234
        }
    },
    methods:{
        async auth(){
            try {
                await this.$store.dispatch('login',{email:this.email,password:this.password})
                .then(()=>{
                    this.$router.push('/crm')
                })
            } catch(e) {
                console.log(e);
            }

        }
    }
}   
</script>

<style lang="sass">
    .centred
        margin: 0 auto
</style>