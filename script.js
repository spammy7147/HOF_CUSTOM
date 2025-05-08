function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }

async function get_quest(arr, menu = '퀘스트') {
	for(key in arr) {
		quest(arr[key], 'get', menu)
		await sleep(500)
	}
}

async function complete_quest(arr, menu = '퀘스트') {
	let cnt = 0;
	for(key in arr) {
		quest(arr[key], 'complete',menu)
		await sleep(500)
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

async function clickSelectedBattles(arr, sec=1) {
	const buttons = Array.from(document.querySelectorAll('button.battle'))
	  .filter(btn => arr.includes(btn.textContent.trim()));
  
	for(key in buttons) {
			let btn = buttons[key];
			btn.click()
			await sleep(sec * 1000)
		  }
  }

async function reset_pattern() {
	for(key in 캐릭) {
		pattern(key, 0)
		await sleep(1000)
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


async function party_pattern(...args) {
	for (const [className, patternName] of args) {
		pattern(className, patternName)
		await sleep(1000)
	}
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


async function fishing() { 
	const action = 'http://sic.zerosic.com/ZeroHOF/index.php?menu=fishing'
	const form1 = document.createElement('form');
	form1.method = 'POST'
	form1.target = '_blank'
	form1.action = action
	const input = document.createElement('input');
	input.type = 'hidden'
	input.name = 'FStart'
	input.value = '낚시를 시작한다'
	form1.appendChild(input);
	document.body.appendChild(form1);
	
	const form2 = document.createElement('form');
	form2.method = 'POST'
	form2.target = '_blank'
	form2.action = action
	const input2 = document.createElement('input');
	input2.type = 'hidden';
	input2.name = 'FishingA'
	input2.value = '낚는다'
	form2.appendChild(input2);
	document.body.appendChild(form2);

	for(let i=0;i<16;i++) {
		form1.submit()
		await sleep(1000)
		form2.submit()
		await sleep(1000)
	}

	document.body.removeChild(form1);
	document.body.removeChild(form2);
}

async function 범용모험() {
	for(key in 모험) {
		battle('모험', 모험[key],['소셜','사제','바드','에인','도둑'], false)
		await sleep(1000)
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