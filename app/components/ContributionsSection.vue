<template>
  <section v-if="cells.length">
    <div class="flex items-baseline justify-between gap-4">
      <div class="text-xs tracking-[0.25em] text-muted-foreground uppercase">
        Contributions
      </div>
      <NuxtLink
        to="https://github.com/alexander-gekov"
        external
        target="_blank"
        rel="noopener noreferrer"
        class="group inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
        <LucideGithub class="size-3.5" />
        alexander-gekov
        <LucideArrowUpRight class="size-3 transition-transform duration-200 ease-out motion-safe:group-hover:-translate-y-px motion-safe:group-hover:translate-x-px" />
      </NuxtLink>
    </div>

    <Tray class="mt-6">
      <div ref="panel" class="relative p-4 sm:p-5">
        <p class="text-[15px] font-medium tracking-tight">
          {{ contributions!.total.toLocaleString('en-US') }} contributions in the last year
        </p>

        <!-- rtl scroll container starts scrolled to the newest week on narrow screens -->
        <div dir="rtl" class="-mx-4 mt-4 overflow-x-auto overscroll-x-contain px-4 sm:-mx-5 sm:px-5">
          <svg
            :viewBox="`0 0 ${width} ${height}`"
            class="block h-auto w-full min-w-[600px]"
            style="direction: ltr"
            role="img"
            :aria-label="`${contributions!.total} GitHub contributions in the last year`"
            @mouseover="onHover"
            @mouseleave="tooltip = null">
            <g class="fill-muted-foreground" font-size="11">
              <text v-for="m in months" :key="m.col" :x="m.col * PITCH" y="11">{{ m.label }}</text>
            </g>
            <rect
              v-for="c in cells"
              :key="c.date"
              :x="c.col * PITCH"
              :y="TOP + c.row * PITCH"
              :width="CELL"
              :height="CELL"
              rx="2.5"
              :fill="`var(--gh-${c.level})`"
              :data-label="c.label"
              class="stroke-foreground/0 transition-[stroke] duration-150 hover:stroke-foreground/50" />
          </svg>
        </div>

        <div
          v-if="tooltip"
          class="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background shadow-md"
          :style="{ left: `${tooltip.x}px`, top: `${tooltip.y - 6}px` }">
          {{ tooltip.label }}
        </div>

        <div class="mt-3 flex items-center justify-end gap-1 text-xs text-muted-foreground">
          Less
          <span v-for="level in 5" :key="level" class="size-2.5 rounded-[2px]" :style="{ backgroundColor: `var(--gh-${level - 1})` }" />
          More
        </div>
      </div>
    </Tray>
  </section>
</template>

<script setup lang="ts">
import { LucideArrowUpRight, LucideGithub } from 'lucide-vue-next'

type ContributionDay = { date: string, count: number, level: number }

const props = defineProps<{
  contributions?: { total: number, days: ContributionDay[] } | null
}>()

const CELL = 10
const PITCH = 12
const TOP = 18

const toDate = (iso: string) => new Date(`${iso}T00:00:00Z`)
const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) => toDate(iso).toLocaleDateString('en-US', { timeZone: 'UTC', ...opts })

const cells = computed(() => {
  const days = props.contributions?.days ?? []
  if (!days.length) return []
  const offset = toDate(days[0]!.date).getUTCDay()
  return days.map((day, i) => ({
    ...day,
    col: Math.floor((i + offset) / 7),
    row: (i + offset) % 7,
    label: `${day.count || 'No'} contribution${day.count === 1 ? '' : 's'} on ${fmt(day.date, { month: 'short', day: 'numeric' })}`,
  }))
})

const width = computed(() => ((cells.value.at(-1)?.col ?? 0) + 1) * PITCH - (PITCH - CELL))
const height = TOP + 7 * PITCH - (PITCH - CELL)

const months = computed(() => {
  const labels: { col: number, label: string }[] = []
  for (const c of cells.value) {
    if (!c.date.endsWith('-01')) continue
    if (labels.length && c.col - labels.at(-1)!.col < 3) continue
    labels.push({ col: c.row === 0 ? c.col : c.col + 1, label: fmt(c.date, { month: 'short' }) })
  }
  return labels
})

const panel = ref<HTMLElement | null>(null)
const tooltip = ref<{ x: number, y: number, label: string } | null>(null)

function onHover(e: MouseEvent) {
  const target = e.target as SVGElement
  const label = target.dataset.label
  if (!label || !panel.value) return
  const cell = target.getBoundingClientRect()
  const box = panel.value.getBoundingClientRect()
  // Tray clips overflow, so keep the (~160px wide) tooltip inside the panel.
  const x = Math.min(Math.max(cell.left + cell.width / 2 - box.left, 80), box.width - 80)
  tooltip.value = { x, y: cell.top - box.top, label }
}
</script>
