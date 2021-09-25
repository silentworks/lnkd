<script>
	export let size = 'full';
	let isFull = size === 'full';
	let isMedium = size === 'medium';
	let isSmall = size === 'small';
</script>

<div class="top-0 left-0 z-10 block w-full h-full bg-transparent opacity-75" class:fixed={isFull} class:absolute={!isFull}>
  <span class="relative block w-full h-full mx-auto my-0 text-center text-green-500 opacity-75 top-1/3">
    <i class="fas fa-circle-notch fa-spin" class:fa-5x={isFull} class:fa-3x={isMedium} class:fa-2x={isSmall} />
  </span>
</div>
