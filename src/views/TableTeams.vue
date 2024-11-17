<template>
  <div class="table-container">
    <h2>Первенство южных районов<br />Нижегородской Области</h2>
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Команда</th>
          <th>И</th>
          <th>В</th>
          <th>Н</th>
          <th>П</th>
          <th>Мячи</th>
          <th>О</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(team, index) in teams"
          :key="team.id"
          :draggable="true"
          @dragstart="onDragStart(index)"
          @dragover.prevent
          @drop="onDrop(index)"
          class="table-row"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ team.name }}</td>
          <td>{{ team.games }}</td>
          <td>{{ team.wins }}</td>
          <td>{{ team.draws }}</td>
          <td>{{ team.losses }}</td>
          <td>{{ team.goals }}</td>
          <td>{{ team.points }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'TableComponent',
  setup() {
    const teams = ref([
      {
        id: 1,
        name: 'VOZWOODEN Вознесенское',
        games: 19,
        wins: 16,
        draws: 2,
        losses: 1,
        goals: '71-11',
        points: 50,
      },
      {
        id: 2,
        name: 'АТЛАНТ-ШАТКИ Шатки',
        games: 19,
        wins: 15,
        draws: 2,
        losses: 2,
        goals: '90-17',
        points: 47,
      },
      {
        id: 3,
        name: 'ОКА Навашино',
        games: 19,
        wins: 12,
        draws: 2,
        losses: 5,
        goals: '58-28',
        points: 38,
      },
      // Добавьте остальные команды здесь
    ]);

    const draggedItemIndex = ref(null);

    const onDragStart = (index) => {
      draggedItemIndex.value = index;
    };

    const onDrop = (index) => {
      if (draggedItemIndex.value === null) return;

      const draggedItem = teams.value[draggedItemIndex.value];
      teams.value.splice(draggedItemIndex.value, 1); // Удаляем перетаскиваемый элемент
      teams.value.splice(index, 0, draggedItem); // Вставляем его на новое место

      draggedItemIndex.value = null;
    };

    return {
      teams,
      onDragStart,
      onDrop,
    };
  },
};
</script>

<style scoped>
.table-container {
  width: 100%;
  max-width: 600px;
  margin: auto;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #333;
  color: #fff;
}

th,
td {
  padding: 8px;
  border: 1px solid #ddd;
}

.table-row {
  cursor: move;
}

.table-row:nth-child(even) {
  background-color: #f9f9f9;
}

.table-row:nth-child(odd) {
  background-color: #fff;
}
</style>
