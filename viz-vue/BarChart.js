/* eslint-disable no-unused-vars,no-undef */
export default {
  template: `
  <div class="chart-container">
    <canvas ref="myChart"></canvas>
  </div>
  `,
  props: ["uniqueComps", "values", "label"],
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
              label: this.label,
              data: this.values,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: this.label
          },
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
    }
  }
};
