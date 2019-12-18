/* eslint-disable no-unused-vars,no-undef */
export default {
  template: `
  <div class="chart-container">
    <canvas ref="myChart"></canvas>
  </div>
  `,
  props: ["uniqueComps", "styleCount", "templateCount", "scriptCount"],
  data() {
    return {
      message: "Sample"
    };
  },
  mounted() {
    this.CreateComponentImportBar();
  },
  methods: {
    CreateComponentImportBar() {
      const ctx = this.$refs.myChart.getContext("2d");
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.uniqueComps,
          datasets: [
            {
              label: "Style",
              data: this.styleCount,
              backgroundColor: "#D6E9C6" // green
            },
            {
              label: "Template",
              data: this.templateCount,
              backgroundColor: "#FAEBCC" // yellow
            },
            {
              label: "Script",
              data: this.scriptCount,
              backgroundColor: "#EBCCD1" // red
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: "Component Composition"
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{ stacked: true }],
            yAxes: [
              {
                stacked: true,
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    }
  }
};
