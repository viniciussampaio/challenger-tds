<template>
  <div class="container" @keyup.enter="getLocationName">
    <header>
      <h4>WEATHER</h4>
    </header>
    <div class="logo">
      <q-icon name="cloud" size="70px" class="q-icon-cloud" />
    </div>
    <span>Select a city</span>
    <span class="textExamples">
      Examples: Recife, Vancouver, London, Dallol, Fairbanks, Yakutsk
    </span>
    <q-card class="my-card">
      <q-card-section>
        <q-input type="text" v-model="cityName" label="Write name city" />
        <div class="btn-buttons">
          <q-btn
            outline
            label="Search"
            color="accent"
            @click="getLocationName"
          />
          <q-btn outline label="Clear" color="accent" @click="clearFields" />
        </div>
      </q-card-section>
    </q-card>
  </div>
  <div v-if="showIconWeather" class="iconWeather">
    <img :src="icon" size="500" />
  </div>
  <div v-if="showAllData" class="containerData">
    <div>
      <p>Country: {{ data.location.country }}</p>
      <p>State: {{ data.location.region }}</p>
      <p>City: {{ data.location.name }}</p>
    </div>
    <div>
      <p>
        Temperature: {{ data.current.temp_c }}°C / {{ data.current.temp_f }}°F
      </p>
      <p>Air Humidity: {{ data.current.humidity }}%</p>
      <p>Date/Time: {{ data.location.localtime }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import api from "../services/api";

export default defineComponent({
  name: "Home",
  setup() {
    const showAllData = ref(false);
    const showIconWeather = ref(false);
    const cityName = ref("");
    const data = ref([]);
    const icon = ref("");

    async function getLocationName() {
      await api.get(`${cityName.value}`).then((response) => {
        cityName.value = response.data.location.name;
        data.value = response.data;
        icon.value = response.data.current.condition.icon;
      });
      if (data != null) {
        showAllData.value = true;
        showIconWeather.value = true;
      }
    }
    async function clearFields() {
      showAllData.value = false;
      showIconWeather.value = false;
      cityName.value = "";
    }

    return {
      cityName,
      showAllData,
      showIconWeather,
      data,
      icon,
      getLocationName,
      clearFields,
    };
  },
});
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 300px;
  color: #fff;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.5);
  color: #fff;
  height: 60vh;
}

.iconWeather {
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100px;
  padding: 3px;
}

.textExamples {
  font-size: 15px;
  font-weight: bold;
  margin: 3px;
  padding: 2px;
}

span,
p {
  font-weight: bold;
  font-size: 20px;
}

.logo {
  text-align: center;
}
.btn-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 5px;
  margin: 5px;
}

.containerData {
  background-color: rgb(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
}

@media (min-height: 700px) {
  .containerData {
    height: 31vh;
    width: 100%;
    padding: 7px;
  }
}
</style>
