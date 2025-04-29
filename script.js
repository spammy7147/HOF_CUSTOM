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

function pattern(className, patternno){
	const form = document.createElement('form');
	form.method = 'POST'
	form.target = '_blank'
	form.action = "http://sic.zerosic.com/ZeroHOF/index.php?char=" + 캐릭[className]
	
	const input1 = document.createElement('input');
	input1.type = 'hidden'
	input1.name = 'patternno'
	input1.value = patternno
	form.appendChild(input1);

	const input2 = document.createElement('input');
	input2.type = 'hidden';
	input2.name = 'loadpattern'
	input2.value = 'LOAD'
	form.appendChild(input2);
	
	document.body.appendChild(form);
	form.submit();
	document.body.removeChild(form);
}


function party_pattern(...args) {
  args.forEach(([className, patternName], index) => {
    setTimeout(() => { pattern(className, patternName)}, index * 1000)
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
	Array.from(document.querySelectorAll('button.week'))
	.forEach(button => {
		if (button.classList.contains(today)) {
		  button.style.display = 'block'; // 또는 'block' 원하면 조정
		} else {
		  button.style.display = 'none';
		}
	})
  }

  const timerMap = {};

  function startTimer(timerId, seconds) {
    if (timerMap[timerId]) {
      clearInterval(timerMap[timerId]);
    }

    let remaining = seconds;
    document.getElementById(timerId).textContent = `${remaining}초`;

    const intervalId = setInterval(() => {
      remaining--;
      if (remaining <= 0) {
        clearInterval(intervalId);
        document.getElementById(timerId).textContent = "가능";
        delete timerMap[timerId];
      } else {
        document.getElementById(timerId).textContent = `${remaining}초`;
      }
    }, 1000);

    timerMap[timerId] = intervalId;
  }

  // 모든 버튼에 이벤트 리스너 등록
  document.querySelectorAll('button[timer]').forEach(button => {
    button.addEventListener('click', (event) => {
      const timerId = button.getAttribute('timer');
      const seconds = parseInt(button.getAttribute('sec'));
      startTimer(timerId, seconds);
    });
  });

hideWeek()
replaceFragment('character-list')