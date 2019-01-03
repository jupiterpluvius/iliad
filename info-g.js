const tagCatalog = [
{
	"postag": "pos",
	"elements": [
	{"value": "v", "expanded": "verb"}, 
	{"value": "l", "expanded": "article"}, 
	{"value": "g", "expanded": "particle"}, 
	{"value": "n", "expanded": "noun"}, 
	{"value": "a", "expanded": "adjective"}, 
	{"value": "p", "expanded": "pron."}, 
	{"value": "d", "expanded": "adv."}, 
	{"value": "c", "expanded": "conj."}, 
	{"value": "r", "expanded": "prep."}, 
	{"value": "m", "expanded": "num."}, 
	{"value": "e", "expanded": "excl."}
	]
},
{
	"postag": "person", 
	"elements": [
	{"value": "-", "expanded": " "}, 
	{"value": "1", "expanded": "1"}, 
	{"value": "2", "expanded": "2"}, 
	{"value": "3", "expanded": "3"}
	]
},
{
	"postag": "number", 
	"elements": [
	{"value": "-", "expanded": " "}, 
	{"value": "s", "expanded": "sg."}, 
	{"value": "d", "expanded": "du."}, 
	{"value": "p", "expanded": "pl."}
	]
},
{
	"postag": "tense", 
	"elements": [
	{"value": "-", "expanded": " "}, 
	{"value": "p", "expanded": "pres."}, 
	{"value": "r", "expanded": "pf."}, 
	{"value": "r", "expanded": "pf."}, 
	{"value": "a", "expanded": "aor."}, 
	{"value": "f", "expanded": "fut."}, 
	{"value": "t", "expanded": "futpf."}, 
	{"value": "l", "expanded": "plupf."}
	]
},
{
	"postag": "mood", 
	"elements": [
	{"value": "-", "expanded": " "}, 
	{"value": "i", "expanded": "ind."}, 
	{"value": "n", "expanded": "inf."}, 
	{"value": "s", "expanded": "subj."}, 
	{"value": "o", "expanded": "opt."}, 
	{"value": "m", "expanded": "imperat."}, 
	{"value": "p", "expanded": "ppl."}
	]
},
{
	"postag": "voice", 
	"elements": [
	{"value": "-", "expanded": " "}, 
	{"value": "a", "expanded": "act."}, 
	{"value": "e", "expanded": "mid-pass."}, 
	{"value": "m", "expanded": "mid."}, 
	{"value": "p", "expanded": "pass."}
	]
},
{
	"postag": "gender", 
	"elements": [
	{"value": "-", "expanded": " "}, 
	{"value": "m", "expanded": "m."}, 
	{"value": "f", "expanded": "f."}, 
	{"value": "n", "expanded": "n."}
	]
},
{
	"postag": "case", 
	"elements": [		 
	{"value": "-", "expanded": " "}, 
	{"value": "n", "expanded": "nom."}, 
	{"value": "g", "expanded": "gen."}, 
	{"value": "d", "expanded": "dat."}, 
	{"value": "a", "expanded": "acc."}, 
	{"value": "v", "expanded": "voc."}
	]
},
{
	"postag": "degree", 
	"elements": [
	{"value": "-", "expanded": " "}, 
	{"value": "p", "expanded": " "}, 
	{"value": "c", "expanded": "comp."}, 
	{"value": "s", "expanded": "super."}
	]
}
];

function doPOS(tag) {
	var i,j,answer = "";
	let wordPos = [];
	tag = tag.split("");
	for (i in tagCatalog) {
		for (j in tagCatalog[i].elements) {
			if (tag[i] === tagCatalog[i].elements[j].value) {
				wordPos.push(tagCatalog[i].elements[j].expanded);
				console.log(wordPos);

			}
		}};
		if (tag[0] === "n" || tag[0] === "a" || tag[0] === "p" || tag[0] === "m" || tag[0] === "l") {
			answer = (wordPos[7] + " " + wordPos[2] + " " + wordPos[6] + " " + wordPos[8]);
	} else if (tag[4] === "p") { // participle: 
		answer = (wordPos[3] + " " + wordPos[5] + " " + wordPos[4] + ", " + wordPos[7] + " " + wordPos[2] + " " + wordPos[6]);
	} else if (tag[4] === "n") { // infinitive: 
		answer = (wordPos[3] + " " + wordPos[5] + " " + wordPos[4]);
	} else if (tag[4] === "g" || tag[4] === "d") { // gerund / gerundive: 
		answer = (wordPos[4] + ", " + wordPos[7] + " " + wordPos[2] + " " + wordPos[6]);
	} else if (tag[0] === "v") { // verbs: 12 3 5 4
		answer = (wordPos[1] + wordPos[2] + " " + wordPos[3] + " " + wordPos[5] + " " + wordPos[4]);
	} else if (tag[0]) { // the rest
		answer = wordPos[0];
	};
	return answer;
};

doInfo = function() {
	const bubbleTop = document.querySelector("#container");
	bubbleTop.addEventListener("mouseover", function(event) { // "click" is another way to go
		if (event.target.tagName === "SPAN") {
			let clickedWord = event.target;
	// Get information.
	let wordForm = (clickedWord.dataset.intext) ? clickedWord.dataset.intext : `&nbsp;`;
	let wordDict = (clickedWord.dataset.lemma) ? clickedWord.dataset.lemma : " ";
	var wordPos = (clickedWord.dataset.pos) ? doPOS(clickedWord.dataset.pos) : " ";
	let wordDef = (clickedWord.dataset.def) ? clickedWord.dataset.def : " ";
	let infoBox = 
		`
		<li><span class="entry infoboxGreek">${wordForm}</span> &nbsp; <span class="smallcaps">${wordPos}</span></li>
		<li><b>${wordDict}</b> ${wordDef}</li>
		`;
	document.querySelector("#info").innerHTML = infoBox;
}
});
};

doInfo();