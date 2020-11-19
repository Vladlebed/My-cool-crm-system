<template>
	<div>
		<canvas ref="canvas" height="300"></canvas>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Doughnut } from 'vue-chartjs'
export default {
	extends: Doughnut,
	name:'Chart',
	props:['chartCategories','chartData'],
	computed:{
	    ...mapGetters([
	      'typesConsumption',
	      'namesOfTypes',
	    ]),
		renderChartData(){
			return {
		        labels: this.chartCategories,
		        datasets: [{
		            label: '# of Votes',
		            data: this.chartData,
		            backgroundColor: [
		                'rgba(255, 99, 132, 0.2)',
		                'rgba(54, 162, 235, 0.2)',
		                'rgba(255, 206, 86, 0.2)',
		                'rgba(75, 192, 192, 0.2)',
		                'rgba(153, 102, 255, 0.2)',
		                'rgba(123, 159, 64, 0.2)',
		                'rgba(200, 159, 64, 0.2)',
		                'rgba(255, 50, 64, 0.2)',
		                'rgba(55, 50, 64, 0.2)',
		            ],
		            borderColor: [
		                'rgba(255, 99, 132, 1)',
		                'rgba(54, 162, 235, 1)',
		                'rgba(255, 206, 86, 1)',
		                'rgba(75, 192, 192, 1)',
		                'rgba(153, 102, 255, 1)',
		                'rgba(255, 159, 64, 1)',
		                'rgba(255, 159, 64, 1)',
		                'rgba(255, 159, 64, 1)',
		                'rgba(55, 50, 64, 1)',
		            ],
		            borderWidth: 1
		        }]			
			}	
		},
	},
	data(){
		return {
			options:{
			    legend: {
			        display: false
			    }
			}
		}
	},
	methods:{
		getCategories(){
			const labels = []
			this.typesConsumption.forEach((el)=> {
				labels.push(this.formattingTypeName(el,this.namesOfTypes))
			});
			return labels
		}
	},
	mounted(){
		this.renderChart(this.renderChartData,this.options)
	},
	watch: {
	  	renderChartData () {
	    	this.renderChart(this.renderChartData,this.options)
	  	}
	}
}
</script>

<style>
	
</style>