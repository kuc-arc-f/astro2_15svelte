<script lang="ts">
	let count: number = 0;
	let message: string = "hoge";

	function add() {
		count += 1;
	}

	function subtract() {
		count -= 1;
	}
	function test1() {
		message = message + ":123";
	}
</script>

<div class="counter">
	<h3>counter</h3><br />
	<hr />
	message: {message}
	<hr />
	<button on:click={test1}>[ test1 ]</button>
	<hr />
	<button on:click={subtract}>-</button>
	<pre>{count}</pre>
	<button on:click={add}>+</button>
</div>

<style>
</style>