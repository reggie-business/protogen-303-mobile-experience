import { computed, reactive } from 'vue'
import turbineData from '../data/turbines.json'

export type TurbineStatus = 'ok' | 'watch' | 'down'

export type Turbine = {
  id: string
  name: string
  lastStatus: TurbineStatus
  lastChecked: string
  checked: boolean
  note?: string
  photo?: string
}

const preCheckedIds = ['T-01', 'T-03', 'T-07', 'T-11']

export const turbines = reactive<Turbine[]>(
  (turbineData as Array<Omit<Turbine, 'checked'>>).map((turbine) => ({
    ...turbine,
    checked: preCheckedIds.includes(turbine.id),
  })),
)

export const progress = computed(() => {
  const checked = turbines.filter((turbine) => turbine.checked).length
  return {
    checked,
    total: turbines.length,
  }
})

export function checkIn(id: string, status: TurbineStatus, note?: string, photo?: string): void {
  const turbine = turbines.find((item) => item.id === id)

  if (!turbine) {
    return
  }

  turbine.lastStatus = status
  turbine.lastChecked = new Date().toISOString()
  turbine.checked = true
  turbine.note = note
  turbine.photo = photo
}
