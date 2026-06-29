<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { TurbineStatus } from '../store/round'
import { progress, turbines } from '../store/round'

const router = useRouter()

const statusOrder: Record<TurbineStatus, number> = {
  down: 0,
  watch: 1,
  ok: 2,
}

const statusLabel: Record<TurbineStatus, string> = {
  ok: 'OK',
  watch: 'Watch',
  down: 'Down',
}

const isRoundComplete = computed(() => progress.value.checked === progress.value.total)
const completionTime = computed(() =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
)

const sortedTurbines = computed(() =>
  [...turbines].sort((a, b) => {
    const statusRank = statusOrder[a.lastStatus] - statusOrder[b.lastStatus]

    if (statusRank !== 0) {
      return statusRank
    }

    return a.id.localeCompare(b.id)
  }),
)

function openCheckIn(id: string): void {
  router.push({ name: 'check-in', params: { id } })
}
</script>

<template>
  <section>
    <v-app-bar color="surface" flat elevation="2">
      <v-app-bar-title class="view-title text-h4 font-weight-bold">Rounds</v-app-bar-title>
      <template #append>
        <div class="progress-readout text-subtitle-1">
          {{ progress.checked }} of {{ progress.total }} checked
        </div>
      </template>
    </v-app-bar>

    <div class="px-4 pb-6 pt-4">
      <v-alert
        v-if="isRoundComplete"
        type="success"
        variant="tonal"
        color="ok"
        class="mb-4 completion-banner"
        density="comfortable"
        icon="mdi-check-circle"
      >
        <div class="completion-title">Round complete</div>
        <div class="completion-subtitle">All {{ progress.total }} turbines checked · {{ completionTime }}</div>
      </v-alert>

      <v-list
        bg-color="transparent"
        class="route-list"
        density="comfortable"
        lines="one"
      >
        <v-list-item
          v-for="turbine in sortedTurbines"
          :key="turbine.id"
          class="turbine-row mb-3"
          rounded="lg"
          color="primary"
          :base-color="turbine.checked ? 'surface' : 'background'"
          @click="openCheckIn(turbine.id)"
        >
          <template #prepend>
            <v-icon :color="turbine.lastStatus" icon="mdi-circle" size="12" class="me-3" />
          </template>

          <v-list-item-title class="turbine-id">
            {{ turbine.id }}
          </v-list-item-title>
          <v-list-item-subtitle class="turbine-name">{{ turbine.name }}</v-list-item-subtitle>

          <template #append>
            <v-chip
              v-if="turbine.checked"
              color="primary"
              size="small"
              variant="outlined"
              class="font-weight-bold me-2"
            >
              Done
            </v-chip>
            <v-chip
              :color="turbine.lastStatus"
              size="small"
              variant="flat"
              class="font-weight-bold"
            >
              {{ statusLabel[turbine.lastStatus] }}
            </v-chip>
          </template>
        </v-list-item>
      </v-list>
    </div>
  </section>
</template>

<style scoped>
.progress-readout {
  color: rgb(var(--v-theme-on-surface));
  min-width: 130px;
  text-align: right;
}

.route-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.completion-banner {
  border: 1px solid rgba(27, 138, 90, 0.28);
}

.completion-title {
  font-size: 18px;
  font-weight: 700;
  color: #1b8a5a;
  line-height: 1.25;
}

.completion-subtitle {
  margin-top: 2px;
  font-size: 15px;
  font-weight: 600;
  color: #2f4f3f;
}

.turbine-row {
  min-height: 56px;
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(22, 25, 28, 0.08);
}

.turbine-id {
  color: #16191c;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.2;
}

.turbine-name {
  color: #5a6066;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
  opacity: 1;
}
</style>
