import SingleFileComponent from "./SingleFileComponent.js";
import BarChart from "./BarChart.js";
import BarChartStacked from "./BarChartStacked.js";

new Vue({
  el: "#app",
  template: `
  <div id="app" class="chart-container">
  <single-file-component></single-file-component>
  <div v-if="architectureData.length >0">
    <h2>Composition</h2>
    <bar-chart-stacked :uniqueComps="uniqueCompsAll" :styleCount="styleCount" :templateCount="templateCount" :scriptCount="scriptCount"/>
    <h2>Inner Workings</h2>
    <bar-chart :uniqueComps="uniqueCompsAll" :values="compImportCount" label="# of Child Components"/>
    <bar-chart :uniqueComps="uniqueCompsAll" :values="es6ImportCount" label="# of ES6 Imports"/>
    <bar-chart :uniqueComps="uniqueCompsAll" :values="uniqueCompsData" label="# Data Properties"/>
    <h2>Style</h2>
    <bar-chart :uniqueComps="uniqueCompsAll" :values="cssClassesCount" label="# CSS Classes"/>
    <bar-chart :uniqueComps="uniqueCompsAll" :values="cssIdSelectorsCount" label="# CSS ID Selectors"/>

</div>

</div>
  `,
  components: {
    SingleFileComponent,
    BarChart,
    BarChartStacked
  },
  data: {
    seen: true,
    parentChildData: [],
    architectureData: []
  },
  computed: {
    uniqueCompsAll() {
      return [
        ...new Set(
          this.architectureData.map(r => {
            return r.name;
          })
        )
      ];
    },
    uniqueCompsDataAll() {
      return this.uniqueCompsAll.map(c => {
        return this.architectureData.filter(s => s.name === c)[0];
      });
    },
    compImportCount() {
      return this.uniqueCompsDataAll.map(c => {
        return c.components === null ? 0 : c.components.length;
      });
    },
    uniqueCompsData() {
      return this.uniqueCompsDataAll.map(c => {
        return c.data === null ? 0 : c.data.length;
      });
    },
    es6ImportCount() {
      return this.uniqueCompsDataAll.map(c => {
        return c.imports === null ? 0 : c.imports.length;
      });
    },
    templateCount() {
      return this.uniqueCompsDataAll.map(c => {
        return c.templateLength;
      });
    },
    scriptCount() {
      return this.uniqueCompsDataAll.map(c => {
        return c.scriptLength;
      });
    },
    styleCount() {
      return this.uniqueCompsDataAll.map(c => {
        return c.styleLength;
      });
    },
    cssClassesCount() {
      return this.uniqueCompsDataAll.map(c => {
        return c.cssClassesCount;
      });
    },
    cssIdSelectorsCount() {
      return this.uniqueCompsDataAll.map(c => {
        return c.cssIdSelectorsCount;
      });
    }
  },
  mounted() {
    $.getJSON("ParentChildData.json", data => {
      this.parentChildData = data;
      $.getJSON("ComponentArchitecture.json", archData => {
        this.architectureData = archData;
      });
    });
  }
});
