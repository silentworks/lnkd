<script>
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { loading } from './store';

	let width, timer, visible;

	$: {
		if ($loading && width) {
			visible = true;

			timer = setInterval(() => {
				// inch along until 65% complete
				// ~> wait for loading=false signal
				let jump = (Math.random() * 20 + 4) | 0;
				width.update(val => Math.min(65, val + jump));
			}, 750);
		} else if (width && timer) {
			timer = clearInterval(timer);
			width.set(100);
		}
	}

	onMount(() => {
		width = tweened(0, {
			duration: 1e3,
			easing: cubicOut
		});

		return width.subscribe(num => {
			if (num !== 100) return;
			timer = clearInterval(timer);
			loading.set(false);

			// use timers for fade out
			// delays should be >= 1.5x transition
			setTimeout(() => {
				setTimeout(() => {
					visible = false;
					width.set(0);
				}, 500);
			}, 300);
		});
	});
</script>

<div class="fixed top-0 bottom-0 left-0 right-0 z-20 h-screen bg-gray-700" class:visible class:invisible={!visible}>
	<span class="block w-0 h-1 bg-red-500" style="width: {$width}%" />
	<div class="flex items-center justify-center h-40">
		<div class="text-white">
			Loading...
		</div>
	</div>
</div>
