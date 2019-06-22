<template>
  <v-container>
  <div class="hello" ref="chartdiv">    
  </div>
  </v-container>
</template>

<script>

import { mapActions, mapState } from 'vuex';
/*Bibliotecas del rack*/
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default {
  name: 'Rack',
  data () {
    return {
      //
    }
	},  
  mounted() {
    /*Chart init*/
    var chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    chart.paddingRight = 30;
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    /*Color estático*/
    var colorSet = new am4core.ColorSet();
    colorSet.saturation = 1.5;

    /*Data source*/
    chart.dataSource.url = this.serverURL + '/rack/';
    //chart.dataSource.reloadFrequency = 1000;
    chart.dataSource.incremental = true;
    chart.dataSource.load();
    chart.dataSource.parser = new am4core.JSONParser();
    chart.dataSource.parser.options.emptyAs = 0;
    
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "roomNumber";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;

    /*Datos de tiempo*/ 
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.dateFormatter.dateFormat = "yyyy-MM-dd";
    dateAxis.renderer.minGridDistance = 50;
    dateAxis.baseInterval = { count: 1, timeUnit: "day" };
    dateAxis.min = new Date().getTime();
    dateAxis.max = new Date(2025, 0, 1, 24, 0, 0, 0).getTime();
    dateAxis.strictMinMax = true;
    dateAxis.renderer.tooltipLocation = 0;

    /*Barrita con info (mouseIn)*/ 
    var series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText = "{firstNameGuest} {lastNameGuest} - Desde: {dateIn} / Hasta: {dateOut}";    
   
    /*Barra de reserva*/
    series1.dataFields.openDateX = "dateIn";
    series1.dataFields.dateX = "dateOut";
    series1.dataFields.categoryY = "roomNumber";
    series1.fill = am4core.color("red").lighten(0.0);
    series1.stroke = am4core.color("red").lighten(0.0);
/*    series1.columns.template.propertyFields.fill = "color"; // get color from data
    series1.columns.template.propertyFields.stroke = "color";*/
    series1.columns.template.strokeOpacity = 1;

    /*Scrollbar's*/ 
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();
  },
  computed: {
    ...mapState([
      'serverURL',
    ]),
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  height: 500px;
}
</style>