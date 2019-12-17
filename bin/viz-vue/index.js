const app = new Vue({
  el: "#app",
  data: {
    seen: true,
    parentChildData: [],
    architectureData: [],
  },
  computed: {
    uniqueComps() {
      return [...new Set(this.parentChildData.map(r => {
        return r.parent;
      }))];
    },
    uniqueCompsData() {
      return this.uniqueComps.map(c=>{
        return this.architectureData.filter(s => s.name === c)[0]
      })
    },
    uniqueCompsImportComps() {
      return this.uniqueCompsData.map(c=>{
        return c.components.length || 0;
      })
    }
  },
  mounted() {

    $.getJSON('ParentChildData.json', data => {
      this.parentChildData = data;
      $.getJSON('ComponentArchitecture.json', archData => {
        this.architectureData = archData;

        const ctx = document.getElementById("myChart").getContext("2d");
        const myChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: this.uniqueComps,
            datasets: [
              {
                label: "# of Child Components",
                data: this.uniqueCompsImportComps,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
      });
    });
  }
});
