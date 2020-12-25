<template>
    <div class="full-screen">
        <div class="container">
            <div class="row">
                <div class="col-6 col-offset-3 bad-page">
                    <p class="bad-page__error-code">404</p>                            
                    <p class="bad-page__text">О нет!</p>                            
                    <p class="bad-page__text">Такой страницы не найдено :(</p>                            
                    <router-link class="crm-btn bad-page__link" to="/crm">На главную</router-link>                              
                </div>
            </div>
        </div>
    </div>	
</template>

<script>
export default{
	name:'bad',
	data(){
		return {

		}
	},
	methods:{

	}
}	
</script>

<style lang="sass">
    .bad-page
        text-align: center
        &__error-code  
            font-size: 45px
            font-weight: 800
            margin-bottom: 40px
        &__text
            font-size: 20px
            color: var(--text-other)
            margin: 5px 0
        &__link
            max-width: 200px
            margin: 0 auto
            margin-top: 20px
</style>