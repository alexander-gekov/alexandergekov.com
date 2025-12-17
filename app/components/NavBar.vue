<template>
  <div
    class="w-full flex flex-col bg-transparent absolute top-0 left-0 right-0 z-50">
    <div class="flex h-16 items-center">
      <div class="ml-auto flex items-center space-x-4">
        <ColorModeSwitch />
      </div>
    </div>

    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
