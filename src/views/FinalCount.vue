<template>
  <div class="match-result-card">
    <div class="background">
      <!-- Background Image -->
    </div>
    <div class="overlay">
      <h1 class="result-text">ПРОИГРЫШ</h1>
      <div class="teams">
        <div class="team-info">
          <img
            :src="homeTeamLogo"
            alt="Логотип домашней команды"
            class="team-logo"
          />
          <p class="team-name">{{ homeTeamName }}</p>
          <p class="team-location">{{ homeTeamLocation }}</p>
        </div>
        <div class="score">
          <h2>{{ homeScore }} : {{ awayScore }}</h2>
          <p>Матч завершен</p>
          <p class="time">42'</p>
        </div>
        <div class="team-info">
          <img
            :src="awayTeamLogo"
            alt="Логотип гостевой команды"
            class="team-logo"
          />
          <p class="team-name">{{ awayTeamName }}</p>
          <p class="team-location">{{ awayTeamLocation }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MatchResultCard',
  props: {
    homeTeamLogo: String,
    homeTeamName: String,
    homeTeamLocation: String,
    homeScore: Number,
    awayTeamLogo: String,
    awayTeamName: String,
    awayTeamLocation: String,
    awayScore: Number,
  },
};
</script>

<style scoped>
.match-result-card {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  color: white;
  font-family: Arial, sans-serif;
}

.background {
  background-image: url('/path/to/your/background-image.jpg');
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  filter: brightness(0.7);
}

.overlay {
  position: relative;
  padding: 20px;
  text-align: center;
}

.result-text {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 20px;
}

.teams {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.team-info {
  text-align: center;
}

.team-logo {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}

.team-name {
  font-size: 1.2em;
}

.team-location {
  font-size: 0.9em;
  color: #ccc;
}

.score {
  font-size: 2em;
  font-weight: bold;
}

.time {
  font-size: 0.9em;
  color: #ccc;
}
</style>
