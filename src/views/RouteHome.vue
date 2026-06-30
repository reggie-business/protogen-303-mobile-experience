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
    <v-app-bar color="appbar" density="compact" flat elevation="1">
      <v-app-bar-title class="brand-wrap">
        <img src="/megablade-mark.svg" alt="mega-blade.io logomark" class="brand-mark" />
        <span class="view-title text-h5 font-weight-bold brand-wordmark">mega-blade.io</span>
      </v-app-bar-title>
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
          :base-color="'surface'"
          @click="openCheckIn(turbine.id)"
        >
          <v-list-item-title class="turbine-id">
            {{ turbine.id }}
          </v-list-item-title>
          <v-list-item-subtitle class="turbine-name">{{ turbine.name }}</v-list-item-subtitle>

          <template #append>
            <v-chip
              v-if="turbine.checked"
              color="secondary"
              size="small"
              variant="outlined"
              class="font-weight-bold me-2 done-pill"
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
  color: rgb(var(--v-theme-ink));
  min-width: 130px;
  text-align: right;
  border: 1px solid rgba(20, 52, 43, 0.18);
  border-radius: 999px;
  background: rgba(244, 248, 243, 0.88);
  font-weight: 700;
  padding: 4px 10px;
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-mark {
  width: 26px;
  height: 26px;
  flex: 0 0 auto;
}

.brand-wordmark {
  color: rgb(var(--v-theme-on-appbar));
}

.route-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.completion-banner {
  border: 1px solid rgba(83, 165, 72, 0.28);
}

.completion-title {
  font-size: 18px;
  font-weight: 700;
  color: #53a548;
  line-height: 1.25;
}

.completion-subtitle {
  margin-top: 2px;
  font-size: 15px;
  font-weight: 600;
  color: #2c5245;
}

.turbine-row {
  min-height: 56px;
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(20, 52, 43, 0.08);
  transition: background-color 120ms ease, border-color 120ms ease;
}

.turbine-row:hover,
.turbine-row:focus-visible {
  background: #f3f8f0;
}

.turbine-row:active {
  background: #ecf4e8;
  border-color: rgba(76, 147, 76, 0.3);
}

.turbine-id {
  color: #14342b;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.2;
}

.turbine-name {
  color: #4f5f5a;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
  opacity: 1;
}

.done-pill {
  background: rgba(83, 165, 72, 0.08);
}
</style>
