export function creationTextareaSize (){
  const textareaSize = document.getElementsByTagName('textarea');
  for (let i = 0; i < textareaSize.length; i++) {
    textareaSize[i].setAttribute('style', 'height: 80px;');
    textareaSize[i].addEventListener('input', OnInput, false);
  }
}

export function readingTextareaSize (){
  const textareaSize = document.getElementsByTagName('textarea');
  for (let i = 0; i < textareaSize.length; i++) {
    textareaSize[i].setAttribute('style', 'height:' + textareaSize[i].scrollHeight + 'px;');
    textareaSize[i].addEventListener('input', OnInput, false);
  }
}

function OnInput() {
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';
}