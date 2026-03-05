/* INTRO TYPEWRITER */

const introText = "Você também já caminhou sozinho pela noite?"
let introIndex = 0

function escreverIntro(){

const intro = document.getElementById("intro")

if(!intro) return

if(introIndex < introText.length){

intro.innerHTML += introText.charAt(introIndex)
introIndex++

setTimeout(escreverIntro,40)

}

}

escreverIntro()


/* REVEAL AO SCROLL */

const reveals = document.querySelectorAll(".reveal")

const revealObserver = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.classList.add("show")

}

})

})

reveals.forEach(el => revealObserver.observe(el))


/* TYPEWRITER NAS SECTIONS */

const textos = document.querySelectorAll(".type")

textos.forEach(text => {

let conteudo = text.textContent.trim()
text.textContent = ""

let i = 0

function escrever(){

if(i < conteudo.length){

text.textContent += conteudo[i]
i++

setTimeout(escrever,35)

}

}

setTimeout(escrever,500)

})


/* LUA SEGUINDO MOUSE */

const moon = document.querySelector(".moon")

if(moon){

document.addEventListener("mousemove", e => {

moon.style.transform =
`translate(${e.clientX/40}px, ${e.clientY/40}px)`

})

}


/* ESTRELAS NO FUNDO */

const canvas = document.getElementById("stars")

if(canvas){

const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let stars = []

for(let i=0;i<150;i++){

stars.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*1.5

})

}

function drawStars(){

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="white"

stars.forEach(s=>{

ctx.beginPath()
ctx.arc(s.x,s.y,s.r,0,Math.PI*2)
ctx.fill()

})

requestAnimationFrame(drawStars)

}

drawStars()

}


/* ESTRELAS REAGEM AO MOUSE */

document.addEventListener("mousemove", e => {

let x = e.clientX / window.innerWidth
let y = e.clientY / window.innerHeight

if(typeof stars !== "undefined"){

stars.forEach(star => {

star.x += (x - 0.5) * 0.2
star.y += (y - 0.5) * 0.2

})

}

})


/* ESCOLHA DO USUÁRIO */

const sim = document.getElementById("sim")
const nao = document.getElementById("nao")

if(sim){

sim.onclick = () => {

alert("O sonhador também acreditava nisso.")

}

}

if(nao){

nao.onclick = () => {

alert("Talvez você esteja certo.")

}

}


/* CHUVA FINAL */

let chuvaAtiva = false

function chuva(){

let rain = document.createElement("div")

rain.classList.add("rain")

rain.style.left = Math.random()*window.innerWidth+"px"

document.body.appendChild(rain)

setTimeout(()=>{

rain.remove()

},2000)

}


window.addEventListener("scroll",()=>{

if(window.scrollY > 2500 && !chuvaAtiva){

chuvaAtiva = true

setInterval(chuva,60)

document.body.style.background="#0a0a0a"
document.body.style.color="#eee"

}

})