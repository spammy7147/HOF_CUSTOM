function get_quest(arr, menu = '퀘스트') {
	
	let cnt = 0;
	for(key in arr) {
		let no = arr[key];
		setTimeout(() => {quest(no, 'get', menu)}, cnt++ * 1000)
	}
}

function complete_quest(arr, menu = '퀘스트') {
	let cnt = 0;
	for(key in arr) {
		let no = arr[key];
		setTimeout(() => {quest(no, 'complete',menu)}, cnt++ * 1000)
	}
}
function quest(no, status, menu) {
	let link;
	if(menu === '작업장') {
		if(status === 'get') { 
			link = 'http://sic.zerosic.com/ZeroHOF/index.php?menu=quest2&action=get&no=' + no;
		} else {
			link = 'http://sic.zerosic.com/ZeroHOF/index.php?menu=quest2&action=complete&no=' + no;
		}
		window.open(link, 'quest');
		return;
	}

	if(status === 'get') { 
		link = 'http://sic.zerosic.com/ZeroHOF/index.php?menu=quest&action=get&no=' + no;
	} else {
		link = 'http://sic.zerosic.com/ZeroHOF/index.php?menu=quest&action=complete&no=' + no;
	}
	window.open(link, 'quest');
}

function clickSelectedBattles(arr, sec=1) {
	const buttons = Array.from(document.querySelectorAll('button.battle'))
	  .filter(btn => arr.includes(btn.textContent.trim()));
  
	for(key in buttons) {
			  let btn = buttons[key];
		 setTimeout(() => {btn.click()}, key * sec * 1000)		
		  }
  }

function reset_pattern() {
	let cnt = 0;
	for(key in 캐릭) {
		let char = key
		setTimeout(() => {pattern(char, 0)}, cnt++ * 1000)
	}
}

function pattern(formId, patternno){
	const form = document.getElementById(formId);
	form.querySelector('input[name="patternno"]').value = patternno;
	form.submit();
}


function party_pattern(...args) {
  args.forEach(([className, patternName], index) => {
    setTimeout(() => {
      pattern(className, patternName);
    }, index * 1000);
  });
}

function battle(status, action, char, isMulti) { 
	if(status === '모험') {
		action = 'http://sic.zerosic.com/ZeroHOF/index.php?sp_common=' + action
	}else {
		action = 'http://sic.zerosic.com/ZeroHOF/index.php?common=' + action
	}
	
	const form = document.createElement('form');
	form.method = 'POST'
	form.target = '_blank'
	form.action = action
	for(c of char) {
		const input = document.createElement('input');
		input.type = 'hidden';
		input.name = 'char_' + 캐릭[c];
		input.value = '1'
		form.appendChild(input);
	}
	const input = document.createElement('input');
	input.type = 'hidden';
	input.name = isMulti ? 'monster_battle_10' : 'monster_battle';
	input.value = 'Battle !'
	form.appendChild(input);
	document.body.appendChild(form);
	form.submit();
	document.body.removeChild(form);
}

function 범용모험() {
	let idx = 0;
	for(key in 모험) {
		let action = 모험[key] 
		setTimeout(() => {battle('모험', action,['소셜','사제','바드','에인','도둑'], false)}, idx++ * 1500)
	}

}

async function replaceFragment(htmlName) {
    const res = await fetch('character-list.html');
    const html = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const fragmentElement = doc.body.firstElementChild;

    const target = document.getElementById(htmlName);
    target.replaceWith(fragmentElement);
  }

function hideWeek() {
	const dayMap = {
		0: 'weekend', 
		6: 'weekend',   
		1: 'monday',
		2: 'tuesday',     
		3: 'wednesday',
		4: 'thursday',
		5: 'friday',
	  };
	const today = dayMap[new Date().getDay()];
	console.log(document.querySelectorAll('button.week'))
	Array.from(document.querySelectorAll('button.battle.week'))
	.forEach(button => {
		debugger;
		console.log(button.classList)
		if (button.classList.contains(today)) {
		  button.style.display = 'block'; // 또는 'block' 원하면 조정
		} else {
		  button.style.display = 'none';
		}
	})
  }

  hideWeek()
replaceFragment('character-list');