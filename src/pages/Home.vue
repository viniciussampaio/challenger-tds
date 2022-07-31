<template>
  <div class="container">
    <h4>WEATHER</h4>
    <div class="logo">
      <q-icon name="cloud" size="70px" class="q-icon-cloud" />
    </div>
    <span>select a city</span>
    <span class="textExamples">
      Examples: Recife, Vancouver, London, Dallol, Fairbanks, Yakutsk
    </span>
    <q-card class="my-card">
      <q-card-section>
        <q-input type="text" v-model="cityName" label="Write name city" />
        <div class="testeSeparando">
          <q-btn label="Search" color="accent" @click="getLocationName" />
          <q-btn label="Clear" color="accent" @click="clearFields" />
        </div>
      </q-card-section>
    </q-card>
  </div>
  <div v-if="showAllData" class="containerData">
    <img :src="icon" size="500" />
    <p>País: {{ data.location.country }}</p>
    <p>Cidade: {{ data.location.name }}</p>
    <p>Estado: {{ data.location.region }}</p>
    <p>Temperatura: {{ data.current.temp_c }}°C</p>
    <p>Umidade: {{ data.current.humidity }}%</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import api from "../services/api";

export default defineComponent({
  name: "Home",
  setup() {
    const showAllData = ref(false);
    const weather = ref([]);
    const cityName = ref("");
    const region = ref("");
    const data = ref([]);
    const icon = ref("");

    async function getLocationName() {
      await api.get(`${cityName.value}`).then((response) => {
        weather.value = response.data;
        region.value = response.data.location.region;
        cityName.value = response.data.location.name;
        data.value = response.data;
        icon.value = response.data.current.condition.icon;
      });
      if (data != null) {
        showAllData.value = true;
      }
    }
    async function clearFields() {
      showAllData.value = false;
      cityName.value = "";
    }
    return {
      weather,
      cityName,
      region,
      showAllData,
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

.container,
.forms {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.5);
  color: #fff;
}

.textExamples {
  font-size: 13px;
}

.logo {
  text-align: center;
}
.testeSeparando {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.containerData {
  background-color: rgb(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 57vh;
}
</style>
