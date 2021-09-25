<script context="module">
	import { openModal, closeModal } from './modal/Modal.svelte';

	export { openModal, closeModal };
</script>

<script>
	import Modal from './modal/Modal.svelte';
	import ModalHeader from './modal/ModalHeader.svelte';
	import ModalFooter from './modal/ModalFooter.svelte';

	export let isClosable = true;
	export let isOpen = false;
</script>

<Modal on:modalClosed {isOpen}>
	<ModalHeader {isClosable} on:modalClose>
		<slot name="title" />
	</ModalHeader>
	<div class="sm:p-6">
		<slot />
	</div>
	<ModalFooter>
		<slot name="footer" />
	</ModalFooter>
</Modal>
