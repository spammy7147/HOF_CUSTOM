function do_quest() {
	let cnt = 0;
	for(key in 퀘스트) {
		let no = 퀘스트[key];
		setTimeout(() => {quest(no, 'get')}, cnt++ * 1000)
	}

	for(key in 퀘스트) {
		let no = 퀘스트[key];
		setTimeout(() => {quest(no, 'complete')}, cnt++ * 1000)
	}
}

function quest(no, status) {
	let link;
	if(status === 'get') { 
		link = 'http://sic.zerosic.com/ZeroHOF/index.php?menu=quest&action=get&no=' + no;
	} else {
		link = 'http://sic.zerosic.com/ZeroHOF/index.php?menu=quest&action=complete&no=' + no;
	}
	window.open(link, 'quest');
}

function pattern(formId, patternno){
	const form = document.getElementById(formId);
	form.querySelector('input[name="patternno"]').value = patternno;
	form.submit();
}

function party_pattern(class1, pattern1, class2, pattern2, class3, pattern3, class4, pattern4, class5, pattern5) {
	setTimeout(() => {pattern(class1, pattern1)}, 0)
	setTimeout(() => {pattern(class2, pattern2)}, 1000)
	setTimeout(() => {pattern(class3, pattern3)}, 2000)
	setTimeout(() => {pattern(class4, pattern4)}, 3000)
	setTimeout(() => {pattern(class5, pattern5)}, 4000)
}

function battle(status, action, char) { 
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
	input.name = status === '모험' ? 'monster_battle' : 'monster_battle_10';
	input.value = 'Battle !'
	form.appendChild(input);
	document.body.appendChild(form);
	form.submit();
}

function 범용모험() {
	let idx = 0;
	for(key in 모험) {
		let action = 모험[key] 
		setTimeout(() => {battle('모험', action,['소셜','사제','바드','드루','도둑'])}, idx++ * 1000)
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

function equip(a,b,c){
	var form = a
	var input = document.createElement('input')
	input.type ='hidden'
	input.name = b
	form.target = 'lucky'
	input.value ='Equip Load(1)';
	form.appendChild(input);
	form.submit() ;
	form.removeChild(input);
}



function u_equip_5(a,b,c,d,e,f,g,h,i,j ) {
	setTimeout(equip,0,a,b,2);
	setTimeout(equip,1000,c,d,3);
	setTimeout(equip,2000,e,f,4);
	setTimeout(equip,3000,g,h,5);
	setTimeout(equip,4000,i,j,6);
}



replaceFragment('character-list');