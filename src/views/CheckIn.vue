<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { checkIn, turbines, type TurbineStatus } from '../store/round'

const route = useRoute()
const router = useRouter()

type StatusOption = {
  value: TurbineStatus
  label: string
  icon: string
}

const selectedStatus = ref<TurbineStatus | null>(null)
const note = ref('')
const photoFile = ref<File | null>(null)

const statusOptions: StatusOption[] = [
  { value: 'ok', label: 'OK', icon: 'mdi-check-circle-outline' },
  { value: 'watch', label: 'Watch', icon: 'mdi-alert-outline' },
  { value: 'down', label: 'Down', icon: 'mdi-close-octagon-outline' },
]

const statusLabel: Record<TurbineStatus, string> = {
  ok: 'OK',
  watch: 'Watch',
  down: 'Down',
}

const turbineId = computed(() => String(route.params.id ?? 'Unknown'))
const turbine = computed(() => turbines.find((item) => item.id === turbineId.value))
const showDetails = computed(
  () => selectedStatus.value === 'watch' || selectedStatus.value === 'down',
)

function onPhotoChange(value: File | File[] | null): void {
  photoFile.value = Array.isArray(value) ? (value[0] ?? null) : value
}

function submitCheckIn(): void {
  if (!selectedStatus.value || !turbine.value) {
    return
  }

  checkIn(
    turbine.value.id,
    selectedStatus.value,
    note.value.trim() || undefined,
    photoFile.value?.name,
  )

  router.push('/')
}
</script>

<template>
  <section>
    <v-app-bar color="surface" flat elevation="2">
      <v-btn icon="mdi-arrow-left" variant="text" @click="router.push('/')" />
      <v-app-bar-title class="title-wrap">
        <div class="view-title text-h5 font-weight-bold">{{ turbineId }}</div>
        <div class="text-body-2 title-subtitle">
          {{ turbine?.name ?? 'Unknown turbine' }}
          <span v-if="turbine" class="mx-1">•</span>
          <span v-if="turbine">Last: {{ statusLabel[turbine.lastStatus] }}</span>
        </div>
      </v-app-bar-title>
    </v-app-bar>

    <div class="pa-4 checkin-content">
      <p class="text-body-1 mb-3 section-label">Set current status</p>

      <div class="status-stack">
        <v-card
          v-for="option in statusOptions"
          :key="option.value"
          class="status-card"
          :class="{ 'status-card-selected': selectedStatus === option.value }"
          :color="selectedStatus === option.value ? option.value : 'surface'"
          :variant="selectedStatus === option.value ? 'flat' : 'outlined'"
          role="button"
          tabindex="0"
          @click="selectedStatus = option.value"
        >
          <div class="status-inner">
            <v-icon
              :icon="option.icon"
              :color="selectedStatus === option.value ? 'white' : option.value"
              size="28"
            />
            <span class="status-label">{{ option.label }}</span>
          </div>
        </v-card>
      </div>

      <v-expand-transition>
        <div v-if="showDetails" class="details-wrap mt-4">
          <v-file-input
            :model-value="photoFile"
            accept="image/*"
            capture="environment"
            clearable
            label="Optional photo"
            prepend-icon="mdi-camera"
            variant="outlined"
            @update:model-value="onPhotoChange"
          />
          <v-textarea
            v-model="note"
            label="Optional note"
            placeholder="What did you see?"
            rows="2"
            auto-grow
            variant="outlined"
            class="mt-3"
          />
        </div>
      </v-expand-transition>
    </div>

    <div class="submit-dock">
      <v-btn
        block
        color="primary"
        size="x-large"
        class="submit-btn"
        :disabled="!selectedStatus"
        @click="submitCheckIn"
      >
        Submit check-in
      </v-btn>
    </div>
  </section>
</template>

<style scoped>
.title-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title-subtitle {
  color: #5a6066;
  line-height: 1.25;
}

.checkin-content {
  padding-bottom: 116px;
}

.section-label {
  color: #30363c;
  font-weight: 600;
}

.status-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.status-card {
  min-height: 72px;
  border-width: 2px;
  border-color: rgba(22, 25, 28, 0.22);
  cursor: pointer;
}

.status-card-selected {
  border-color: transparent;
}

.status-inner {
  min-height: 72px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 18px;
}

.status-label {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: #16191c;
}

.status-card-selected .status-label {
  color: #ffffff;
}

.details-wrap {
  display: flex;
  flex-direction: column;
}

.submit-dock {
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: min(100%, 430px);
  padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
  background: linear-gradient(to top, #f7f8f8 70%, rgba(247, 248, 248, 0.65) 100%);
  border-top: 1px solid rgba(22, 25, 28, 0.12);
}

.submit-btn {
  min-height: 56px;
  font-size: 18px;
  font-weight: 700;
}
</style>
