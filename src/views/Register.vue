<template>
    <div class="full-screen">
        <div class="container">
            <div class="row">
                <div class="col-4 col-md-12 centred">
                    <div class="col-grid">
                        <form @submit.prevent="auth">
                            <p>Email</p>
                            <input type="text" v-model="email"> 
                            <p>Имя</p>
                            <input type="text" v-model="name">                
                            <p>Пароль</p>
                            <input type="password" v-model="password">
                            <button type="submit" class="crm-btn">Регистрация</button>
                        </form>
                        <p>                       
                            <router-link to="/login">
                                Назад 
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
            email: '',
            password: '',
            name: '',
            startCapital: '',
        }
    },
    methods:{
        async auth(){
            try {
                await this.$store.dispatch('register',{email:this.email,password:this.password,name:this.name})
                .then(()=>{
                    this.$notify({
                      group: 'foo',
                      type: 'success',
                      text: 'You have been registered'
                    });
                    this.$router.push('/')
                })
            } catch(e) {
                this.$notify({
                  group: 'foo',
                  type: 'error',
                  text: e.message
                });
            }

        }
    }
}   
</script>

<style lang="sass">
    
</style>