<template>
    <div class="full-screen">
        <div class="container">
            <div class="row">
                <div class="col-4 col-md-4 col-sm-5 col-offset-4">
                    <div class="col-grid">
                        <form @submit.prevent="auth">
                            <p>Email</p>
                            <input type="text" v-model="email">                
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
            email: '', //testmail@gmail.com
            password: '' //12341234
        }
    },
    methods:{
        async auth(){
            try {
                await this.$store.dispatch('login',{email:this.email,password:this.password})
                .then(()=>{
                    this.$router.push('/')
                })
            } catch(e) {
                console.log(e);
            }

        }
    }
}   
</script>

<style lang="sass">
    
</style>