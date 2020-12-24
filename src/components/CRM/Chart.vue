<template>
	<div>
		<canvas ref="canvas" class="chart"></canvas>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Doughnut } from 'vue-chartjs'
export default {
	extends: Doughnut,
	name:'Chart',
	props:['chartCategories','chartData','chartColors'],
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
		            backgroundColor: this.setChartColors(false),
		            borderColor: this.setChartColors(true),
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
		},
		setChartColors(isBorder){
			return [...this.chartColors]
		}
	},
	mounted(){
		console.log(this.renderChartData)
		this.renderChart(this.renderChartData,this.options)
	},
	watch: {
	  	renderChartData () {
	    	this.renderChart(this.renderChartData,this.options)
	  	}
	}
}
</script>

<style lang="sass" scoped>
	.chart
		width: 290px
		height: 290px
</style>