setInterval(() => {
  const timer = new Date();
  document.querySelector('.timer').textContent = timer.toLocaleString('en-GB');
}, 10);

const title = document.querySelector('.title');

const cursor = document.querySelector('.cursor');
const whiteMode = document.querySelector('.white-mode');
const darkMode = document.querySelector('.dark-mode');
let i = 0;
const text = title.textContent;
title.textContent = '';
const buttonAdd = document.querySelector('.btn-add');

const typingInterval = setInterval(() => {
  title.textContent += text[i];
  i++;

  // Stop interval after last character
  if (i === text.length) {
    clearInterval(typingInterval);

    // Start deleting after 2 seconds
    setTimeout(startDeleting, 2000);
  }
}, 100); // type one character every 100 milliseconds

function startDeleting() {
  const deletingInterval = setInterval(() => {
    title.textContent = title.textContent.slice(0, -1);

    // Stop interval when text is empty
    if (title.textContent === 'Todo List') {
      clearInterval(deletingInterval);

      // Show full text after 2 seconds
      setTimeout(() => {
        title.textContent = 'Todo List.';
      }, 500);
    }
  }, 100); // delete one character every 100 milliseconds
}



darkMode.addEventListener('click', () => {
  document.body.classList.add('dark-mode');
});

whiteMode.addEventListener('click', () => {
  document.body.classList.remove('dark-mode');
});




buttonAdd.addEventListener('click', () => {
  updateTasks();
});

const inputElement = document.querySelector('.input');
const inputValue = inputElement.value;

inputElement.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    updateTasks();
  }
});

const updateTasks = () => {
  const inputElement = document.querySelector('.input');
  const inputValue = inputElement.value;
  if (inputValue) {
    const ol = document.querySelector('ol');
    const newLi = document.createElement('li');
    const newTask = `<p>
            ${inputValue}</p><div class="btn-container">
            <button type="button" class="btn btn-confirm">
              <img src="./img/check.svg" />
            </button>
            <button type="button" class="btn btn-delete">
              <img src="./img/delete.svg" /></div>
            </button>
          `;
    newLi.innerHTML = newTask;
    ol.prepend(newLi);
    inputElement.value = '';

    const btnConfirm = newLi.querySelector('.btn-confirm');
    btnConfirm.addEventListener('click', () => {
      newLi.classList.toggle('strikethrough');
      btnConfirm.classList.toggle('strikethrough');
      newLi.querySelector('.btn-delete').classList.toggle('strikethrough');
    });

    const btnDelete = newLi.querySelector('.btn-delete');
    btnDelete.addEventListener('click', () => {
      ol.removeChild(newLi);
    });


  } else {
    return;
  }
};


