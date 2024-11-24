Результат
<template>
  <div class="scoreboard">
    <h1 class="status">ПРОИГРЫШ</h1>
    <div class="match-info">
      <div class="team">
        <img :src="teamA.logo" alt="Team A Logo" class="team-logo" />
        <p class="team-name">{{ teamA.name }}</p>
      </div>
      <div class="score">
        <p class="score-number">{{ teamA.score }}:{{ teamB.score }}</p>
        <p class="match-end">Матч завершен</p>
      </div>
      <div class="team">
        <img :src="teamB.logo" alt="Team B Logo" class="team-logo" />
        <p class="team-name">{{ teamB.name }}</p>
      </div>
    </div>
    <div class="events">
      <table>
        <thead>
          <tr>
            <th>Время</th>
            <th>Команда</th>
            <th>Событие</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(event, index) in events" :key="index">
            <td>{{ event.time }}</td>
            <td>{{ event.team }}</td>
            <td>{{ event.action }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teamA: {
        name: 'Ока Навашино',
        logo: 'oka-logo.png',
        score: 1,
      },
      teamB: {
        name: 'Vozwooden Вознесенское',
        logo: 'vozwooden-logo.png',
        score: 0,
      },
      events: [{ time: "42'", team: 'Ока Навашино', action: 'Гол' }],
    };
  },
};
</script>

<style scoped>
.scoreboard {
  text-align: center;
  font-family: Arial, sans-serif;
  margin: 20px auto;
}

.status {
  font-size: 2em;
  color: #d32f2f;
  margin-bottom: 20px;
}

.match-info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
}

.team {
  text-align: center;
}

.team-logo {
  width: 100px;
  height: auto;
}

.team-name {
  font-size: 1.2em;
  margin-top: 10px;
}

.score {
  text-align: center;
}

.score-number {
  font-size: 3em;
  margin: 0;
}

.match-end {
  color: #ff9800;
  font-size: 1.2em;
}

.events table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.events th,
.events td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.events th {
  background-color: #f4f4f4;
}
</style>
