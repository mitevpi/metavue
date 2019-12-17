import SingleFileComponent from "./SingleFileComponent.js";
import BarChart from "./BarChart.js";

new Vue({
  el: "#app",
  template: `
  <div id="app">
  <single-file-component></single-file-component>
  <div v-if="architectureData.length >0">
    <bar-chart :uniqueComps="uniqueCompsParent" :values="uniqueCompsImportComps" label="# of Child Components"/>
    <bar-chart :uniqueComps="uniqueCompsAll" :values="uniqueCompsImportEs6" label="# of ES6 Imports"/>
    <bar-chart :uniqueComps="uniqueCompsAll" :values="uniqueCompsData" label="# Data Properties"/>
</div>

</div>
  `,
  components: {
    SingleFileComponent,
    BarChart
  },
  data: {
    seen: true,
    parentChildData: [],
    architectureData: []
  },
  computed: {
    uniqueCompsParent() {
      return [
        ...new Set(
          this.parentChildData.map(r => {
            return r.parent;
          })
        )
      ];
    },
    uniqueCompsAll() {
      return [
        ...new Set(
          this.architectureData.map(r => {
            return r.name;
          })
        )
      ];
    },
    uniqueCompsDataParent() {
      return this.uniqueCompsParent.map(c => {
        return this.architectureData.filter(s => s.name === c)[0];
      });
    },
    uniqueCompsDataAll() {
      return this.uniqueCompsAll.map(c => {
        return this.architectureData.filter(s => s.name === c)[0];
      });
    },
    uniqueCompsImportComps() {
      return this.uniqueCompsDataParent.map(c => {
        return c.components.length || 0;
      });
    },
    uniqueCompsData() {
      return this.uniqueCompsDataAll.map(c => {
        return c.data === null ? 0 : c.data.length;
        // return c.components.length || 0;
      });
    },
    uniqueCompsImportEs6() {
      return this.uniqueCompsDataAll.map(c => {
        return c.imports === null ? 0 : c.imports.length;
        // return c.components.length || 0;
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
