const inputHolder = document.querySelector(".input-holder");

const minusBtn = document.querySelector("#minus-btn");
const plusBtn = document.querySelector("#plus-btn");

const input = document.querySelector("#qty_input");

inputHolder.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn");
  const count = input.value;
  if (!btn) return;
  if (btn.id == "minus-btn") {
    if (count > 1) {
      console.log(`mins: ${count}`);
      input.value = count - 1;
    }
  } else if (btn.id == "plus-btn" && count < 5) {
    input.value = Number(count) + 1;
  }
});
